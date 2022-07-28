<template>
  <el-row :gutter="20">
    <el-col
      :span="span"
      :offset="0"
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      style="margin-bottom: 10px"
    >
      <el-card>
        <!-- 内容 -->
        <div v-for="column in columns" :key="column.prop">
          <div v-if="column.title" slot="header">
            <span>
              <el-checkbox
                v-if="check"
                v-model="checked[row.Id]"
                @change="handleSelectionChange"
                style="margin-right: 10px"
              ></el-checkbox>
            </span>
            <!-- 卡片 标题 -->
            <span v-for="column in columns" :key="column.prop">
              <span v-if="column.title">{{
                handleCardFormatter(row, column)
              }}</span>
            </span>
            <!-- 卡片 标题按钮 -->
            <span v-for="(btn, btnIndex) in btns" :key="btnIndex">
              <pow-button
                type="row"
                class="table-card-btn"
                :options="btn"
                :row="row"
                :index="rowIndex"
                :multipleSelectionIds="multipleSelectionIds"
                :drawers="drawers"
                @handleOpenDrawer="handleOpenDrawer"
                @handleRefresh="handleRefresh"
                @handleCustomBtnClick="handleCustomBtnClick"
              ></pow-button>
            </span>
          </div>
          <div v-else>
            <span v-if="column.label" style="font-weight: bolder; margin-right: 10px">
              {{ column.label }}</span
            >
            <span
              v-if="column.pipe == 'editor'"
              v-html="row[column.prop]"
            ></span>
            <span v-else>{{ handleCardFormatter(row, column) }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
    /** 抽屉 */
    drawers: Array,
  },
  data() {
    return {
      /** 卡片 复选框 */
      checked: {},
      /** 已勾选Id */
      multipleSelectionIds: [],
    };
  },
  methods: {
    handleSelectionChange() {
      let multipleSelection = [];
      let multipleSelectionIds = [];
      for (const key in this.checked) {
        const element = this.checked[key];
        if (element) {
          multipleSelectionIds.push(key);
        }
      }
      for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i];
        if (multipleSelectionIds.indexOf(element.Id) > -1) {
          multipleSelection.push(element);
        }
      }
      this.$emit(
        "handleSelectionChange",
        multipleSelection,
        multipleSelectionIds
      );
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
    handleCardFormatter(row, column) {
      let cellValue = row[column.prop];
      if (column.pipe == "bool") {
        cellValue =
          cellValue == undefined
            ? "--"
            : cellValue == true
            ? column.pipeArgs[0]
            : column.pipeArgs[1];
      } else if (column.pipe == "date") {
        if (cellValue == "0001-01-01T00:00:00+00:00") {
          cellValue = "--";
        } else {
          var format = column.pipeArgs[0];
          cellValue = moment(cellValue).format(format);
        }
      } else if (column.pipe == "gender") {
        cellValue = cellValue == 1 ? "男" : "女";
      } else if (column.nesting && column.prop.indexOf("_") > -1) {
        cellValue = this.$getNestingValue(column, row);
      }
      if (cellValue == null) {
        cellValue = "--";
      }
      return cellValue;
    },
  },
};
</script>

<style lang="sass">
</style>