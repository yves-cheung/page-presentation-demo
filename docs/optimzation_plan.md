# Frontend Performance Optimization Plan

**Project:** Page Presentation Demo  
**Framework:** Next.js 16 with React 19  
**Last Updated:** 2025-12-12

---

## Executive Summary

This document outlines a comprehensive performance optimization strategy for the presentation website. The plan addresses bundle size reduction, runtime performance, image optimization, and Next.js-specific enhancements to improve Core Web Vitals and overall user experience.

---

## Current Performance Analysis

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **React:** 19.2.1
- **Animation Libraries:** 
  - Framer Motion (12.23.25)
  - AOS (3.0.0-beta.6) - **Redundant**
  - @lottiefiles/dotlottie-react (0.17.10)
- **UI Libraries:** Swiper (12.0.3)
- **Styling:** Tailwind CSS 4

### Identified Performance Issues

#### 1. **Bundle Size & Code Splitting**
- ❌ All components load synchronously on initial page load
- ❌ No dynamic imports for below-the-fold content
- ❌ Heavy animation libraries (Framer Motion + AOS overlap)
- ❌ VideoPlayer modal loaded upfront but rarely used

**Impact:** Larger initial bundle, slower Time to Interactive (TTI)

#### 2. **Image Optimization**
- ❌ Duplicate image formats (both .jpg and .webp for drama posters)
- ❌ No lazy loading implementation
- ❌ Missing blur placeholders
- ❌ Unoptimized PNG cloud images (should be SVG or optimized)
- ❌ No responsive image sizing strategy

**Impact:** Slower Largest Contentful Paint (LCP), increased bandwidth

#### 3. **Animation Performance**
- ❌ Two animation libraries with overlapping functionality (AOS + Framer Motion)
- ❌ Complex Timeline cloud animations without optimization
- ❌ CustomCursor tracks every mousemove event (60+ events/second)
- ❌ No throttling or debouncing on scroll/mouse handlers

**Impact:** Poor runtime performance on lower-end devices, janky animations

#### 4. **Event Listener Optimization**
- ❌ Unthrottled mousemove events in CustomCursor
- ❌ Multiple scroll listeners without passive flag
- ❌ requestAnimationFrame not optimally used

**Impact:** Main thread blocking, reduced responsiveness

#### 5. **Next.js Configuration**
- ✅ React Compiler enabled (Good!)
- ❌ No image optimization configuration
- ❌ Missing font optimization
- ❌ No compression settings
- ❌ No preload/prefetch strategy

---

## Optimization Strategy

### **Phase 1: Quick Wins** (High Impact, Low Effort)

#### 1.1 Image Cleanup & Optimization
**Effort:** 1-2 hours  
**Impact:** ⭐⭐⭐⭐⭐

**Actions:**
- [ ] Remove duplicate `.jpg` files in `/public/drama_poster/` (keep only `.webp`)
- [ ] Add `loading="lazy"` to all below-the-fold images
- [ ] Configure Next.js image optimization in `next.config.ts`:
  ```typescript
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  }
  ```
- [ ] Add `sizes` prop to all `<Image>` components for responsive loading
- [ ] Convert timeline cloud PNGs to optimized format or SVG

**Expected Results:**
- Reduce page weight by ~30-40%
- Improve LCP by 1-2 seconds
- Better mobile performance

#### 1.2 Component Lazy Loading
**Effort:** 2-3 hours  
**Impact:** ⭐⭐⭐⭐⭐

**Actions:**
- [ ] Implement dynamic imports for heavy components:
  ```typescript
  const DramaShowcase = dynamic(() => import('./components/DramaShowcase'), {
    loading: () => <div className="min-h-[400px]" />
  });
  const SwipeCards = dynamic(() => import('./components/SwipeCards'));
  const Footer = dynamic(() => import('./components/Footer'));
  ```
- [ ] Lazy load VideoPlayer only when button is clicked
- [ ] Add loading skeletons for better UX
- [ ] Defer Timeline and Outcome components until viewport proximity

**Expected Results:**
- Reduce initial bundle by ~40-50%
- Improve TTI by 2-3 seconds
- Better First Contentful Paint (FCP)

#### 1.3 Next.js Configuration Enhancement
**Effort:** 30 minutes  
**Impact:** ⭐⭐⭐⭐

**Actions:**
- [ ] Add compression configuration
- [ ] Enable SWC minification (already enabled but verify)
- [ ] Add resource hints (preload/prefetch)
- [ ] Configure font optimization
- [ ] Update `next.config.ts`:
  ```typescript
  const nextConfig: NextConfig = {
    reactCompiler: true,
    compress: true,
    poweredByHeader: false,
    images: { /* config from 1.1 */ },
    experimental: {
      optimizePackageImports: ['framer-motion', '@lottiefiles/dotlottie-react'],
    },
  };
  ```

**Expected Results:**
- Smaller transferred file sizes (gzip/brotli)
- Faster resource loading
- Better caching strategy

---

### **Phase 2: Medium Effort Optimizations**

#### 2.1 Remove Redundant Animation Library
**Effort:** 3-4 hours  
**Impact:** ⭐⭐⭐⭐

**Actions:**
- [ ] Remove AOS library from dependencies
- [ ] Migrate AOS animations in Timeline to Framer Motion
- [ ] Update `Timeline.tsx` to use Framer Motion's viewport detection
- [ ] Remove AOS CSS import from `globals.css`
- [ ] Test all animations for consistency

**Migration Example:**
```typescript
// Replace AOS
data-aos="fade-right"

// With Framer Motion
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
```

**Expected Results:**
- Reduce bundle by ~50KB
- Consistent animation API
- Better performance with single animation engine

#### 2.2 Optimize Event Listeners & Custom Cursor
**Effort:** 2-3 hours  
**Impact:** ⭐⭐⭐⭐

**Actions:**
- [ ] Throttle mousemove events to 60fps max:
  ```typescript
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  ```
- [ ] Add passive event listeners where appropriate
- [ ] Optimize CustomCursor to check for reduced motion preference
- [ ] Consider disabling cursor on devices with `@media (hover: none)`
- [ ] Use Intersection Observer for scroll-based animations

**Expected Results:**
- Reduced CPU usage by 30-40%
- Smoother scrolling
- Better battery life on mobile devices

#### 2.3 Timeline Animation Optimization
**Effort:** 2-3 hours  
**Impact:** ⭐⭐⭐

**Actions:**
- [ ] Optimize cloud animation calculations in `useCloudAnimation.ts`
- [ ] Use CSS transforms instead of absolute positioning where possible
- [ ] Add `will-change` hints for animated elements
- [ ] Reduce complexity of cloud movement calculations
- [ ] Consider static clouds on mobile devices

**Expected Results:**
- Smoother timeline scrolling
- Better performance on low-end devices
- Reduced layout thrashing

#### 2.4 Add Bundle Analyzer
**Effort:** 30 minutes  
**Impact:** ⭐⭐⭐

**Actions:**
- [ ] Install `@next/bundle-analyzer`
- [ ] Configure in `next.config.ts`
- [ ] Run analysis to identify largest dependencies
- [ ] Document findings and create optimization tickets

**Setup:**
```bash
yarn add -D @next/bundle-analyzer
```

```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

**Expected Results:**
- Visibility into bundle composition
- Data-driven optimization decisions
- Identification of unnecessary dependencies

---

### **Phase 3: Advanced Optimizations**

#### 3.1 React Performance Optimization
**Effort:** 4-5 hours  
**Impact:** ⭐⭐⭐

**Actions:**
- [ ] Add `React.memo` to pure components:
  - `Header`, `Footer`, `VideoPlayer`, `SwipeCards`
- [ ] Use `useMemo` for expensive calculations:
  - Timeline layout calculations
  - Outcome image switching logic
- [ ] Use `useCallback` for event handlers passed to children
- [ ] Profile components with React DevTools Profiler
- [ ] Identify and fix unnecessary re-renders

**Example:**
```typescript
const Header = React.memo(() => {
  // Component logic
});

const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

**Expected Results:**
- Fewer unnecessary re-renders
- Faster state updates
- Better runtime performance

#### 3.2 Advanced Image Optimization
**Effort:** 3-4 hours  
**Impact:** ⭐⭐⭐⭐

**Actions:**
- [ ] Add blur placeholders to all images:
  ```typescript
  <Image
    src="/image.webp"
    placeholder="blur"
    blurDataURL={blurData}
  />
  ```
- [ ] Generate optimized blur data URLs
- [ ] Implement responsive image strategy with `sizes` prop
- [ ] Add priority loading for hero image
- [ ] Consider using `next/image` automatic optimization
- [ ] Implement lazy loading threshold optimization

**Expected Results:**
- Better perceived performance
- Improved LCP scores
- Reduced layout shift (CLS)

#### 3.3 Font Optimization
**Effort:** 1-2 hours  
**Impact:** ⭐⭐⭐

**Actions:**
- [ ] Use `next/font` for optimal font loading
- [ ] Add font-display: swap
- [ ] Subset fonts to include only needed characters
- [ ] Preload critical fonts
- [ ] Consider variable fonts if applicable

**Expected Results:**
- Eliminate font-loading flash (FOIT/FOUT)
- Faster text rendering
- Better FCP scores

#### 3.4 Performance Monitoring Setup
**Effort:** 2-3 hours  
**Impact:** ⭐⭐⭐⭐

**Actions:**
- [ ] Set up Lighthouse CI for automated testing
- [ ] Add Core Web Vitals reporting:
  ```typescript
  // app/layout.tsx
  export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
    // Send to analytics
  }
  ```
- [ ] Configure performance budgets
- [ ] Set up monitoring dashboard
- [ ] Create performance regression alerts

**Expected Results:**
- Continuous performance monitoring
- Early detection of regressions
- Data-driven optimization priorities

---

## Implementation Priority Matrix

| Optimization | Impact | Effort | Priority | Status |
|--------------|--------|--------|----------|--------|
| Remove duplicate images | ⭐⭐⭐⭐⭐ | Low | 🔴 Critical | ⬜ Pending |
| Add lazy loading | ⭐⭐⭐⭐⭐ | Low | 🔴 Critical | ⬜ Pending |
| Dynamic imports | ⭐⭐⭐⭐⭐ | Medium | 🔴 Critical | ⬜ Pending |
| Next.js config | ⭐⭐⭐⭐ | Low | 🟠 High | ⬜ Pending |
| Remove AOS library | ⭐⭐⭐⭐ | Medium | 🟠 High | ⬜ Pending |
| Optimize event listeners | ⭐⭐⭐⭐ | Medium | 🟠 High | ⬜ Pending |
| Timeline optimization | ⭐⭐⭐ | Medium | 🟡 Medium | ⬜ Pending |
| Bundle analyzer | ⭐⭐⭐ | Low | 🟡 Medium | ⬜ Pending |
| React memoization | ⭐⭐⭐ | High | 🟡 Medium | ⬜ Pending |
| Blur placeholders | ⭐⭐⭐⭐ | Medium | 🟡 Medium | ⬜ Pending |
| Font optimization | ⭐⭐⭐ | Medium | 🟢 Low | ⬜ Pending |
| Monitoring setup | ⭐⭐⭐⭐ | Medium | 🟢 Low | ⬜ Pending |

---

## Expected Performance Improvements

### Current State (Estimated)
- **Bundle Size:** ~400-500KB (gzipped)
- **FCP:** 2-3 seconds
- **LCP:** 4-5 seconds
- **TTI:** 5-6 seconds
- **CLS:** 0.1-0.2
- **Lighthouse Score:** 60-70

### After Phase 1 (Quick Wins)
- **Bundle Size:** ~200-250KB (gzipped) ⬇️ 50%
- **FCP:** 1.5-2 seconds ⬇️ 30%
- **LCP:** 2.5-3 seconds ⬇️ 40%
- **TTI:** 3-4 seconds ⬇️ 40%
- **Lighthouse Score:** 80-85 ⬆️ 20 points

### After Phase 2 (Medium Effort)
- **Bundle Size:** ~180-220KB (gzipped) ⬇️ 60%
- **FCP:** 1-1.5 seconds ⬇️ 50%
- **LCP:** 2-2.5 seconds ⬇️ 50%
- **TTI:** 2.5-3 seconds ⬇️ 50%
- **Lighthouse Score:** 85-90 ⬆️ 25 points

### After Phase 3 (Advanced)
- **Bundle Size:** ~150-200KB (gzipped) ⬇️ 65%
- **FCP:** 0.8-1.2 seconds ⬇️ 60%
- **LCP:** 1.5-2 seconds ⬇️ 60%
- **TTI:** 2-2.5 seconds ⬇️ 60%
- **CLS:** <0.1 ⬇️ 50%
- **Lighthouse Score:** 90-95 ⬆️ 30 points

---

## Technical Debt & Future Considerations

### Code Quality
- [ ] Consider splitting large components (Timeline has 300+ lines)
- [ ] Standardize animation patterns across components
- [ ] Improve TypeScript typing in some components
- [ ] Add unit tests for complex logic

### Accessibility
- [ ] Ensure animations respect `prefers-reduced-motion`
- [ ] Verify keyboard navigation for all interactive elements
- [ ] Add proper ARIA labels where missing
- [ ] Test with screen readers

### SEO & Meta
- [ ] Add proper meta tags for all sections
- [ ] Implement structured data (JSON-LD)
- [ ] Add Open Graph tags
- [ ] Optimize for social media sharing

### Progressive Enhancement
- [ ] Ensure core content loads without JavaScript
- [ ] Add graceful degradation for animations
- [ ] Test on low-bandwidth connections
- [ ] Consider offline support with service workers

---

## Monitoring & Success Metrics

### Key Performance Indicators (KPIs)

1. **Core Web Vitals**
   - Target LCP: < 2.5s
   - Target FID: < 100ms
   - Target CLS: < 0.1

2. **Bundle Metrics**
   - Initial bundle: < 200KB (gzipped)
   - Total page weight: < 2MB
   - Number of requests: < 30

3. **User Experience**
   - Time to Interactive: < 3s
   - First Contentful Paint: < 1.5s
   - Lighthouse Performance Score: > 90

### Testing Strategy

1. **Automated Testing**
   - Lighthouse CI on every build
   - Bundle size checks in CI/CD
   - Performance regression tests

2. **Manual Testing**
   - Test on 3G/4G networks
   - Test on low-end devices
   - Cross-browser testing
   - Mobile vs desktop comparison

3. **Real User Monitoring**
   - Track actual user metrics
   - Monitor geographic performance differences
   - Analyze device-specific issues

---

## Dependencies & Tools

### Required Packages
```json
{
  "devDependencies": {
    "@next/bundle-analyzer": "^16.0.10",
    "lighthouse": "^11.0.0"
  }
}
```

### Optional Tools
- Chrome DevTools Performance Profiler
- React DevTools Profiler
- WebPageTest.org for advanced analysis
- Bundle Buddy for bundle analysis
- source-map-explorer for code splitting insights

---

## Risk Assessment

### Low Risk
- Image optimization and cleanup
- Adding lazy loading
- Next.js configuration updates
- Bundle analyzer setup

### Medium Risk
- Removing AOS library (requires testing all animations)
- Dynamic imports (may affect initial user experience)
- Event listener optimization (needs thorough testing)

### High Risk
- React memoization (can cause bugs if done incorrectly)
- Major animation refactoring
- Changing core rendering logic

### Mitigation Strategies
1. Feature flags for gradual rollout
2. A/B testing for major changes
3. Comprehensive testing before deployment
4. Performance monitoring to catch regressions
5. Rollback plan for each phase

---

## Timeline Estimate

- **Phase 1 (Quick Wins):** 1-2 days
- **Phase 2 (Medium Effort):** 2-3 days
- **Phase 3 (Advanced):** 3-4 days
- **Total:** 1-2 weeks (including testing and refinement)

---

## Conclusion

This optimization plan provides a structured approach to significantly improve the frontend performance of the presentation website. By following the phased implementation strategy, we can achieve measurable improvements in Core Web Vitals, bundle size, and overall user experience while minimizing risk and maintaining code quality.

The plan prioritizes high-impact, low-effort optimizations first to deliver quick wins, followed by more complex optimizations that provide long-term performance benefits.

---

## Appendix

### A. Useful Commands

```bash
# Install bundle analyzer
yarn add -D @next/bundle-analyzer

# Analyze bundle
ANALYZE=true yarn build

# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Check bundle size
npx next-bundle-analyzer

# Build for production
yarn build

# Analyze build
yarn build && du -sh .next/*
```

### B. Reference Links

- [Next.js Performance Documentation](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Framer Motion Performance](https://www.framer.com/motion/animation/##performance)

---

**Document Version:** 1.0  
**Created:** 2025-12-12  
**Last Updated:** 2025-12-12
