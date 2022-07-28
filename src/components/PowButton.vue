<template>
  <span>
    <import-excel
      v-if="options.type == 'import'"
      v-show="!options.power || $sysPow(options.power)"
      :options="options"
      @handleBeforeClose="handleImportExcelBeforeClose"
    ></import-excel>
    <el-button
      v-else-if="type == 'title'"
      v-show="!options.power || $sysPow(options.power)"
      size="mini"
      :type="options.theme"
      :icon="options.icon"
      :title="options.label"
      @click="handleTitleBtnClick"
      >{{ options.label }}</el-button
    >
    <el-button
      v-else-if="type == 'row'"
      v-show="!options.power || $sysPow(options.power)"
      size="mini"
      round
      :type="options.theme"
      :icon="options.icon"
      :title="handleCustomLabel()"
      @click="handleRowBtnClick"
      >{{ handleCustomLabel() }}</el-button
    >
    <el-button
      v-else-if="type == 'batch'"
      v-show="!options.power || $sysPow(options.power)"
      size="mini"
      :type="options.theme"
      :icon="options.icon"
      :title="options.label"
      @click="handleBatchBtnClick"
      >{{ options.label }}</el-button
    >
  </span>
</template>

<script>
import ImportExcel from "./ImportExcel.vue";
export default {
  components: { ImportExcel },
  props: {
    /** 类型 */
    type: String,
    /** 选项 */
    options: Object,
    /** 行数据 */
    row: Object,
    /** 行索引 */
    index: Number,
    /** 勾选 */
    multipleSelectionIds: Array,
    /** 抽屉 */
    drawers: Array,
  },
  methods: {
    handleCustomLabel() {
      let label = this.options.label;
      this.$emit("handleCustomLabel", this.options, this.row, function (r) {
        console.log(r);
        label = r;
      });
      return label;
    },
    /** 导入Excel弹出框关闭前 */
    handleImportExcelBeforeClose() {
      this.handleRefresh();
    },
    handleOpenDrawer(id, ids, row) {
      for (let i = 0; i < this.drawers.length; i++) {
        const element = this.drawers[i];
        if (element.name == this.options.drawer) {
          element.title = this.options.label;
          element.id = id;
          element.ids = ids;
          element.show = true;
          element.row = row;
          this.$emit("handleOpenDrawer", this.options, id, ids, row);
          break;
        }
      }
    },
    handleApi() {
      let that = this;
      if (this.options.method == "delete") {
        let data = {};
        if (this.type == "batch") {
          data.ids = this.multipleSelectionIds;
        } else if (this.type == "row") {
          data.ids = [this.row.Id];
        }
        this.$delete(this.options.action, data).then(function (r) {
          that.handleRefresh();
        });
      } else if (this.options.method == "post") {
        let action = this.options.action;
        if (action.indexOf("{") > -1) {
          let params = action.split("{");
          for (let i = 0; i < params.length; i++) {
            const param = params[i];
            if (param.indexOf("}") == param.length - 1) {
              param = param.substring(0, param.length - 1);
              if (this.row[param]) {
                action = action.replace("{" + param + "}", this.row[param]);
              }
            }
          }
        }
        let data = {};
        if (this.type == "batch") {
          data.Ids = this.multipleSelectionIds;
        } else {
          data.Ids = [this.row.Id];
        }
        if (this.options.params) {
          for (const key in this.options.params) {
            const element = this.options.params[key];
            data[key] = element;
          }
        }
        this.$post(action, data).then(function (r) {
          that.handleRefresh();
        });
      }
    },
    handleRefresh() {
      this.$emit("handleRefresh");
    },
    /** 标题按钮 */
    handleTitleBtnClick() {
      var that = this;
      if (this.options.type == "drawer") {
        this.handleOpenDrawer(undefined, undefined, undefined);
      } else if (this.options.type == "api") {
        this.handleApi();
      } else if (this.options.type == "download") {
        this.$post(btn.action, null).then(function (r) {
          window.location = that.baseURL + r;
        });
      } else if (this.options.type == "custom") {
        this.$emit("handleCustomBtnClick", this.options);
      }
    },
    /** 行按钮 */
    handleRowBtnClick() {
      if (this.options.type == "drawer") {
        this.handleOpenDrawer(this.row.Id, undefined, this.row);
      } else if (this.options.type == "api") {
        this.handleApi();
      } else if (this.options.type == "link") {
        let data = {};
        if (this.options.querys) {
          for (const key in this.options.querys) {
            const query = this.options.querys[key];
            if (key.indexOf("$") == 0) {
              if (this.row[query]) {
                let prop = key.substr(1);
                data[prop] = this.row[query];
              }
            } else {
              data[key] = query;
            }
          }
        }
        console.log(data);
        this.$router.push({ path: this.options.path, query: data });
      } else if (this.options.type == "custom") {
        this.$emit("handleCustomBtnClick", this.options, this.row, this.index);
      }
    },
    checkSelection() {
      if (this.multipleSelectionIds.length == 0) {
        this.$message({
          type: "info",
          message: "请选择！",
        });
        return;
      }
    },
    /** 批量按钮 */
    handleBatchBtnClick() {
      var that = this;
      this.checkSelection();
      this.$confirm("是否批量执行 " + this.options.label + " 操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: this.options.theme,
      })
        .then(() => {
          if (this.options.type == "api") {
            this.handleApi();
          } else if (this.options.type == "drawer") {
            this.handleOpenDrawer(
              undefined,
              this.multipleSelectionIds,
              undefined
            );
          } else if (this.options.type == "custom") {
            this.$emit(
              "handleCustomBtnClick",
              this.options,
              this.multipleSelection,
              this.multipleSelectionIds
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style lang="sass">
</style>