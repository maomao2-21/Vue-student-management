<!--
 ECHARTS 的 饼图
-->
<template>
	<!-- 250px -->
  <div id="myChart" style="width: 100%; height: 15.625rem;"></div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/pie');
  export default {
    name: 'chart_pie',
    props: {
      arrData: Array
    },
    data() {
      return {
        // 饼图颜色
        pieColor: ['#3EBEFF', '#FC9C49', '#FF7A68', '#58C68A', '#FFD76B', '#59C78A','#FFC384','#C172FF','#3EB0FF'],

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
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({


             color: this.pieColor,
             // 隐藏图表标题
             title: { text:null },
             // 隐藏图例
             legend: { enabled: false },

             series: [{
                     type: 'pie',
                     center: ['50%', '50%'],
                     radius: ['35%', '55%'],
                     label: {
                         show: true,
                         position: 'outside',
                         formatter: '{a|{b}}{e|{d}%}\n {hr|}',
                         rich: {
                             hr: {
                                 backgroundColor: 't',
                                 borderRadius: 3,
                                 width: 3,
                                 height: 3,
                                 padding: [3, 3, 0, -12]
                             },
                             a: {
                                 fontSize: 12,
                                 padding: [0, -55, -20, 15]
                             },
                             e: {
                                 color: '#000',
                                 fontSize: 12,
                                 padding: [-35, 10, -20, 5]
                             }
                         }
                     },
                     labelLine: {
                         normal: {
                             length: 20,
                             length2: 10,
                             lineStyle: {
                                 width: 1
                             }
                         }
                     },
                     data: this.echartData
                 }]

        });
      }
    }
  };

</script>

<style>
	
</style>
