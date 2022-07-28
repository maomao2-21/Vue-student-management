<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ tableData.titel }}</span>
        <el-button
          style="float: right; padding: 3px 0; margin-left: 5px"
          type="text"
          v-for="(site, index) in tableData.topBtnList"
          :key="index"
          @click="click(site.type)"
          v-show="site.sysPow"
          >{{ site.name }}</el-button
        >
      </div>

      <el-table
        :data="tabelList"
        border
        @selection-change="handleSelectionChange"
        >>
        <el-table-column type="selection" v-if="haveCheck" width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="90"
          label="序号"
          v-if="tableData.haveIndex"
        >
        </el-table-column>
        <el-table-column
          :prop="site.prop"
          :label="site.label"
          v-for="(site, index) in tableData.propList"
          :key="index"
        ></el-table-column>

        <el-table-column
          label="操作"
          :width="tableData.btnList.length * 80"
          v-if="tableData.btnList && tableData.btnList.length > 0"
        >
          <template slot-scope="scope">
            <span v-for="(site, index) in tableData.btnList" :key="index">
              <el-button
                @click="click(site.type, scope.row, scope.$index)"
                class="btn btn-warning el-btn mr-1"
                v-if="site.btnType == 'warning'"
                v-show="site.sysPow"
                >{{ site.name }}</el-button
              >

              <el-button
                v-else-if="site.btnType == 'err'"
                v-show="site.sysPow"
                slot="reference"
                @click="click(site.type, scope.row, scope.$index)"
                class="btn btn-danger mr-1 el-btn btnDel"
                >{{ site.name }}</el-button
              >
              <el-button
                @click="click(site.type, scope.row, scope.$index)"
                class="btn btn-success btn-xs mr-1"
                v-else-if="site.btnType == 'info'"
                v-show="site.sysPow"
                >{{ site.name }}</el-button
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="card-footer" style="padding-left: 0; padding-right: 0">
        <el-button
          style="float: left; padding: 3px 0; margin-top: 8.5px"
          type="text"
          v-for="(site, index) in tableData.bottomBtnList"
          :key="index"
          @click="bottomClick(site.type)"
          v-show="site.sysPow"
          >{{ site.name }}</el-button
        >

        <comPage v-if="totalPage" :totalPage="totalPage"></comPage>
      </div>
    </el-card>
  </div>
</template>

<script>
import comPage from "@/components/Page.vue";
export default {
  components: {
    comPage,
  },
  created() {
    let haveCheck = false;
    if (this.tableData.bottomBtnList) {
      this.tableData.bottomBtnList.forEach((element) => {
        if (element.sysPow) {
          haveCheck = true;
        }
      });
    }
    this.haveCheck = haveCheck;
  },
  props: {
    tabelList: Array,
    tableData: Object,
    totalPage: Number,
  },

  data() {
    return {
      haveCheck: false,
      selectList: [],
    };
  },
  methods: {
    handleSelectionChange(list) {
      this.selectList = list;
    },
    click(type, row, index) {
      this.$emit("btnClick", type, row, index);
    },
    bottomClick(type) {
      if (this.selectList.length == 0) {
        this.$message.warning("请至少选择一个");
        return;
      }
      this.$emit("btnClick", type, this.selectList);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>