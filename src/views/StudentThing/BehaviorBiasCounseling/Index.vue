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
  created() {},
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
        type: "card",
        title: "行为偏常辅导",
        action: "/api/student-behavior-bias-tutor",
        searchFormItem: [
          {
            type: "select",
            prop: "SemesterId",
            label: "学期",
            action: "/api/semester/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 8,
          },
          {
            type: "select",
            prop: "SchoolClassId",
            label: "班级",
            action: "/api/school-class/dropdown-box",
            options: [],
            immediate: true,
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
            power: "StudentThing_BehaviorBiasCounseling_Post",
          },
        ],
        rowBtns: [
          {
            type: "custom",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            power: "StudentThing_BehaviorBiasCounseling_Put",
          },
          {
            type: "custom",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            power: "StudentThing_BehaviorBiasCounseling_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-behavior-bias-tutor",
            power: "StudentThing_BehaviorBiasCounseling_Delete",
          },
        ],
        columns: [
          { prop: "StudentName", label: "姓名", title: true },
          { prop: "BehaviorBias", label: null, pipe: "editor" },
        ],
        check: true,
        index: true,
      },
    };
  },
});
</script>

<style lang="sass" scoped>
</style>