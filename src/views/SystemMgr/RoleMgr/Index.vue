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
        title: "角色列表",
        action: "/api/role",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 12 },
          {
            type: "daterange",
            prop: "CreatedTime",
            label: "创建时间",
            span: 12,
          },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "SystemMgr_RoleMgr_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_RoleMgr_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_RoleMgr_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/role",
            power: "SystemMgr_RoleMgr_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "代码", width: "90px" },
          { prop: "Name", label: "名称", width: "120px" },
          { prop: "Level", label: "级别", width: "50px" },
          { prop: "Remark", label: "备注" },
          {
            prop: "CreatedTime",
            label: "注册时间",
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
            action: "/api/role",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "代码",
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
                prop: "Level",
                label: "级别",
                type: "text",
                span: 24,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "text",
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "注册时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
              {
                prop: "RoleFunctions_FunctionId",
                nesting: true,
                label: "功能",
                type: "tree",
                span: 24,
                action: "/api/role/functions",
                options: [],
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/role",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "代码",
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
                prop: "Level",
                label: "级别",
                type: "text",
                required: true,
                pattern: /^([+-]?[1-9]\d*|0)$/,
                patternMsg: "请输入整数！",
                span: 24,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "RoleFunctions_FunctionId",
                nesting: true,
                label: "功能",
                type: "tree",
                span: 24,
                action: "/api/role/functions",
                options: [],
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