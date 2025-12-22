'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import hkJson from '../data/geo_hk.json';

export default function MapPage() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    
    // Register map
    echarts.registerMap('HK', hkJson as any);

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

    data.sort(function (a, b) {
      return a.value - b.value;
    });

    const mapOption = {
      visualMap: {
        left: "right",
        min: 150000,
        max: 700000,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
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
              label: {
                show: true,
                color: "#040404ff",
                fontSize: 14,
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

    let currentOption: any = mapOption;
    myChart.setOption(mapOption);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}
