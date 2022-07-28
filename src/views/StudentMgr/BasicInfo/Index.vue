<template>
  <div class="SubWebPage">
    <simple-page-list
      ref="page"
      :setting="setting"
      @handleCustomBtnClick="handleCustomBtnClick"
    ></simple-page-list>
    <el-drawer
      ref="drawerForm"
      :title="formTitle"
      :visible.sync="formShow"
      direction="rtl"
      size="80%"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <form-page :id="formId" @handleSubmit="handleSubmit"></form-page>
    </el-drawer>
    <el-drawer
      title="查看"
      :visible.sync="detailShow"
      direction="rtl"
      size="80%"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <detail-page :id="detailId"></detail-page>
    </el-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import SimplePageList from "@/components/SimplePageList.vue";
import FormPage from "./Form.vue";
import DetailPage from "./Detail.vue";
export default Vue.extend({
  components: { SimplePageList, FormPage, DetailPage },
  methods: {
    handleSubmit() {
      this.formShow = false;
      this.$refs.page.search();
      this.$refs.drawerForm.closeDrawer();
    },
    handleCustomBtnClick(btn, row, index) {
      if (btn.label == "添加") {
        this.formId = undefined;
        this.formTitle = "添加";
        this.formShow = true;
      } else if (btn.label == "编辑") {
        this.formId = row.Id;
        this.formTitle = "编辑";
        this.formShow = true;
      } else if (btn.label == "查看") {
        this.detailId = row.Id;
        this.detailShow = true;
      }
    },
  },
  data() {
    return {
      formTitle: "",
      formShow: false,
      formId: undefined,
      detailShow: false,
      detailId: undefined,
      setting: {
        title: "学生管理",
        action: "/api/student",
        searchFormLabelWidth: "120px",
        searchFormItem: [
          { type: "text", prop: "Code", label: "学号", span: 8 },
          { type: "text", prop: "Name", label: "姓名", span: 8 },
          { type: "text", prop: "EnrollmentYear", label: "入学年份", span: 8 },
          {
            type: "select",
            prop: "StudentContactName",
            label: "家长姓名",
            action: "/api/student/student-contact-name-dropdown-box",
            options: [],
            allowcreate: true,
            loading: false,
            span: 8,
            refresh: ["StudentContactPhoneNumber"],
          },
          {
            type: "select",
            prop: "StudentContactPhoneNumber",
            label: "家长联系电话",
            action: "/api/student/student-contact-phone-number-dropdown-box",
            params: { $name: "StudentContactName" },
            options: [],
            allowcreate: true,
            loading: false,
            span: 8,
          },
          {
            type: "select",
            prop: "SchoolClassId",
            label: "班级",
            action: "/api/school-class/dropdown-box",
            immediate: true,
            options: [],
            loading: false,
            span: 8,
          },
        ],
        titleBtns: [
          {
            type: "custom",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            power: "StudentMgr_BasicInfo_Post",
          },
          {
            type: "import",
            theme: "primary",
            icon: "el-icon-plus",
            label: "导入",
            action: "/api/student/import-excel",
            template: "/api/student/download-excel-template",
            power: "StudentMgr_BasicInfo_ImportExcel",
          },
          {
            type: "import",
            theme: "primary",
            icon: "el-icon-plus",
            label: "上传照片",
            action: "/api/student/upload-photo",
            description:
              "请上传Zip压缩包，且压缩包内按学号放置jpg/png格式的图片，总文件不可超过500mb",
            limitLength: 500 * 1024 * 1024,
            limitContentTypes: [
              "application/zip",
              "application/x-zip-compressed",
            ],
            power: "StudentMgr_BasicInfo_UploadPhoto",
          },
          // {
          //   type: "download",
          //   theme: "primary",
          //   icon: "el-icon-plus",
          //   label: "导出",
          //   action: "/api/student/export-excel",
          //   power: "StudentMgr_BasicInfo_ImportExcel",
          // },
        ],
        rowBtns: [
          {
            type: "custom",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            power: "StudentMgr_BasicInfo_Get",
          },
          {
            type: "custom",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            power: "StudentMgr_BasicInfo_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student",
            power: "StudentMgr_BasicInfo_Delete",
          },
        ],
        columns: [
          // 学号，姓名，性别，出生年月，家长称谓，家长姓名，家长联系电话，家庭住址
          { prop: "Code", label: "学号", width: "120px" },
          { prop: "Name", label: "姓名", width: "70px" },
          { prop: "Gender", label: "性别", pipe: "gender", width: "50px" },
          {
            prop: "Birthday",
            label: "出生年月",
            pipe: "date",
            pipeArgs: ["YYYY-MM-DD"],
            width: "100px",
          },
          {
            prop: "StudentExcellentCadres_Name",
            label: "班干部",
            nesting: true,
            width: "80px"
          },
          { prop: "StudentContactCall", label: "家长称谓", width: "80px" },
          { prop: "StudentContactName", label: "家长姓名", width: "80px" },
          {
            prop: "StudentContactPhoneNumber",
            label: "家长联系电话",
            width: "110px",
          },
          { prop: "HomeAddress", label: "家庭住址" },
        ],
        check: true,
      },
    };
  },
});
</script>

<style lang="sass" scoped>
</style>