"use client";

import React, { useState, useEffect } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import { Wordcloud } from '@visx/wordcloud';
import { totoAfricaLyrics } from './text.fixture';

interface WordCloudProps {
  width: number;
  height: number;
  showControls?: boolean;
}

export interface WordData {
  text: string;
  value: number;
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

const sampleData = [
  {"text": "西九文化區", "value": 72},
  {"text": "香港管弦樂團", "value": 18},
  {"text": "香港小交響樂團", "value": 14},
  {"text": "進念二十面體", "value": 9},
  {"text": "城市當代舞蹈團", "value": 11},
  {"text": "香港話劇團", "value": 16},
  {"text": "藝穗會", "value": 43},
  {"text": "Para Site藝術空間", "value": 10},
  {"text": "錄映太奇", "value": 6},
  {"text": "M+博物館", "value": 22},
  {"text": "大館", "value": 20},
  {"text": "巴塞爾藝術展香港站", "value": 8},
  {"text": "香港藝術節", "value": 15},
  {"text": "中英劇團", "value": 10},
  {"text": "香港舞蹈團", "value": 13},
  {"text": "何東博物館", "value": 5},
  {"text": "香港文化博物館", "value": 9},
  {"text": "一舖清唱", "value": 4},
  {"text": "香港青年藝術協會", "value": 12},
  {"text": "亞洲協會香港中心", "value": 8},
  {"text": "1a空間", "value": 6},
  {"text": "李兆基創意書院", "value": 7},
  {"text": "聲音掏腰包", "value": 5},
  {"text": "浮動映像計劃", "value": 6},
  {"text": "富德樓", "value": 3}
]



// function wordFreq(text: string): WordData[] {
//   const words: string[] = text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').split(/\s+/);
//   const freqMap: Record<string, number> = {};

//   for (const w of words) {
//     if (!w) continue;
//     const word = w.toLowerCase();
//     if (!freqMap[word]) freqMap[word] = 0;
//     freqMap[word] += 1;
//   }

//   console.log('freqMap:', freqMap);
//   return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
// }


// const words = wordFreq(totoAfricaLyrics);

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}


const words = sampleData;

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

export default function WordCloud({ width, height, showControls = true }: WordCloudProps) {
  const [spiralType, setSpiralType] = useState<SpiralType>('archimedean');
  const [withRotation, setWithRotation] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Calculate responsive font scale based on width
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: width < 640 ? [8, 40] : width < 1024 ? [10, 60] : [12, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ width, height }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center" style={{ width, height }}>
      <svg width={width} height={height * 0.85} className="max-w-full max-h-full">
        <Wordcloud
          words={words}
          width={width}
          height={height * 0.85}
          fontSize={fontSizeSetter}
          font={'Impact'}
          padding={2}
          spiral={spiralType}
          rotate={withRotation ? getRotationDegree : 0}
          random={fixedValueGenerator}
        >
          {(cloudWords) => (
            <g>
              {cloudWords.map((w, i) => (
                <Text
                  key={w.text}
                  fill={colors[i % colors.length]}
                  textAnchor={'middle'}
                  transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                  fontSize={w.size}
                  fontFamily={w.font}
                >
                  {w.text}
                </Text>
              ))}
            </g>
          )}
        </Wordcloud>
      </svg>
      {showControls && (
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <label className="inline-flex items-center text-sm">
            Spiral type &nbsp;
            <select
              onChange={(e) => setSpiralType(e.target.value as SpiralType)}
              value={spiralType}
              className="ml-2 px-2 py-1 border rounded"
            >
              <option key={'archimedean'} value={'archimedean'}>
                archimedean
              </option>
              <option key={'rectangular'} value={'rectangular'}>
                rectangular
              </option>
            </select>
          </label>
          <label className="inline-flex items-center text-sm">
            With rotation &nbsp;
            <input
              type="checkbox"
              checked={withRotation}
              onChange={() => setWithRotation(!withRotation)}
              className="ml-2"
            />
          </label>
        </div>
      )}
    </div>
  );
}
