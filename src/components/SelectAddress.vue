<!--
  地址下拉选择 省/市/区
-->
<template>
  <el-cascader v-model="comDefault" :options="options" @change="handleChange" :class="comClass"></el-cascader>
</template>

<script>
  export default {
    props:{
      // 控件样式
      comClass:{
        type: String,
        default: ''
      },
      // 默认值
      comDefault:{
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        value: [],
        options: [
          {
            value: '33',
            label: '浙江省',
            children: [
              {
                value: '310000',
                label: '杭州市',
                children: [
                  {
                    value: '330102',
                    label: '上城区'
                  },
                  {
                    value: '330103',
                    label: '下城区'
                  },
                  {
                    value: '330104',
                    label: '江干区'
                  },
                  {
                    value: '330105',
                    label: '拱墅区'
                  },
                ]
              },
              {
                value: '315000',
                label: '宁波市',
                children: [
                  {
                    value: '330203',
                    label: '海曙区'
                  }, {
                    value: '330212',
                    label: '鄞州区'
                  },
                ]
              },
            ]
          },
          {
            value: '32',
            label: '江苏省',
            children: [
              {
                value: '3201',
                label: '南京市',
                children: [
                  {
                    value: '320101',
                    label: '玄武区'
                  },
                  {
                    value: '320102',
                    label: '秦淮区'
                  },
                  {
                    value: '320103',
                    label: '鼓楼区'
                  },
                  {
                    value: '320104',
                    label: '建邺区'
                  },
                  {
                    value: '320105',
                    label: '栖霞区'
                  },
                ]
              },
              {
                value: '3202',
                label: '无锡市',
                children: [
                  {
                    value: '320201',
                    label: '滨湖区'
                  },
                  {
                    value: '320202',
                    label: '梁溪区'
                  },
                  {
                    value: '320203',
                    label: '新吴区'
                  },
                  {
                    value: '320204',
                    label: '锡山区'
                  },
                  {
                    value: '320205',
                    label: '惠山区'
                  },
                  {
                    value: '320206',
                    label: '江阴市'
                  },
                  {
                    value: '320207',
                    label: '宜兴市'
                  },
                ]
              },
            ]
          },
        ]
      };
    },
    methods: {
      handleChange(value) {
        //console.log(value);
      }
    }
  };
</script>

<style>
</style>
