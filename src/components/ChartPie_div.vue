<!--
  ECHARTS 自定义饼图 只显示饼图，其他信息不显示
-->
<template>
  <div :id="ChartID" :style="pieStyle"></div>
</template>

<script>
  import 'echarts/lib/component/tooltip';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/pie');
  export default {
    name: 'chart_pie',
    props: {
      //ID
      ChartID:{
        type: String,
        default: 'myChart'
      },
      // 数据
      ChartData:{
        type: Array,
        default: () => {
          return [];
        }
      },
      // 颜色
      ChartColor: {
        type: Array,
        default: () => {
          return ['#7964E4', '#2291D9','#73CF43','#F9BB4A'];
        }
      },
      //高度
      ChartHeight: {
        type:Number,
        default:250
      },
      // 饼图环圈厚度
      ChartRadius: {
        type: Array,
        default: () => {
          return ['90%', '100%'];
        }
      },
      // 饼图位置
      ChartCenter: {
        type: Array,
        default: () => {
          return ['50%', '50%'];
        }
      },
      // 数据源名称
      ChartName: {
        type: String,
        default: '访问来源'
      }
    },
    data() {
      return {
        pieStyle: ''
      };
    },
    created() {
      this.pieStyle = 'width: 100%; height:'+(this.ChartHeight*0.0625)+'rem;';
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.ChartID));
        // 绘制图表
        myChart.setOption({

          color: this.ChartColor,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [{
            name: this.ChartName,
            type: 'pie',
            radius: this.ChartRadius,
            center: this.ChartCenter,
            data: this.ChartData,
            hoverAnimation: false,
            labelLine: {
              show:false
            },
            label: {
              show:false
            },
          }]
        });
      }
    }
  };


</script>

<style>
</style>
