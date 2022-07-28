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
        title: "处分原因",
        action: "/api/dic-punishment-reason",
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
            power: "SystemMgr_DataDic_PunishmentReason_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_DataDic_PunishmentReason_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_DataDic_PunishmentReason_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/dic-punishment-reason",
            power: "SystemMgr_DataDic_PunishmentReason_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "名称" },
          { prop: "DicPunishmentTypeName", label: "处分类型" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/dic-punishment-reason",
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
                prop: "DicPunishmentTypeName",
                label: "处分类型",
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
            action: "/api/dic-punishment-reason",
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
                prop: "DicPunishmentTypeId",
                label: "处分类型",
                type: "select",
                required: true,
                span: 24,
                action: "/api/dic-punishment-reason/dic-punishment-types",
                options: [],
                loading: false,
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