<!--
  ECHART 自定义柱状图
-->
<template>
	<!-- 250px -->
  <div id="myChart" style="width: 100%; height: 15.625rem;"></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  export default {
    name: 'chart_pie',
    props: {

    },
    data() {
      return {


        // 测试数据
        echartData: [{
                name: "品德优良",
                value: "3720"
            },
            {
                name: "身心健康",
                value: "2920"
            },
            {
                name: "技能精湛",
                value: "2200"
            },
            {
                name: "人文扎实",
                value: "1420"
            },
            {
                name: "社会实践",
                value: "1420"
            }

        ]
      };
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          grid: {
            x:40,
            y:20,
            x2:15,
            y2:20
          },
              color: ['#2C8DFF', '#DDDDDD'],
              xAxis: {
                  type: 'category',
                  data: ['机电部', '经贸部', '软件工程', '土木工程','外语部'],
                  axisLabel: {
                      color: "#A2A2A2",
                      fontSize: 14,
                      interval: 0
                  },
                  axisLine: {
                      lineStyle: {
                          color: "#DCDCDC",
                          width: 1,
                      },
                  },
                  axisTick: {
                              show: false //不显示刻度
                          },
              },
              yAxis: {
                  type: 'value',
                  axisLine: {
                    show: false //不显示x轴
                  },
                  splitLine: {
                    show: false
                  },
                  axisTick: {
                              show: false //不显示刻度
                          },
              },
              series: [
                  {
                      name: '人文扎实',
                      type: 'bar',
                      label: {
                          show: true,
                          position: 'top',
                          color: '#596169',
                          fontSize: 16
                      },
                      barWidth: 20,
                      barGap: '20%',
                      itemStyle:{
                        normal:{
                           barBorderRadius: [11, 11, 0, 0],
                        }
                      },
                      data: [32, 25, 22, 32,33]
                  },
                  {
                      name: '身心健康',
                      type: 'bar',
                      label: {
                          show: true,
                          position: 'top',
                          color: '#596169',
                          fontSize: 16
                      },
                      barWidth: 20,
                      itemStyle:{
                        normal:{
                           barBorderRadius: [11, 11, 0, 0],
                        }
                      },
                      data: [43, 37, 42, 41,25]
                  },
                  {
                      name: '品德优良',
                      type: 'bar',
                      label: {
                          show: true,
                          position: 'top',
                          color: '#596169',
                          fontSize: 16
                      },
                      barWidth: 20,
                      itemStyle:{
                        normal:{
                           barBorderRadius: [11, 11, 0, 0],
                        }
                      },
                      data: [26, 32, 37, 25,20]
                  },
                  {
                      name: '技能扎实',
                      type: 'bar',
                      label: {
                          show: true,
                          position: 'top',
                          color: '#596169',
                          fontSize: 16
                      },
                      barWidth: 20,
                      itemStyle:{
                        normal:{
                           barBorderRadius: [11, 11, 0, 0],
                        }
                      },
                      data: [19, 31, 18, 17,30]
                  },
              ]

        });
      }
    }
  };

</script>

<style>
</style>
