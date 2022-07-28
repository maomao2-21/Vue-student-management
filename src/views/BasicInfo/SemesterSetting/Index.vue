<template>
  <div class="SubWebPage">
    <simple-page-list
      :setting="setting"
      @handleDrawerDetailInitData="handleDrawerDetailInitData"
      @handleDrawerFormInitData="handleDrawerFormInitData"
      @handleDrawerFormSubmit="handleDrawerFormSubmit"
      @handleRowBtnCustomLabel="handleRowBtnCustomLabel"
    ></simple-page-list>
  </div>
</template>

<script>
import Vue from "vue";
import SimplePageList from "@/components/SimplePageList.vue";
export default Vue.extend({
  components: { SimplePageList },
  methods: {
    handleRowBtnCustomLabel(options, row, cb) {
      let label = options.label;
      if (label == "当前学期" && !row.Current) {
        label = "设为当前学期";
      }
      cb(label);
    },
    handleDrawerDetailInitData(row, $detail) {
      let url = "/api/semester-setting/semester/" + row.SemesterId;
      if (row.Id) {
        url = "/api/semester-setting/" + row.Id;
      }
      this.$get(url, null).then(function (r) {
        $detail.initData(r);
      });
    },
    handleDrawerFormInitData(row, $form) {
      let url = "/api/semester-setting/semester/" + row.SemesterId;
      if (row.Id) {
        url = "/api/semester-setting/" + row.Id;
      }
      this.$get(url, null).then(function (r) {
        r.Id = row.Id;
        if (!r.Id) {
          delete r.Id;
        }
        $form.writeFormData(r);
      });
    },
    handleDrawerFormSubmit(args, index, close) {
      let form = args[0];
      var request = form.Id ? this.$put : this.$post;
      request("/api/semester-setting", form).then(function (r) {
        close(index);
      });
    },
  },
  data() {
    return {
      setting: {
        title: "学期设定",
        action: "/api/semester-setting",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 24 },
        ],
        titleBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "恢复初始设定",
            method: "delete",
            action: "/api/semester-setting",
            power: "BasicInfo_SemesterSetting_Delete",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "BasicInfo_SemesterSetting_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "BasicInfo_SemesterSetting_Put",
          },
          {
            type: "api",
            theme: "primary",
            icon: "el-icon-edit",
            label: "当前学期",
            method: "post",
            action: "/api/semester-setting/set-current/{SemesterId}",
            power: "BasicInfo_SemesterSetting_SetCurrent",
            width: 110,
          },
        ],
        batchBtns: [],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称" },
          {
            prop: "Start",
            label: "开始日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD"],
            width: "100px",
          },
          {
            prop: "End",
            label: "结束日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD"],
            width: "100px",
          },
          { prop: "AcademicYear", label: "学年度" },
          {
            prop: "Current",
            label: "当前学期",
            pipe: "bool",
            pipeArgs: ["是", "否"],
            width: "50px",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            show: false,
            id: undefined,
            custom: true,
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
            show: false,
            id: undefined,
            custom: true,
            items: [
              {
                prop: "Code",
                label: "编号",
                type: "text",
                disabled: true,
                span: 24,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                disabled: true,
                span: 24,
              },
              {
                prop: "StartEnd",
                label: "日期范围",
                type: "daterange",
                required: true,
                span: 24,
              },
              {
                prop: "AcademicYear",
                label: "学年度",
                type: "text",
                disabled: true,
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