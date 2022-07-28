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
        title: "地区列表",
        action: "/api/area",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 24 },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "SystemMgr_DataDic_Area_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_DataDic_Area_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/area",
            power: "SystemMgr_DataDic_Area_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "代码", width: "90px" },
          { prop: "Name", label: "名称" },
          { prop: "ParentName", label: "上级城市" },
          { prop: "Sort", label: "排序" },
          {
            prop: "CreatedTime",
            label: "注册时间",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "form",
            type: "form",
            action: "/api/area",
            show: false,
            id: undefined,
            items: [
              {
                prop: "AreaIds",
                label: "父级地区",
                type: "area",
                span: 24,
              },
              {
                prop: "Code",
                label: "代码",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
              {
                prop: "Sort",
                label: "排序",
                type: "text",
                required: true,
                max: 256,
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