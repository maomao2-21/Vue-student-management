<template>
  <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索</span>
      </div>
      <el-row>
        <el-col :span="12" v-for="(site, index) in searchDataList" :key="index">
          <el-form-item :label="site.name" :prop="site.code">
            <el-input
              v-model="ruleForm[site.code]"
              placeholder="请输入内容"
              class="formControl"
              v-if="site.type == 'input'"
            ></el-input>

            <el-select
              v-else-if="site.type == 'select'"
              v-model="ruleForm[site.code]"
              class="formControl"
              placeholder="请选择"
            >
              <el-option
                v-for="item in site.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>


          <el-date-picker
            class="formControl"
            v-else-if="site.type == 'pickerMin'"
            v-model="ruleForm[site.code]"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <selectCity v-else-if="site.type == 'cascaderCity'" @getCityList="getCityList"></selectCity>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="btnCenter">
        <el-button type="primary" @click="search(true)">搜索</el-button>
        <el-button @click="search(false)">重置</el-button>
      </el-row>
    </el-card>
  </el-form>
</template>

<script>
import selectCity from './selectCity.vue'
export default {
  components: {selectCity},
  props: {
    searchDataList: Array,
  },
  created() {
    let list = this.searchDataList;
    let data = {};
    let route = this.$route;
    let querys = JSON.parse(JSON.stringify(route.query));
    list.forEach((element) => {
      data[element.code] = element.data;
    });

    if(querys.Time){
      let timeArr=[querys.Time.split(',')[0],querys.Time.split(',')[1]]
      querys.Time=timeArr
    }

    for (const key in querys) {
      data[key] = querys[key];
    }
    this.ruleForm = data;
  },
  data() {
    return {
      ruleForm: null,
    };
  },
  methods: {
    getCityList(val){
      let data=''
      val.forEach(element => {
        data=data+element+','
      });
      this.ruleForm.ProvinceAreaId=data
    },
    search(type) {
      let route = this.$route;
      let querys = JSON.parse(JSON.stringify(route.query));
      let ruleForm = this.ruleForm;

      if (type) {

        for (const key in ruleForm) {
          if( key=='Time' && ruleForm[key] ){
            let time=this.$timeToMin(ruleForm[key][0])+','+this.$timeToMin(ruleForm[key][1])
            ruleForm[key]=time
          }
          querys[key] = ruleForm[key];
        }
        this.$router.push({ path: route.path, query: querys });

      } else {

        for (const key in ruleForm) {
          ruleForm[key] = null;
          querys[key] = ruleForm[key];
        }
        this.$router.push({ path: route.path, query: querys });

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
}
.btnCenter {
  text-align: center;
}
.formControl {
  width: 100%;
}
</style>