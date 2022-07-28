<!--
  ECHARTS 拆线统计图
-->
<template>
	<!-- 250px -->
  <div :id="ChartID" :style="pieStyle"></div>
</template>

<script>
  import 'echarts/lib/component/tooltip';
  let echarts = require('echarts/lib/echarts');

  require('echarts/lib/chart/line');
  export default {
    name: 'chart_pie',
    props: {
      // ID
      ChartID:{
        type:String,
        default: 'myChart'
      },
      // 高度
      ChartHeight:{
        type:Number,
        default:250
      },
      // 颜色数组
      ChartColor: {
        type: Array,
        default: () => {
          return ['#7964E4', '#2291D9','#73CF43','#F9BB4A'];
        }
      },
      // X轴标题
      ChartXTitle:{
        type: Array,
        default: () => {
          return [];
        }
      },
      // 轴线名称
      ChartSevName:{
        type: Array,
        default: () => {
          return [];
        }
      },
      // 数据
      ChartData:{
        type: Array,
        default: () => {
          return [];
        }
      },
    },

    data() {
      return {
        pieStyle: '',
      };
    },
    created() {
      this.pieStyle = 'width: 100%; height:'+(this.ChartHeight*0.0625)+'rem;';
      //console.log(this.pieStyle);
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.ChartID));


      let colorData = this.ChartColor;
      let xAxisData = this.ChartXTitle;
      let serverName = this.ChartSevName;
      let dataArr = this.ChartData;

      // 绘制图表
      myChart.setOption({
        grid: {
          top:'10%',
          left:'4%',
          right:'4%',
          bottom:'10%'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c',
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        xAxis: [{
          type: 'category',
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: "#F3F3F3",
              width: 1,
            },
          },
          axisTick: {
            show: false //不显示刻度
          },
          axisLabel: {
            color: "#939393",
            fontSize: 14,
            interval: 0,
            formatter: function(value) {
                var str = "";
                str += "\n"+value;
                return str;

            },
          },
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14,
              color: "#939393"
            },
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#F3F3F3",
            },
          },
          axisTick: {
            show: false ,
          },
        }],
        series:funseries(),
      });

      function funseries(){
        var serie = [];
        for(var i = 0; i<dataArr.length; i++){
          var item = {
            name: serverName[i],
            type: 'line',
            data: dataArr[i],
            symbolSize: 1,
            symbol: 'circle',
            //smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              shadowColor: colorData[i],
              shadowBlur: 10,
              shadowOffsetY: 2
            },
            itemStyle: {
              normal: {
                color: colorData[i],
                borderColor: colorData[i]
              }
            }
          };
          serie.push(item);
        }
        return serie;
      }



    },
    methods: {

    }
  };

</script>

<style>
</style>
