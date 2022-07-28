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
        title: "学生日常行为",
        action: "/api/student-everyday-behavior",
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
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "StudentThing_EverydayBehavior_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "StudentThing_EverydayBehavior_Put",
          },
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "StudentThing_EverydayBehavior_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-everyday-behavior",
            power: "StudentThing_EverydayBehavior_Delete",
          },
        ],
        columns: [
          {
            prop: "StudentEverydayBehaviorMultiples_StudentName",
            label: "学生",
            nesting: true,
            title: true,
          },
          { prop: "Reason", label: null, pipe: "editor" },
          {
            prop: "CreatedTime",
            label: "记录时间",
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
            action: "/api/student-everyday-behavior",
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
                prop: "StudentEverydayBehaviorMultiples_StudentName",
                nesting: true,
                label: "学生",
                type: "text",
                span: 12,
              },
              {
                prop: "Reason",
                label: "原因",
                type: "editor",
                span: 24,
              },
              {
                prop: "StudentEverydayBehaviorFileStorages",
                label: "附件",
                type: "files",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-everyday-behavior",
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
                refresh: ["StudentId"],
              },
              {
                prop: "StudentEverydayBehaviorMultiples_StudentId",
                nesting: true,
                label: "学生",
                type: "select",
                required: true,
                span: 12,
                action: "/api/student/dropdown-box",
                params: { $classId: "SchoolClassId" },
                options: [],
                multiple: true,
                loading: false,
              },
              {
                prop: "Reason",
                label: "原因",
                type: "editor",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "StudentEverydayBehaviorFileStorages_FileStorageId",
                nesting: true,
                label: "附件",
                type: "files",
                action: "/api/file-storage/upload/StudentEverydayBehavior",
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