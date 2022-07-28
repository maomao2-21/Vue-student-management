<!--
  系統管理 - 角色管理 - 新增
-->

<template>
  <div class="SubWebPage">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> {{ ruleFormList.title }}</span>
        </div>
        <el-row v-if="ruleForm">
          <el-col
            :span="site.span"
            v-for="(site, index) in ruleFormList.dataList"
            :key="index"
          >
            <el-form-item :label="site.name" :prop="site.code" v-if="site.show">
              <el-input
                v-model="ruleForm[site.code]"
                placeholder="请输入内容"
                class="formControl"
                v-if="site.type == 'input'"
              ></el-input>
              <el-input
                v-else-if="site.type == 'textarea'"
                type="textarea"
                v-model="ruleForm[site.code]"
                placeholder="请输入内容"
                class="formControl"
              ></el-input>

              <el-switch
                v-model="ruleForm[site.code]"
                v-else-if="site.type == 'switch'"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>

              <el-select
                v-else-if="site.type == 'select'"
                v-model="ruleForm[site.code]"
                class="formControl"
                placeholder="请选择"
                :multiple="site.multiple"
              >
                <el-option
                  v-for="item in site.options"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                >
                </el-option>
              </el-select>


              
             <selectCity v-else-if="site.type == 'cascaderCity'" :editCityData='editCityData' :isEdit='true' @getCityList="getCityList"></selectCity>
            </el-form-item>
          </el-col>

          <el-col :span="24" v-if="ruleFormList.trueData">
            <el-form-item :label="ruleFormList.trueData.name">
              <el-tree
                v-if="ruleFormList.trueData.TreeRoleFunctions"
                ref="tree"
                :check-strictly="true"
                :props="defaultProps"
                :default-expand-all="true"
                :data="ruleFormList.trueData.TreeRoleFunctions"
                node-key="Id"
                show-checkbox
                @check-change="handleCheckChange"
              >
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="back">返回</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import selectCity from './selectCity.vue'
export default { 
  components: {selectCity},
  props: {
    ruleFormList: Object,
    rules: Object,
  },
  created() {
    let list = this.ruleFormList.dataList;
    let data = {};
    list.forEach((element) => {
      data[element.code] = element.data;
      if(element.type=="cascaderCity"){
        this.editCityData=element.data
      }
    });

    this.ruleForm = data;
  },
  mounted() {
    let that = this;

    if (
      that.ruleFormList.trueData &&
      that.ruleFormList.trueData.setCheckedKeys
    ) {
      that.$nextTick(() => {
        that.$refs.tree.setCheckedKeys(
          that.ruleFormList.trueData.setCheckedKeys
        );
      });
    }
  },
  data() {
    return {
      editId: null,
      oldRoleFunctions: [],

      ruleForm: null,
      editCityData:null,
      defaultProps: {
        children: "Childrens",
        label: "Name",
      },
    };
  },
  methods: {
    back() {
      history.go(-1);
    },
    getCityList(val){
      this.ruleForm.ProvinceAreaId=val
    },
    submitForm(formName) {
      let that = this;
      let ruleFormList = this.ruleFormList;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          if(data.ProvinceAreaId){
            data.CityAreaId=data.ProvinceAreaId[1]?data.ProvinceAreaId[1]:''
            data.AreaId=data.ProvinceAreaId[2]?data.ProvinceAreaId[2]:''
            data.ProvinceAreaId=data.ProvinceAreaId[0]?data.ProvinceAreaId[0]:''
          }
          if (ruleFormList.trueData) {
            let oldRoleFunctions = ruleFormList.trueData.oldRoleFunctions;
            if (oldRoleFunctions) {
              // 如果有tree赋值
              data.RoleFunctions.forEach((e1) => {
                oldRoleFunctions.forEach((e2) => {
                  if (e1.FunctionId == e2.FunctionId) {
                    e1.Id = e2.Id;
                  }
                });
              });
            }
          }

          ruleFormList.dataList.forEach((element) => {
            let upId = element.upId;
            if (upId) {
              let dataCodeList = data[element.code];

              let list = [];
              dataCodeList.forEach((element) => {
                let upObj = {};
                upObj[upId] = element; // 将要上传的id赋值
                list.push(upObj);
              });

              element.oldData.forEach((e2) => {
                // 如果赋值一样 且原先有id就放入id
                list.forEach((e3) => {
                  if (e3[upId] == e2[upId]) {
                    e3.Id = e2.Id;
                  }
                });
              });
              data[element.code] = list;
            }
          });

          if (!data.Id) {
            data.Id = "00000000-0000-0000-0000-000000000000";
          }

          this.$requestHandle(ruleFormList.editId, ruleFormList.ajaxUrl, data);
        }
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      let RoleFunctions = this.ruleForm.RoleFunctions;

      if (checked) {
        let have = false;
        RoleFunctions.forEach((element) => {
          if (element.FunctionId == data.Id) {
            have = true;
          }
        });
        if (!have) {
          RoleFunctions.push({ FunctionId: data.Id, Id: data.editId });
        }
      } else {
        for (let index = 0; index < RoleFunctions.length; index++) {
          if (RoleFunctions[index].FunctionId == data.Id) {
            RoleFunctions.splice(index, 1);
          }
        }
      }
    },
  },
};
</script>

<style scoped="scoped">
label {
  margin-bottom: 0 !important;
}

.stepCont {
  padding-top: 15px;
}
.formControl {
  width: 100%;
}
</style>
