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
        title: "操作日志",
        action: "/api/log-operate",
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
            power: "SystemLog_OperateLog_Get",
          },
          {
            type: "link",
            path: "/SystemLog/AuditLog/Index",
            querys: { $HttpId: "HttpId" },
            theme: "default",
            icon: "el-icon-info",
            label: "审计",
            power: "SystemLog_OperateLog_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/log-operate",
            power: "SystemLog_OperateLog_Delete",
          },
        ],
        columns: [
          { prop: "SchoolName", label: "学校名称", width: "120px" },
          { prop: "UserAccount", label: "用户账号", width: "120px" },
          { prop: "UserName", label: "用户姓名", width: "90px" },
          { prop: "Title", label: "标题", width: "200px" },
          { prop: "Method", label: "请求方式", width: "80px" },
          { prop: "Path", label: "地址" },
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
            action: "/api/log-operate",
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
              { prop: "Title", label: "标题", type: "text", span: 24 },
              { prop: "Method", label: "请求方式", type: "text", span: 24 },
              { prop: "Path", label: "地址", type: "text", span: 24 },
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