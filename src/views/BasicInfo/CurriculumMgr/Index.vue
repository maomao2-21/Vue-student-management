<template>
  <div class="SubWebPage">
    <simple-page-list
      :setting="setting"
    ></simple-page-list>
  </div>
</template>

<script>
import Vue from "vue";
import SimplePageList from "@/components/SimplePageList.vue";
export default Vue.extend({
  components: { SimplePageList },
  methods: {
  },
  data() {
    return {
      setting: {
        title: "课程管理",
        action: "/api/curriculum",
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
            power: "BasicInfo_CurriculumMgr_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "BasicInfo_CurriculumMgr_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "BasicInfo_CurriculumMgr_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/curriculum",
            power: "BasicInfo_CurriculumMgr_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称" },
          { prop: "CurriculumTypeName", label: "课程类型" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/curriculum",
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
                prop: "CurriculumTypeName",
                label: "课程类型",
                type: "text",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/curriculum",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "编号",
                type: "text",
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
                prop: "CurriculumTypeId",
                label: "课程类型",
                type: "select",
                action: "/api/curriculum/type-dropdown-box",
                options: [],
                loading: false,
                required: true,
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