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
        type: "card",
        span: 24,
        title: "班级日志",
        action: "/api/class-log",
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
          { type: "text", prop: "Keywords", label: "关键字", span: 8 },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "ClassThing_ClassLog_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_ClassLog_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_ClassLog_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-log",
            power: "ClassThing_ClassLog_Delete",
          },
        ],
        columns: [
          {
            prop: "CreatedTime",
            label: "登记日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            title: true,
          },
          { prop: "Content", label: null, pipe: "editor" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-log",
            show: false,
            id: undefined,
            size: "80%",
            items: [
              {
                prop: "SemesterName",
                label: "学期",
                type: "text",
                span: 12,
              },
              {
                prop: "SchoolClassName",
                label: "班级",
                type: "text",
                span: 12,
              },
              {
                prop: "Content",
                label: "内容",
                type: "editor",
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "登记时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
              {
                prop: "ClassLogFileStorages",
                label: "附件",
                type: "files",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/class-log",
            show: false,
            id: undefined,
            size: "80%",
            items: [
              {
                prop: "SemesterId",
                label: "学期",
                type: "select",
                required: true,
                span: 12,
                action: "/api/semester/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "SchoolClassId",
                label: "班级",
                type: "select",
                required: true,
                span: 12,
                action: "/api/school-class/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "Content",
                label: "内容",
                type: "editor",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "ClassLogFileStorages_FileStorageId",
                nesting: true,
                label: "附件",
                type: "files",
                action: "/api/file-storage/upload/ClassLog",
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