<!--
 ECHARTS 的 饼图
-->
<template>
	<!--250px-->
  <div id="myChartRing" style="width: 100%; height: 15.625rem;"></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/pie');
  export default {
    name: 'chart_ring',
    props: {
      arrData: Array
    },
    data() {
      return {
        // 实到人数
        ActualNum: '55',
        // 应到人数
        ShouldNum: '62'
      };
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      formatNumber(num) {
          let reg = /(?=(\B)(\d{3})+$)/g;
          //return parseFloat((parseInt(num.toString().replace(reg, ','))/this.$options.methods.onGetTotal())*100).toFixed(2);
          return num.toString().replace(reg, ',');
      },
      onGetTotal(){
       this.echartData.reduce((a, b) => {
            return a + b.value * 1 ;
        }, 0);
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartRing'));
        // 绘制图表
        myChart.setOption({
          // 隐藏图表标题
          title: { text:null },
          // 隐藏图例
          legend: { enabled: false },
          series: [
            {
              name: 'circle',
              type: 'pie',
              clockWise: true,
              radius: ['55%', '70%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              hoverAnimation: false,
              data: [{
                value: parseInt(this.ActualNum),
                name: '占比',
                itemStyle: {
                  normal: {
                    color: '#4DE48E',
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              }, {
                name: '剩余',
                value: parseInt(this.ShouldNum) - parseInt(this.ActualNum),
                itemStyle: {
                  normal: {
                    color: '#EFF0F1',
                  },
                },
              }],
            }]
        });
      }
    }
  };

</script>

<style>

</style>
