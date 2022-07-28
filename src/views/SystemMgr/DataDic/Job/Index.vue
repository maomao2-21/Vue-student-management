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
        title: "职务列表",
        action: "/api/dic-job",
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
            power: "SystemMgr_DataDic_Job_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_DataDic_Job_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_DataDic_Job_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/dic-job",
            power: "SystemMgr_DataDic_Job_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/dic-job",
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
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/dic-job",
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