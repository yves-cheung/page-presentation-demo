"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function TreeMapPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

const data = [
  {
    name: "劇場",
    value: 35,
    description: "+25%",
    children: [
      {
        name: "音樂劇",
        value: 15,
        description: "+30%",
      },
      {
        name: "劇場",
        value: 15,
        description: "+20%",
      },
      {
        name: "讀劇",
        value: 5,
        description: "+50%",
      },
    ],
  },
  {
    name: "粵劇",
    value: 28,
    description: "+15%",
  },
  {
    name: "舞蹈",
    value: 32,
    description: "+40%",
    children: [
      {
        name: "芭蕾表演",
        value: 14,
        description: "+18%",
      },
      {
        name: "當代舞蹈",
        value: 18,
        description: "+60%",
      },
      {
        name: "K-dance",
        value: 18,
        description: "+200%",
      },
    ],
  },
  {
    name: "棟篤笑",
    value: 22,
    description: "+33%",
  },
  {
    name: "音樂",
    value: 20,
    description: "+28%",
    children: [
      {
        name: "流行音樂會",
        value: 10,
        description: "+25%",
      },
      {
        name: "古典音樂會",
        value: 10,
        description: "+30%",
      },
    ],
  },
  {
    name: "其他",
    value: 14,
    description: "+75%",
    children: [
      {
        name: "Art Tech",
        value: 9,
        description: "+125%",
      },
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
      title: {
        text: "表演藝術節目類型分佈",
        left: "center",
        textStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const valueText = params.value ? `${params.value}` : "—";
          const description = params.data?.description ?? "";
          return `${params.name}<br/>場數：${valueText}<br/>變化：${description || "—"}`;
        },
      },
      series: [
        {
          type: "treemap",
          data: data,
          label: {
            show: true,
            formatter: (params: any) =>
              ` ${params.name}`,
            fontSize: 14,
            color: "#ffffffff",
            overflow: "truncate",
          },
          itemStyle: {
            borderColor: "#ffffffff",
            borderWidth: 0,
          },
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
    <div className="w-full h-screen p-2 sm:p-4 md:p-8 lg:p-16 flex items-center justify-center overflow-hidden">
      {/* Chart Container */}
      <div
        ref={chartRef}
        className="w-full max-w-5xl h-[60vh] sm:h-[70vh] lg:h-[80vh]"
      />
    </div>
  );
}
