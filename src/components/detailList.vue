<template>
  <div class="SubWebPage">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> {{ ruleFormList.title }}</span>
        </div>
        <el-row>
          
          <el-col
            :span="site.span?site.span:6"
            v-for="(site, index) in ruleFormList.dataList"
            :key="index"
          >
            <el-form-item :label="site.name">
              <span>{{ site.data ? site.data : "暂无数据" }}</span>
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
              >
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align: center">
          <el-button @click="back">返回</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    ruleFormList: Object,
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
      ruleForm: {},
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
  },
};
</script>

<style lang="scss" scoped>
</style>