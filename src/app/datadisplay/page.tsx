"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import hkJson from "../data/geo_hk.json";
import hkJsonSimple from "../data/geo_hk_simple.json";
import TreeMap from "./TreeMap";
import GeoMap from "./GeoMap";
import { ParentSize } from "@visx/responsive";
import WordCloud from "../wordcloud/WordCloud";
import { Divider } from "./Divider";

export default function DataDisplayPage() {
  return (
    <div className="w-full min-h-screen p-2 sm:p-4 md:p-8 lg:p-16 flex flex-col gap-4 overflow-y-auto space-y-16 justify-center items-center">
      <div className="w-full flex-col justify-center max-w-6xl">
        <GeoMap />
      </div>

      <Divider />

      <div className="w-full flex justify-center">
        <TreeMap />
      </div>

      <Divider />

      <div className="w-full h-screen max-w-7xl max-h-[500px] sm:max-h-[800px] cursor-auto">
        <ParentSize>
          {({ width, height }) => <WordCloud width={width} height={height} />}
        </ParentSize>
      </div>
    </div>
  );
}
