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
        title: "处分记录",
        action: "/api/student-punishments-record",
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
          {
            type: "select",
            prop: "Level",
            label: "处分类型",
            action: "/api/student-punishments-record/type-dropdown-box",
            options: [],
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
            power: "StudentThing_PunishmentsRecord_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "StudentThing_PunishmentsRecord_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "StudentThing_PunishmentsRecord_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-punishments-record",
            power: "StudentThing_PunishmentsRecord_Delete",
          },
        ],
        columns: [
          { prop: "StudentName", label: "姓名", title: true },
          { prop: "Reason", label: null, pipe: "editor" },
          { prop: "Number", label: "处分号" },
          { prop: "Type", label: "类型" },
          {
            prop: "CreatedTime",
            label: "处分时间",
            pipe: "date",
            pipeArgs: ["YYYY-MM-DD hh:mm"],
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/student-punishments-record",
            show: false,
            id: undefined,
            size: "80%",
            items: [
              {
                prop: "SemesterName",
                label: "学期",
                type: "text",
                span: 24,
              },
              {
                prop: "StudentSchoolClassName",
                label: "班级",
                type: "text",
                span: 12,
              },
              {
                prop: "StudentName",
                label: "学生",
                type: "text",
                span: 12,
              },
              {
                prop: "Type",
                label: "处分类型",
                type: "text",
                span: 12,
              },
              {
                prop: "CreatedTime",
                label: "处分日期",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 12,
              },
              {
                prop: "Reason",
                label: "处分原因",
                type: "editor",
                span: 24,
              },
              {
                prop: "StudentPunishmentsRecordFileStorages",
                label: "附件",
                type: "files",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-punishments-record",
            show: false,
            id: undefined,
            size: "80%",
            items: [
              {
                prop: "SemesterId",
                label: "学期",
                type: "select",
                required: true,
                span: 24,
                action: "/api/semester/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "StudentSchoolClassId",
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
                prop: "StudentId",
                label: "学生",
                type: "select",
                required: true,
                span: 12,
                action: "/api/student/dropdown-box",
                params: { $classId: "StudentSchoolClassId" },
                options: [],
                loading: false,
              },
              {
                prop: "Type",
                label: "处分类型",
                type: "select",
                required: true,
                span: 12,
                action: "/api/student-punishments-record/type-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "CreatedTime",
                label: "处分日期",
                type: "date",
                required: true,
                span: 12,
              },
              {
                prop: "Reason",
                label: "处分原因",
                type: "editor",
                required: true,
                span: 24,
                action: "/api/student-punishments-record/reason-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "StudentPunishmentsRecordFileStorages_FileStorageId",
                nesting: true,
                label: "附件",
                type: "files",
                action: "/api/file-storage/upload/StudentPunishmentsRecord",
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