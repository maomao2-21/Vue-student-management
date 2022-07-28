<template>
  <el-table
    :data="data"
    border
    stripe
    @selection-change="handleSelectionChange"
  >
    <!-- 复选框 -->
    <el-table-column v-if="check" type="selection" width="50"></el-table-column>

    <!-- 序号 -->
    <el-table-column
      v-if="index"
      type="index"
      width="50"
      label="序号"
    ></el-table-column>
    <!-- 数据列 -->
    <el-table-column
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :formatter="handleTableFormatter"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <div
          v-if="column.pipe == 'editor'"
          v-html="scope.row[column.prop]"
        ></div>
        <div v-else>
          {{
            handleTableFormatter(
              scope.row,
              scope.column,
              scope.row[column.prop],
              scope.$index
            )
          }}
        </div>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      v-if="btns && btns.length > 0"
      label="操作"
      :width="getWidth()"
    >
      <template slot-scope="scope">
        <span v-for="(btn, btnIndex) in btns" :key="btnIndex">
          <pow-button
            v-if="handleRowBtnShow(btn, scope.row)"
            type="row"
            class="margin-right-5"
            :options="btn"
            :row="scope.row"
            :index="scope.$index"
            :multipleSelectionIds="multipleSelectionIds"
            :drawers="drawers"
            @handleOpenDrawer="handleOpenDrawer"
            @handleRefresh="handleRefresh"
            @handleCustomBtnClick="handleCustomBtnClick"
            @handleCustomLabel="handleRowBtnCustomLabel"
          ></pow-button>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment/moment";
import PowButton from "./PowButton.vue";
export default {
  components: { PowButton },
  props: {
    /** 数据 */
    data: Array,
    /** 布局 */
    span: Number,
    /** 列信息 */
    columns: Array,
    /** 卡片按钮信息 */
    btns: Array,
    /** 是否有勾选 */
    check: Boolean,
    /** 是否有序号 */
    index: Boolean,
    /** 抽屉 */
    drawers: Array,
  },
  data() {
    return {
      /** 已勾选Id */
      multipleSelectionIds: [],
    };
  },
  methods: {
    getWidth() {
      return this.btns
        .filter((b) => this.$sysPow(b.power))
        .map((b) => b.width ?? 100)
        .reduce((a, b) => {
          console.log(a);
          return a + b;
        });
    },
    handleRowBtnCustomLabel(options, row, cb) {
      this.$emit("handleRowBtnCustomLabel", options, row, cb);
    },
    handleRowBtnShow(btn, row) {
      var _show = true;
      this.$emit("handleRowBtnShow", btn, row, (show) => {
        if (show != undefined) {
          _show = show;
        }
      });
      return _show;
    },
    /** 勾选变更 */
    handleSelectionChange(val) {
      this.multipleSelectionIds = val.map((v, i) => v.Id);
      this.$emit("handleSelectionChange", val, this.multipleSelectionIds);
    },
    handleOpenDrawer(options, id, ids, row) {
      this.$emit("handleOpenDrawer", options, id, ids, row);
    },
    /** 刷新 */
    handleRefresh() {
      this.$emit("handleRefresh");
    },
    /** 自定义按钮事件 */
    handleCustomBtnClick(btn, row, rowIndex) {
      this.$emit("handleCustomBtnClick", btn, row, rowIndex);
    },
    /** 表格数据格式化 */
    handleTableFormatter(row, column, cellValue, index) {
      for (let i = 0; i < this.columns.length; i++) {
        const element = this.columns[i];
        if (element.prop == column.property) {
          if (element.pipe == "bool") {
            cellValue =
              cellValue == undefined
                ? "--"
                : cellValue == true
                ? element.pipeArgs[0]
                : element.pipeArgs[1];
          } else if (element.pipe == "enum") {
            cellValue = element.pipeArgs.filter((v) => v.Id == cellValue)[0]
              .Name;
          } else if (element.pipe == "date") {
            if (!cellValue || cellValue == "0001-01-01T00:00:00+00:00") {
              cellValue = "--";
            } else {
              var format = element.pipeArgs[0];
              cellValue = moment(cellValue).format(format);
            }
          } else if (element.pipe == "gender") {
            cellValue = cellValue == 1 ? "男" : "女";
          } else if (element.nesting && element.prop.indexOf("_") > -1) {
            cellValue = this.$getNestingValue(element, row);
          }
          if (cellValue == null) {
            cellValue = "--";
          }
          break;
        }
      }
      return cellValue;
    },
  },
};
</script>

<style lang="sass">
</style>