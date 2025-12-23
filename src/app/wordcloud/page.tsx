"use client";

import React from 'react';
import { ParentSize } from '@visx/responsive';
import WordCloud from './WordCloud';
import './sandbox-style.css';

export default function WordCloudPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4 cursor-auto">
      <div className="w-full h-full max-w-7xl max-h-[500px] sm:max-h-[800px]">
        <ParentSize>
          {({ width, height }) => (
            <WordCloud width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </div>
  );
}
