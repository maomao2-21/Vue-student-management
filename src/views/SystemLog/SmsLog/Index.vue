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
        title: "短信日志",
        action: "/api/log-sms",
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
            power: "SystemLog_SmsLog_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/log-sms",
            power: "SystemLog_SmsLog_Delete",
          },
        ],
        columns: [
          { prop: "SchoolName", label: "学校名称", width: "120px" },
          { prop: "UserAccount", label: "用户账号", width: "120px" },
          { prop: "UserName", label: "用户姓名", width: "90px" },

          { prop: "PhoneNumber", label: "手机号码", width: "120px" },
          { prop: "TemplateCode", label: "模板代码", width: "120px" },
          { prop: "ParamsText", label: "参数文本" },
          {
            prop: "Expiry",
            label: "有效期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
          {
            prop: "IsUsed",
            label: "使用",
            pipe: "bool",
            pipeArgs: ["已使用", "未使用"], width: "70px"
          },

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
            action: "/api/log-sms",
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

              {
                prop: "PhoneNumber",
                label: "手机号码",
                type: "text",
                span: 24,
              },
              {
                prop: "TemplateCode",
                label: "模板代码",
                type: "text",
                span: 24,
              },
              { prop: "ParamsText", label: "参数文本", type: "text", span: 24 },
              {
                prop: "Expiry",
                label: "有效期",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                width: "140px",
                type: "text",
                span: 24,
              },
              {
                prop: "是否使用",
                label: "新值",
                pipe: "bool",
                pipeArgs: ["已使用", "未使用"],
                type: "text",
                span: 24,
              },

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