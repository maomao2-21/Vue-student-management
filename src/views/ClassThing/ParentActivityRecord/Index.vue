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
        title: "家长会",
        action: "/api/class-parent-activity-record",
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
            power: "ClassThing_ParentActivityRecord_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_ParentActivityRecord_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_ParentActivityRecord_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-parent-activity-record",
            power: "ClassThing_ParentActivityRecord_Delete",
          },
        ],
        columns: [
          { prop: "SchoolClassName", label: "班级", width: "120px" },
          { prop: "Address", label: "地点" },
          {
            prop: "CreatedTime",
            label: "时间",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
          { prop: "Number", label: "人数", width: "50px" },
          { prop: "Organizer", label: "组织者", width: "120px" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-parent-activity-record",
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
                prop: "Address",
                label: "地点",
                type: "text",
                span: 12,
              },
              {
                prop: "CreatedTime",
                label: "时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 12,
              },
              {
                prop: "Number",
                label: "人数",
                type: "text",
                span: 12,
              },
              {
                prop: "Organizer",
                label: "组织者",
                type: "text",
                span: 12,
              },
              {
                prop: "Objective",
                label: "目的",
                type: "editor",
                span: 24,
              },
              {
                prop: "Form",
                label: "形式",
                type: "editor",
                span: 24,
              },
              {
                prop: "Process",
                label: "过程",
                type: "editor",
                span: 24,
              },
              {
                prop: "Effect",
                label: "效果",
                type: "editor",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/class-parent-activity-record",
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
                type: "select",
                prop: "Address",
                label: "地点",
                required: true,
                max: 256,
                span: 12,
                action:
                  "/api/class-parent-activity-record/address-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "CreatedTime",
                label: "时间",
                type: "date",
                required: true,
                span: 12,
              },
              {
                prop: "Number",
                label: "人数",
                type: "text",
                required: true,
                pattern: /^([1-9]\d*)$/,
                patternMsg: "请输入正整数！",
                span: 12,
              },
              {
                type: "select",
                prop: "Organizer",
                label: "组织者",
                required: true,
                max: 128,
                span: 12,
                action:
                  "/api/class-parent-activity-record/organizer-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "Objective",
                label: "目的",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Form",
                label: "形式",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Process",
                label: "过程",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Effect",
                label: "效果",
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