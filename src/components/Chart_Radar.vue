<!--
 ECHARTS 的 雷达图
-->
<template>
	<!-- 250px -->
  <div :id="comID" :style="pieStyle"></div>
</template>

<script>

  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legend';

  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/radar');
  export default {
    name: 'chart_radar',
    props: {
      comID:{
        type: String,
        default: 'myChart'
      },
      comHeight:{
        type: Number,
        default: 250
      },
      comType:{
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        pieStyle: ''
      };
    },
    created() {
      this.pieStyle = 'width: 100%; height:'+(this.comHeight*0.0625)+'rem;';
    },
    mounted() {
      if(this.comType == 1){
        this.drawLineTwo();
      }else if(this.comType == 2){
        this.drawLineThr();
      }else{
        this.drawLine();
      }

    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.comID));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            padding: [10, 10],
          },
          legend: {
            data: ['班级平均分', '学生个人分'],
            bottom:0,
          },
          color:['#C13531','#1E90FF'],
          radar: {
            radius: '50%',
            shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [5, 10],
                fontSize:16
              },
            },
            indicator: [
              { name: '品德优良', max: 100},
              { name: '身心健康', max: 100},
              { name: '技能精湛', max: 100},
              { name: '人文扎实', max: 100},
            ]
          },
          series: [{
            name: '总评',
            type: 'radar',
            data: [
              {
                value: [93, 60, 78, 85,],
                name: '班级平均分',
              },
              {
                value: [50, 74, 58, 81],
                name: '学生个人分',
              },
            ],
          }]
        });
      },
      drawLineTwo(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.comID));
        // 绘制图表
        myChart.setOption({
          grid: { // 控制图的大小，调整下面这些值就可以，
                              x: 40,
                              x2: 1000,
                              y2: 1050// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                          },
          tooltip: {
            padding: [10, 10],
          },
          legend: {
            data: ['班级平均分', '学生个人分'],
            bottom:0,
          },
          color:['#C13531','#1E90FF'],
          radar: {
            shape: 'circle',
            radius: '50%',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [5, 10],
                fontSize:16
              },
            },
            indicator: [
              { name: '课堂教学', max: 100},
              { name: '社会实践', max: 100},
              { name: '学生社团', max: 100},
              { name: '主题活动', max: 100},
              { name: '评比', max: 100},
              { name: '素养选修课', max: 100},
            ]
          },
          series: [{
            name: '责任担当',
            type: 'radar',
            data: [
              {
                value: [93, 60, 78, 85, 71, 63],
                name: '班级平均分',
              },
              {
                value: [50, 74, 58, 81, 69, 66],
                name: '学生个人分',
              },
            ],
          }]
        });
      },
      drawLineThr(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById(this.comID));
          // 绘制图表
          myChart.setOption({

            tooltip: {
              padding: [10, 10],
            },
            color:['#C13531','#1E90FF'],
            radar: {
              shape: 'polygon',
              center: ["80%", "50%"],
              radius: '60%',
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [5, 10],
                  fontSize:16
                },
              },
              indicator: [
                { name: '课堂教学', max: 100},
                { name: '社会实践', max: 100},
                { name: '学生社团', max: 100},
                { name: '主题活动', max: 100},
                { name: '评比', max: 100},
                { name: '素养选修课', max: 100},
              ]
            },
            series: [{
              name: '责任担当',
              type: 'radar',
              data: [
                {
                  value: [93, 60, 78, 85, 71, 63],
                  name: '班级平均分',
                },
                {
                  value: [50, 74, 58, 81, 69, 66],
                  name: '学生个人分',
                },
              ],
            }]
          });

      }
    }
  };

</script>

<style>

</style>
