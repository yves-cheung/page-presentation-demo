"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import hkJson from "../data/geo_hk.json";
import hkJsonSimple from "../data/geo_hk_simple.json";
import { map, view } from "framer-motion/client";

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"map" | "bar">("map");
  const [mapDisplayMode, setMapDisplayMode] = useState<"simple" | "detailed">(
    "detailed"
  );
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const data = [
    { name: "Central and Western", value: 244600 },
    { name: "Eastern", value: 555200 },
    { name: "Islands", value: 185300 },
    { name: "Kowloon City", value: 418700 },
    { name: "Kwai Tsing", value: 524800 },
    { name: "Kwun Tong", value: 648500 },
    { name: "North", value: 315700 },
    { name: "Sai Kung", value: 489200 },
    { name: "Sha Tin", value: 659800 },
    { name: "Sham Shui Po", value: 405900 },
    { name: "Southern", value: 274900 },
    { name: "Tai Po", value: 303600 },
    { name: "Tsuen Wan", value: 304600 },
    { name: "Tuen Mun", value: 504300 },
    { name: "Wan Chai", value: 152600 },
    { name: "Wong Tai Sin", value: 420800 },
    { name: "Yau Tsim Mong", value: 318100 },
    { name: "Yuen Long", value: 607200 },
  ];

  const colorRange = [
    "#313695",
    "#4575b4",
    "#74add1",
    "#abd9e9",
    "#e0f3f8",
    "#ffffbf",
    "#fee090",
    "#fdae61",
    "#f46d43",
    "#d73027",
    "#a50026",
  ];

  data.sort(function (a, b) {
    return a.value - b.value;
  });

  const mapOption = {
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const value = params.value || 0;
        return `<span style="font-weight:800; font-size:16px">${params.name}</span> <br/>Population: ${value.toLocaleString()}`;
      },
      backgroundColor: "rgba(50, 50, 50, 0.9)",
      borderColor: "#333",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    visualMap: {
      //   orient: "horizontal",
      //   show: false,
      right: "5%",
      bottom: "0%",
      //   itemWidth: 200,
      itemHeight: 300,
      //   align: "bottom",
      textStyle: {
        color: "#7a7a7aff",
        fontSize: 14,
        fontWeight: "bold",
      },
      min: 150000,
      max: 700000,
      inRange: {
        color: colorRange,
      },
      text: ["High", "Low"],
      calculable: true,
    },
    series: [
      {
        id: "population",
        type: "map",
        roam: true,
        map: "HK",
        aspectScale: 1,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data,
        itemStyle: {
          borderColor: "#bababaff",
          borderWidth: 1,
          emphasis: {
            // For the hover text
            label: {
              show: false,
              color: "#0c0c0cff",
              fontSize: 16,
              fontWeight: "bold",
            },
            itemStyle: {
              areaColor: "#0000ffff",
            },
          },
        },
      },
    ],
  };

  const barOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const param = params[0];
        return `Population: ${param.value.toLocaleString()}`;
      },
      backgroundColor: "rgba(50, 50, 50, 0.9)",
      borderColor: "#333",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      axisLabel: {
        rotate: 30,
      },
      data: data.map(function (item) {
        return item.name;
      }),
    },
    visualMap: {
      show: false,
      orient: "vertical",
      right: "5%",
      top: "center",
      min: 150000,
      max: 700000,
      text: ["High", "Low"],
      dimension: 0,
      inRange: {
        color: colorRange,
      },
      calculable: true,
    },
    animationDurationUpdate: 1000,

    series: {
      type: "bar",
      id: "population",
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true,
    },
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    chartInstance.current = myChart;

    echarts.registerMap("HK", hkJson as any);

    // Initial render
    myChart.setOption(mapOption);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      const option = viewMode === "map" ? mapOption : barOption;
      chartInstance.current.setOption(option, true);
    }
  }, [viewMode, mapOption, barOption]);

  useEffect(() => {
    if (chartInstance.current) {
      if (mapDisplayMode === "simple") {
        echarts.registerMap("HK", hkJsonSimple as any);
      } else {
        echarts.registerMap("HK", hkJson as any);
      }

      chartInstance.current.setOption(mapOption, true);
    }
  }, [mapDisplayMode]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setViewMode("map")}
          className={`px-4 py-2 rounded ${
            viewMode === "map"
              ? "bg-gray-600 text-white"
              : "bg-white text-gray-800 shadow"
          }`}
        >
          Map
        </button>
        <button
          onClick={() => setViewMode("bar")}
          className={`px-4 py-2 rounded ${
            viewMode === "bar"
              ? "bg-gray-600 text-white"
              : "bg-white text-gray-800 shadow"
          }`}
        >
          Bar
        </button>
      </div>
          {viewMode === "map" && (   <div className="absolute top-20 left-4 z-10 flex gap-2">
        <button
          onClick={() => setMapDisplayMode("simple")}
          className={`px-4 py-2 rounded ${
            mapDisplayMode === "simple"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-800 shadow"
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setMapDisplayMode("detailed")}
          className={`px-4 py-2 rounded ${
            mapDisplayMode === "detailed"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-800 shadow"
          }`}
        >
          Detailed
        </button>
      </div>)}
   

      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}
