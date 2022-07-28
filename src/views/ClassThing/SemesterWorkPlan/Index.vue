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
        title: "学期工作计划",
        action: "/api/class-semester-work-plan",
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
            prop: "Type",
            label: "类型",
            action: "/api/class-semester-work-plan/type-dropdown-box",
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
            power: "ClassThing_SemesterWorkPlan_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_SemesterWorkPlan_Put",
          },
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_SemesterWorkPlan_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-semester-work-plan",
            power: "ClassThing_SemesterWorkPlan_Delete",
          },
        ],
        columns: [
          { prop: "Type", label: "类型", title: true },
          { prop: "Content", label: null, pipe: "editor" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-semester-work-plan",
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
                prop: "Type",
                label: "类型",
                type: "text",
                span: 24,
              },
              {
                prop: "Content",
                label: "内容",
                type: "editor",
                span: 24,
              },
              {
                prop: "CreatedTime",
                label: "创建时间",
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
            action: "/api/class-semester-work-plan",
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
                prop: "SchoolClassId",
                label: "班级",
                type: "select",
                required: true,
                span: 24,
                action: "/api/school-class/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "Type",
                label: "类型",
                type: "select",
                required: true,
                span: 24,
                action: "/api/class-semester-work-plan/type-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "Content",
                label: "内容",
                type: "editor",
                required: true,
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