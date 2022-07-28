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
        title: "双优生分析",
        action: "/api/student-double-excellent-analysis",
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
            power: "StudentThing_DoubleExcellentStudentAnalysis_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "StudentThing_DoubleExcellentStudentAnalysis_Put",
          },
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "StudentThing_DoubleExcellentStudentAnalysis_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-double-excellent-analysis",
            power: "StudentThing_DoubleExcellentStudentAnalysis_Delete",
          },
        ],
        columns: [
          { prop: "StudentName", label: "姓名", title: true },
          { prop: "Excellent", label: null, pipe: "editor" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/student-double-excellent-analysis",
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
                prop: "Excellent",
                label: "主要优点",
                type: "editor",
                span: 24,
              },
              {
                prop: "Insufficient",
                label: "不足",
                type: "editor",
                span: 24,
              },
              {
                prop: "Measures",
                label: "扬长避短措施",
                type: "editor",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-double-excellent-analysis",
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
                prop: "Excellent",
                label: "主要优点",
                type: "editor",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "Insufficient",
                label: "不足",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Measures",
                label: "扬长避短措施",
                type: "editor",
                max: 10240,
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