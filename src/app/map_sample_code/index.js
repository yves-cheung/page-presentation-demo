var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};

var option;

myChart.showLoading();
$.get("./geo_hk.json", function (hkJson) {
  myChart.hideLoading();
  echarts.registerMap("HK", hkJson);
  var data = [
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
        // prettier-ignore
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

        // label: {
        //   show: true,       // Set to true to show labels
        //   color: '#000000ff',    // Text color
        //   fontSize: 10,     // Font size
        //   fontFamily: 'Arial'
        // },
        // Add itemStyle for default appearance
        itemStyle: {
          borderColor: "#bababaff", // Color of the border between regions
          borderWidth: 1, // Width of the border
          emphasis: {
            // 2. Configure text style for hover state
            label: {
              show: true,
              color: "#040404ff", // Text color on hover
              fontSize: 14, // Larger font on hover
              fontWeight: "bold", // Bold text on hover
            },
            itemStyle: {
              areaColor: "#0000ffff", // Highlight color on hover
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
  // let currentOption = mapOption;
  myChart.setOption(mapOption);
  // setInterval(function () {
  //   currentOption = currentOption === mapOption ? barOption : mapOption;
  //   myChart.setOption(currentOption, true);
  // }, 2000);
});

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
