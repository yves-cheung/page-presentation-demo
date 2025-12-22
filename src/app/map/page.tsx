"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import hkJson from "../data/geo_hk.json";
import hkJsonSimple from "../data/geo_hk_simple.json";

export default function MapPage() {
  const [viewMode, setViewMode] = useState<"map" | "bar">("map");
  const [mapDisplayMode, setMapDisplayMode] = useState<"simple" | "detailed">(
    "detailed"
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showLabel, setShowLabel] = useState(false);
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
    title: {
      text: selectedDistrict
        ? `${selectedDistrict}`
        : "Hong Kong District Population",
      left: "center",
      top: "2%",
      textStyle: {
        fontSize: selectedDistrict? 38: 24,
        fontWeight: "bold",
        color: "#333",
      },
    },
    tooltip: {
      show: selectedDistrict ? false : true,
      trigger: "item",
      formatter: function (params: any) {
        const value = params.value || 0;
        return `<span style="font-weight:800; font-size:16px">${
          params.name
        }</span> <br/>Population: ${value.toLocaleString()}`;
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
      show: !selectedDistrict,
      //   orient: "horizontal",
      right: "5%",
      bottom: "0%",
      //   itemWidth: 200,
      itemHeight: 100,
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
        // roam: true,
        map: selectedDistrict || "HK",
        aspectScale: 1,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        animationDurationUpdate: 1000,
        universalTransition: true,
        selectedMode: false,
        silent: selectedDistrict ? true : false,
        data: selectedDistrict
          ? data.filter((item) => item.name === selectedDistrict)
          : data,
        label: {
          show: showLabel && !!selectedDistrict,
          formatter: function (params: any) {
            return `Population: ${params.value?.toLocaleString() || ''}`;
          },
          fontSize: 24,
          fontWeight: "bold",
          color: "#000000ff",
          blendMode: "difference",
          left: 0,
        },
        itemStyle: {
          borderColor: "#bababaff",
          borderWidth: 1,
        },
        emphasis: {
          // For the hover text
          label: {
            show: false,
            color: "#0c0c0cff",
            fontSize: 16,
            fontWeight: "bold",
          },
          itemStyle: {
            areaColor: "#f1f1f1ff",
          },
        },
      },
    ],
  };

  const barOption = {
    title: {
      text: "Hong Kong District Population",
      left: "center",
      top: "2%",
      textStyle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
      },
    },
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
      name: "Population",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
      },
    },
    yAxis: {
      type: "category",
      name: "District",
      nameLocation: "middle",
      nameGap: 100,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
      },
      axisLabel: {
        rotate: 0,
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

    // Register individual districts for zooming
    const geoJSON = mapDisplayMode === "simple" ? hkJsonSimple : hkJson;
    (geoJSON as any).features.forEach((feature: any) => {
      const districtName = feature.properties.name;
      echarts.registerMap(districtName, {
        type: "FeatureCollection",
        features: [feature],
      } as any);
    });

    // Initial render
    myChart.setOption(mapOption);

    // Add click event listener
    myChart.on("click", (params: any) => {
      if (params.componentType === "series" && params.seriesType === "map") {
        if (selectedDistrict === params.name) {
          // If clicking the same district, zoom out
          setSelectedDistrict(null);
        } else {
          // Zoom into the clicked district
          setSelectedDistrict(params.name);
        }
      }
    });

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
  }, [viewMode, mapOption, barOption, selectedDistrict, showLabel]);

  useEffect(() => {
    if (selectedDistrict) {
      setShowLabel(false);
      const timer = setTimeout(() => {
        setShowLabel(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setShowLabel(false);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (chartInstance.current) {
      if (mapDisplayMode === "simple") {
        echarts.registerMap("HK", hkJsonSimple as any);
      } else {
        echarts.registerMap("HK", hkJson as any);
      }

          // Register individual districts for zooming
    const geoJSON = mapDisplayMode === "simple" ? hkJsonSimple : hkJson;
    (geoJSON as any).features.forEach((feature: any) => {
      const districtName = feature.properties.name;
      echarts.registerMap(districtName, {
        type: "FeatureCollection",
        features: [feature],
      } as any);
    });

      chartInstance.current.setOption(mapOption, true);
    }
  }, [mapDisplayMode]);

  return (
    <div className="w-full h-screen p-16 relative overflow-hidden">
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
      {viewMode === "map" && (
        <div className="absolute top-20 left-4 z-10 flex gap-2">
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
        </div>
      )}

      {viewMode === "map" && selectedDistrict && (
        <div className="absolute top-36 left-4 z-10">
          <button
            onClick={() => setSelectedDistrict(null)}
            className="px-4 py-2 rounded bg-red-900 text-white shadow hover:bg-red-700"
          >
            View Full Map
          </button>
        </div>
      )}

      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}
