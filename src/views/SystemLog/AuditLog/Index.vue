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
        title: "审计日志",
        action: "/api/log-audit",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 12 },
          {
            type: "daterange",
            prop: "CreatedTime",
            label: "创建时间",
            span: 12,
          },
        ],
        titleBtns: [],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemLog_AuditLog_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/log-audit",
            power: "SystemLog_AuditLog_Delete",
          },
        ],
        columns: [
          { prop: "SchoolName", label: "学校名称", width: "120px" },
          { prop: "UserAccount", label: "用户账号", width: "120px" },
          { prop: "UserName", label: "用户姓名", width: "90px" },

          { prop: "Operate", label: "操作类型", width: "80px" },
          { prop: "TableName", label: "表名", width: "90px" },
          { prop: "ColumnName", label: "字段名称", width: "90px" },
          { prop: "NewValue", label: "新值" },
          { prop: "OldValue", label: "旧值" },

          {
            prop: "CreatedTime",
            label: "操作时间",
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
            action: "/api/log-audit",
            show: false,
            id: undefined,
            items: [
              {
                prop: "SchoolName",
                label: "学校名称",
                type: "text",
                span: 24,
              },
              {
                prop: "UserAccount",
                label: "用户账号",
                type: "text",
                span: 24,
              },
              {
                prop: "UserName",
                label: "用户姓名",
                type: "text",
                span: 24,
              },

              { prop: "Operate", label: "操作类型", type: "text", span: 24 },
              { prop: "TableName", label: "表名", type: "text", span: 24 },
              { prop: "ColumnName", label: "字段名称", type: "text", span: 24 },
              { prop: "NewValue", label: "新值", type: "text", span: 24 },
              { prop: "OldValue", label: "旧值", type: "text", span: 24 },

              {
                prop: "CreatedTime",
                label: "操作时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
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