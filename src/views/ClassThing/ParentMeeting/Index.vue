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
        title: "家校沟通记录",
        action: "/api/student-parent-meeting",
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
            type: "daterange",
            prop: "CreatedTime",
            label: "创建时间",
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
            power: "ClassThing_ParentMeeting_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_ParentMeeting_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_ParentMeeting_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-parent-meeting",
            power: "ClassThing_ParentMeeting_Delete",
          },
        ],
        columns: [
          { prop: "Contacts", label: "联系对象", width:"120px" },
          {
            prop: "CreatedTime",
            label: "时间",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
          { prop: "PhoneNumber", label: "联系方式", width:"110px" },
          { prop: "Effect", label: "效果" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/student-parent-meeting",
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
                prop: "Relation",
                label: "关系",
                type: "text",
                span: 12,
              },
              {
                prop: "PhoneNumber",
                label: "联系方式",
                type: "text",
                span: 12,
              },
              {
                prop: "Reason",
                label: "联系原因",
                type: "editor",
                span: 24,
              },
              {
                prop: "Effect",
                label: "效果",
                type: "text",
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-parent-meeting",
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
                refresh: ["Week"],
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
                refresh: ["StudentId", "Relation", "PhoneNumber"],
              },
              {
                type: "select",
                prop: "StudentId",
                label: "学生",
                required: true,
                span: 12,
                action: "/api/student/dropdown-box",
                params: { $classid: "StudentSchoolClassId" },
                options: [],
                loading: false,
                refresh: ["Relation", "PhoneNumber"],
              },
              {
                type: "select",
                prop: "Relation",
                label: "关系",
                required: true,
                max: 32,
                span: 12,
                action: "/api/student-parent-meeting/relation-dropdown-box",
                params: { $studentid: "StudentId" },
                options: [],
                loading: false,
                allowcreate: true,
                refresh: ["PhoneNumber"],
              },
              {
                type: "select",
                prop: "PhoneNumber",
                label: "联系方式",
                required: true,
                max: 64,
                span: 12,
                action: "/api/student-parent-meeting/phone-number-dropdown-box",
                params: { $studentid: "StudentId", $relation: "Relation" },
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "Reason",
                label: "联系原因",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Effect",
                label: "效果",
                type: "text",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "时间",
                type: "date",
                required: true,
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