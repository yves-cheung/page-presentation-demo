"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

export default function TreeMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const stackRef = useRef<any[]>([]);
  const [canGoBack, setCanGoBack] = useState(false);

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

  // top-level view (hide children initially)
  const topLevel = data.map((d) => {
    const { children, ...rest } = d as any;
    return { ...rest, _children: children };
  });

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current, null, {
      devicePixelRatio: window.devicePixelRatio || 2, // Use device pixel ratio or 2x for better quality
      renderer: "canvas", // Use canvas for better performance with high resolution
    });
    chartInstance.current = myChart;

    // (topLevel is computed at component scope)

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
        formatter: function (params: any) {
          const desc = params.data?.description || "";
          const value = params.value ?? "";
          return `${params.name}${value ? `<br/>數值：${value}` : ""}${
            desc ? `<br/>${desc}` : ""
          }`;
        },
      },
      series: [
        {
          type: "treemap",
          data: topLevel,
          // clicking a parent node will zoom into it and show its children
          nodeClick: "zoomToNode",
          roam: false,
          breadcrumb: {
            show: false,
          },
          label: {
            show: true,
            formatter: function (params: any) {
              // params.data.description is custom metadata; show it for leaf nodes
              const name = params.name || "";
              const desc = params.data?.description || "";
              const isLeaf = !(params.data && params.data.children);
              return isLeaf && desc ? `${name}\n${desc}` : name;
            },
            fontSize: 14,
            color: "#ffffffff",
            overflow: "truncate",
          },
          itemStyle: {
            borderColor: "#ffffffff",
            borderWidth: 0,
          },
          upperLabel: {
            show: true,
            height: 30,
          },
        },
      ],
    };

    // keep a stack of previous views inside the component-level `stackRef`

    const handleResize = () => {
      myChart.resize();
    };

    // click handler: if a node has _children, drill down into them
    myChart.on("click", function (params: any) {
      if (!params || !params.data) return;
      const node = params.data;
      if (node._children && node._children.length > 0) {
        // push current view onto stack
        const opt = myChart.getOption() as any;
        const currentTitle =
          (opt && opt.title && opt.title[0] && `${opt.title[0].text}`) ||
          "表演藝術節目類型分佈";
        const currentData =
          (opt && opt.series && opt.series[0] && opt.series[0].data) ||
          topLevel;
        stackRef.current.push({ title: currentTitle, data: currentData });

        const children = (node._children || []).map((c: any) => ({
          ...c,
          _children: c.children,
        }));
        myChart.setOption({
          title: { text: `${params.name}節目分佈` },
          series: [{ data: children }],
        });
        setCanGoBack(true);
      }
    });

    // initially set the option
    myChart.setOption(option);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.off();
      myChart.dispose();
    };
  }, [data]);

  // Back button: use a ref stack stored on the chart instance above. This handler will pop the stack and restore previous view.
  const handleBack = () => {
    const myChart = chartInstance.current;
    if (!myChart) return;
    // pop previous view from stackRef
    const prev = stackRef.current.pop();
    if (prev) {
      myChart.setOption({
        title: { text: prev.title },
        series: [{ data: prev.data }],
      });
    } else {
      myChart.setOption({
        title: { text: "表演藝術節目類型分佈" },
        series: [{ data: topLevel }],
      });
    }
    if (stackRef.current.length === 0) setCanGoBack(false);
  };

  return (

      <div className="relative w-full max-w-4xl h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        {canGoBack && (
          <button
            onClick={handleBack}
            className="absolute left-2 top-2 z-20 bg-white/90 text-gray-800 px-3 py-1 rounded shadow"
          >
            返回
          </button>
        )}
        <div ref={chartRef} className="w-full h-full" />
      </div>
   
  );
}
