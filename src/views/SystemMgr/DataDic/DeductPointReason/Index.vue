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
        title: "扣分原因",
        action: "/api/dic-deduct-point-reason",
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
            power: "SystemMgr_DataDic_DeductPointReason_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_DataDic_DeductPointReason_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_DataDic_DeductPointReason_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/dic-deduct-point-reason",
            power: "SystemMgr_DataDic_DeductPointReason_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "编号", width: "90px" },
          { prop: "Name", label: "扣分原因" },
          { prop: "Score", label: "分数" },
          {
            prop: "Veto",
            label: "一票否决",
            pipe: "bool",
            pipeArgs: ["是", "否"],
          },
          {
            prop: "DicDeductPointReasonTypes_DicDeductPointTypeName",
            nesting: true,
            label: "扣分类型",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/dic-deduct-point-reason",
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
                label: "扣分原因",
                type: "text",
                span: 24,
              },
              {
                prop: "Score",
                label: "分数",
                type: "text",
                span: 24,
              },
              {
                prop: "Veto",
                label: "一票否决",
                type: "check",
                span: 24,
              },
              {
                prop: "DicDeductPointReasonTypes_DicDeductPointTypeName",
                nesting: true,
                label: "扣分类型",
                type: "text",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/dic-deduct-point-reason",
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
                label: "扣分原因",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Score",
                label: "分数",
                type: "text",
                required: true,
                span: 24,
              },
              {
                prop: "Veto",
                label: "一票否决",
                type: "check",
                default: false,
                span: 24,
              },
              {
                prop: "DicDeductPointReasonTypes_DicDeductPointTypeId",
                nesting: true,
                label: "扣分类型",
                type: "select",
                required: true,
                span: 24,
                action: "/api/dic-deduct-point-reason/dic-deduct-point-types",
                options: [],
                multiple: true,
                loading: false,
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