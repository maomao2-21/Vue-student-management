<template>
  <div class="SubWebPage">
    <simple-page-list :setting="setting"></simple-page-list>
  </div>
</template>

<script>
import Vue from "vue";
import SimplePageList from "@/components/SimplePageList.vue";
export default Vue.extend({
  components: { SimplePageList },
  methods: {},
  data() {
    return {
      setting: {
        title: "学期列表",
        action: "/api/semester",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 24 },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "SystemMgr_DataDic_SemesterMgr_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_DataDic_SemesterMgr_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_DataDic_SemesterMgr_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/semester",
            power: "SystemMgr_DataDic_SemesterMgr_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称" },
          {
            prop: "Start",
            label: "开始日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD"],
            width: "140px",
          },
          {
            prop: "End",
            label: "结束日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD"],
            width: "140px",
          },
          { prop: "AcademicYear", label: "学年度" },
          { prop: "Current", label: "当前学期" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/user",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "编号",
                type: "text",
                span: 24,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                span: 24,
              },
              {
                prop: "Start",
                label: "开始时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
              {
                prop: "End",
                label: "结束时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
              {
                prop: "AcademicYear",
                label: "学年度",
                type: "text",
                span: 24,
              },
              {
                prop: "Current",
                label: "当前学期",
                type: "text",
                span: 24,
                pipe: "bool",
                pipeArgs: ["是", "否"],
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/semester",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "编号",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Dates",
                label: "注册时间",
                type: "daterange",
                span: 24,
              },
              {
                prop: "AcademicYear",
                label: "学年度",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Current",
                label: "当前学期",
                type: "check",
                default: false,
                span: 24,
              },
            ],
          },
        ],
      },
    };
  },
});
</script>

<style lang="sass" scoped>
</style>