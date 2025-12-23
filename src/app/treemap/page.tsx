"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

export default function TreeMapPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  let data = [
    {
      name: "劇場",
      value: 35,
      children: [
        {
          name: "音樂劇",
          value: 15,
        },
        {
          name: "劇場",
          value: 15,
        },
        {
          name: "讀劇",
          value: 5,
        },
      ],
    },
    {
      name: "粵劇",
      value: 28,
    },
    {
      name: "舞蹈",
      value: 32,
      children: [
        {
          name: "芭蕾表演",
          value: 14,
        },
        {
          name: "當代舞蹈",
          value: 18,
        },
        {
          name: "K-dance",
          value: 18,
        },
      ],
    },
    {
      name: "棟篤笑",
      value: 22,
    },
    {
      name: "其他",
      value: 14,
      children: [
        {
          name: "Art Tech",
          value: 9,
        }
      ],
    },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current, null, {
      devicePixelRatio: window.devicePixelRatio || 2, // Use device pixel ratio or 2x for better quality
      renderer: "canvas", // Use canvas for better performance with high resolution
    });
    chartInstance.current = myChart;

    const option = {
      series: [
        {
          type: "treemap",
          data: data,
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [data]);

  return (
    <div className="w-full h-screen p-2 sm:p-4 md:p-8 lg:p-16 flex flex-col overflow-hidden">
      {/* Chart Container */}
      <div ref={chartRef} className="flex-1 w-full" />
    </div>
  );
}
