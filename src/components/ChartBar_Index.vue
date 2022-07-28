<!--
  ECHART 首页类型【柱状图】
-->
<template>
  <!-- 250px -->
  <div :id="ChartID" :style="pieStyle"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
export default {
  name: "chart_pie",
  props: {
    //ID
    ChartID: {
      type: String,
      default: "myChart",
    },
    //高度
    ChartHeight: {
      type: Number,
      default: 250,
    },
    // 颜色数组
    ChartColor: {
      type: Array,
      default: () => {
        return ["#7964E4", "#2291D9", "#73CF43", "#F9BB4A"];
      },
    },
    // X轴 标题
    ChartxAxis: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // Y轴数据
    ChartyAxis: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否显示总数
    arrTotal: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      pieStyle: "",
    };
  },
  created() {
    this.pieStyle = "width: 100%; height:" + this.ChartHeight * 0.0625 + "rem;";
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(this.ChartID));
    let isStatus = this.arrTotal;
    let iCount = 0;
    let barData = this.ChartyAxis;
    // 绘制图表
    myChart.setOption({
      grid: {
        top: "10%",
        left: "4%",
        right: "0%",
        bottom: "10%",
      },
      color: this.ChartColor,
      xAxis: {
        type: "category",
        data: this.ChartxAxis,
        axisLabel: {
          color: "#939393",
          fontSize: 14,
          interval: 0,
          formatter: function (value) {
            var str = "";
            //console.log(isStatus[iCount].itemTotal);
            if (isStatus.length) {
              str += value + "\n";
              str += isStatus[iCount].value + " 分";
            } else {
              str += value + "\n";
            }
            iCount++;
            return str;
          },
        },
        axisLine: {
          lineStyle: {
            color: "#F3F3F3",
            width: 1,
          },
        },
        axisTick: {
          show: false, //不显示刻度
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 14,
            color: "#939393",
          },
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#F3F3F3",
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: funseries(),
    });

    function funseries() {
      var serie = [];
      for (var i = 0; i < barData.length; i++) {
        var item = {
          type: "bar",
          label: {
            show: false,
          },
          barWidth: 10,
          barGap: "30%",
          itemStyle: {
            normal: {
              barBorderRadius: [11, 11, 0, 0],
            },
          },
          data: barData[i],
        };
        serie.push(item);
      }
      return serie;
    }
  },
};
</script>

<style>
</style>
