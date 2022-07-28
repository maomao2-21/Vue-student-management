<template>
  <div class="SubWebPage">
    <simple-page-list
      :setting="setting"
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
      if (label == "当前班级" && !row.IsDefault) {
        label = "设为当前班级";
      }
      cb(label);
    },
  },
  data() {
    return {
      setting: {
        title: "班级管理",
        action: "/api/school-class",
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
            power: "BasicInfo_ClassMgr_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "BasicInfo_ClassMgr_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "BasicInfo_ClassMgr_Put",
          },
          {
            type: "api",
            theme: "primary",
            icon: "el-icon-edit",
            label: "当前班级",
            method: "post",
            action: "/api/school-class/set-default/{Id}",
            power: "BasicInfo_ClassMgr_SetDefault",
            width: 110,
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/school-class",
            power: "BasicInfo_ClassMgr_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称", width: "120px" },
          { prop: "ProfessionalDepartment", label: "专业部" },
          { prop: "Professional", label: "专业" },
          { prop: "Type", label: "类型", width: "120px" },
          {
            prop: "IsDefault",
            label: "当前班级",
            pipe: "bool",
            pipeArgs: ["是", "否"],
            width: "80px",
          },
          {
            prop: "CreatedTime",
            label: "创建时间",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/school-class",
            show: false,
            id: undefined,
            items: [
              { prop: "Code", label: "编号", type: "text", span: 24 },
              { prop: "Name", label: "名称", type: "text", span: 24 },
              {
                prop: "ProfessionalDepartment",
                label: "专业部",
                type: "text",
                span: 24,
              },
              {
                prop: "Professional",
                label: "专业",
                type: "text",
                span: 24,
              },
              { prop: "Type", label: "类型", type: "text", span: 24 },
              {
                prop: "IsDefault",
                label: "是否当前",
                type: "text",
                pipe: "bool",
                pipeArgs: ["是", "否"],
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "创建时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/school-class",
            show: false,
            id: undefined,
            items: [
              { prop: "Code", label: "编号", type: "text", max: 256, span: 24 },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                max: 256,
                span: 24,
                required: true,
              },
              {
                prop: "ProfessionalDepartment",
                label: "专业部",
                type: "select",
                span: 24,
                action:
                  "/api/school-class/professional-department-dropdown-box",
                options: [],
                allowcreate: true,
                loading: false,
              },
              {
                prop: "Professional",
                label: "专业",
                type: "select",
                span: 24,
                action: "/api/school-class/professional-dropdown-box",
                options: [],
                allowcreate: true,
                loading: false,
              },
              { prop: "Type", label: "类型", type: "text", max: 256, span: 24 },
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