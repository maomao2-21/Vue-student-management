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
        title: "班级获奖",
        action: "/api/class-award-winning",
        searchFormItem: [
          {
            type: "select",
            prop: "SemesterId",
            label: "学期",
            action: "/api/semester/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 12,
          },
          {
            type: "select",
            prop: "SchoolClassId",
            label: "班级",
            action: "/api/school-class/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 12,
          },
          {
            type: "select",
            prop: "Type",
            label: "获奖类型",
            action: "/api/class-award-winning/type-dropdown-box",
            options: [],
            loading: false,
            span: 12,
          },
          {
            type: "select",
            prop: "Level",
            label: "获奖级别",
            action: "/api/class-award-winning/level-dropdown-box",
            options: [],
            loading: false,
            span: 12,
          },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "ClassThing_ClassAwardWinning_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_ClassAwardWinning_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_ClassAwardWinning_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-award-winning",
            power: "ClassThing_ClassAwardWinning_Delete",
          },
        ],
        columns: [
          { prop: "Name", label: "获奖名称" },
          { prop: "Type", label: "获奖类型", width: "200px" },
          { prop: "Level", label: "获奖级别", width: "120px" },
          { prop: "SchoolClassName", label: "班级", width: "120px" },
          {
            prop: "CreatedTime",
            label: "获奖日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD"],
            width: "100px",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-award-winning",
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
                label: "获奖类型",
                type: "text",
                span: 12,
              },
              {
                prop: "Level",
                label: "获奖级别",
                type: "text",
                span: 12,
              },
              {
                prop: "Name",
                label: "获奖名称",
                type: "text",
                span: 12,
              },
              {
                prop: "CreatedTime",
                label: "获奖时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 12,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "editor",
                span: 24,
              },
              {
                prop: "ClassAwardWinningFileStorages",
                label: "获奖奖状",
                type: "files",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/class-award-winning",
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
                prop: "Type",
                label: "获奖类型",
                required: true,
                max: 256,
                span: 12,
                action: "/api/class-award-winning/type-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                type: "select",
                prop: "Level",
                label: "获奖级别",
                required: true,
                max: 256,
                span: 12,
                action: "/api/class-award-winning/level-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                type: "select",
                prop: "Name",
                label: "获奖名称",
                required: true,
                max: 256,
                span: 12,
                action: "/api/class-award-winning/name-dropdown-box",
                options: [],
                loading: false,
                allowcreate: true,
              },
              {
                prop: "CreatedTime",
                label: "获奖时间",
                type: "date",
                required: true,
                span: 12,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "ClassAwardWinningFileStorages_FileStorageId",
                nesting: true,
                label: "获奖奖状",
                type: "files",
                action: "/api/file-storage/upload/ClassAwardWinning",
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