<template>
  <div class="SubWebPage">
    <el-row :gutter="20">
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>功能树</span>
          </div>
          <el-tree
            ref="tree"
            :data="treeData"
            node-key="Id"
            :props="{
              children: 'Childrens',
              label: 'Name',
            }"
            :default-expanded-keys="[null]"
            check-strictly
            highlight-current
            accordion
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="18" :offset="0">
        <simple-page-list
          ref="pagelist"
          :setting="setting"
          @handleDrawerFormInitData="handleDrawerFormInitData"
          @handleDrawerFormSubmit="handleDrawerFormSubmit"
          @handleCustomBtnClick="handleCustomBtnClick"
          @handleSearch="search"
        ></simple-page-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SimplePageList from "@/components/SimplePageList.vue";
export default {
  components: { SimplePageList },
  data() {
    return {
      treeData: [],
      treeCurrent: null,
      setting: {
        title: "功能列表",
        titleBtns: [
          {
            type: "custom",
            theme: "primary",
            icon: "el-icon-plus",
            label: "一键CRUD",
            power: "SystemMgr_FunctionMgr_Post",
          },
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "SystemMgr_FunctionMgr_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_FunctionMgr_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_FunctionMgr_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/function",
            power: "SystemMgr_FunctionMgr_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "代码" },
          { prop: "Name", label: "名称" },
          {
            prop: "Type",
            label: "功能类型",
            pipe: "enum",
            pipeArgs: [
              { Id: 1, Name: "菜单" },
              { Id: 2, Name: "页面" },
              { Id: 3, Name: "接口" },
              { Id: 4, Name: "权限" },
            ],
            width: "50px",
          },
          {
            prop: "Enable",
            label: "启用",
            pipe: "bool",
            pipeArgs: ["启用", "禁用"],
            width: "50px",
          },
          { prop: "Sort", label: "排序", width: "50px" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/function",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "代码",
                type: "text",
                span: 24,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                span: 24,
              },
              {
                prop: "Icon",
                label: "图标",
                type: "text",
                span: 24,
              },
              {
                prop: "Type",
                label: "功能类型",
                type: "text",
                span: 24,
                pipe: "enum",
                pipeArgs: [
                  { Id: 1, Name: "菜单" },
                  { Id: 2, Name: "页面" },
                  { Id: 3, Name: "接口" },
                  { Id: 4, Name: "权限" },
                ],
              },
              {
                prop: "Link",
                label: "路由地址",
                type: "text",
                span: 24,
              },
              {
                prop: "Sort",
                label: "排序",
                type: "text",
                span: 24,
              },
              {
                prop: "Enable",
                label: "启用",
                type: "text",
                span: 24,
                pipe: "bool",
                pipeArgs: ["启用", "禁用"],
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/function",
            show: false,
            id: undefined,
            custom: true,
            items: [
              {
                prop: "ParentId",
                label: "上级Id",
                type: "text",
                required: true,
                max: 256,
                span: 24,
                hide: true,
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
                prop: "Icon",
                label: "图标",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "Type",
                label: "类型",
                type: "select",
                required: true,
                span: 24,
                options: [
                  { Id: 1, Name: "菜单" },
                  { Id: 2, Name: "页面" },
                  { Id: 3, Name: "接口" },
                  { Id: 4, Name: "权限" },
                ],
                loading: false,
                immediate: true,
              },
              {
                prop: "Link",
                label: "路由地址",
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
                pattern: /^([+-]?[1-9]\d*|0)$/,
                patternMsg: "请输入整数！",
                span: 24,
              },
              {
                prop: "Enable",
                label: "启用",
                type: "check",
                default: true,
                span: 24,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleCustomBtnClick(btn) {
      if (btn.label == "一键CRUD" && this.treeCurrent.Type == 2) {
        let that = this;
        that.$post("/api/function", that.getCRUD("Get")).then(function (r) {
          that.$post("/api/function", that.getCRUD("Post")).then(function (r) {
            that.$post("/api/function", that.getCRUD("Put")).then(function (r) {
              that
                .$post("/api/function", that.getCRUD("Delete"))
                .then(function (r) {
                  that.search();
                });
            });
          });
        });
      } else if (btn.label == "删除") {
        this.search();
      }
    },
    getCRUD(type) {
      return {
        ParentId: this.treeCurrent.Id,
        Code: this.treeCurrent.Code + "_" + type,
        Name:
          type == "Get"
            ? "查看"
            : type == "Post"
            ? "添加"
            : type == "Put"
            ? "编辑"
            : "删除",
        Type: 3,
        Sort: 10,
        Enable: true,
      };
    },
    handleNodeClick(data) {
      this.treeCurrent = data;
      this.$refs.pagelist.data = data.Childrens;
    },
    handleDrawerFormInitData(row, $form) {
      if (row) {
        this.$get("/api/function/" + row.Id, null).then(function (r) {
          $form.writeFormData(r);
        });
      } else if (this.treeCurrent) {
        let form = {
          ParentId: this.treeCurrent.Id,
          Code: this.treeCurrent.Code ? this.treeCurrent.Code + "_" : null,
          Sort:
            Math.max.apply(
              Math,
              (this.treeCurrent.Childrens ?? []).map((it) => it.Sort)
            ) + 10,
          Enable: true,
        };
        $form.writeFormData(form);
      }
    },
    handleDrawerFormSubmit(args, index, close) {
      let that = this;
      let form = args[0];
      var request = form.Id ? this.$put : this.$post;
      request("/api/function", form).then(function (r) {
        close(index);
        that.search();
      });
    },
    search() {
      let that = this;
      this.$get("/api/function", null).then(function (r) {
        let data = {
          Id: null,
          Name: "根节点",
          Childrens: r,
        };
        that.treeData = [data];
        that.handleNodeClick(data);
      });
    },
  },
  created() {
    this.search();
  },
};
</script>

<style lang="sass">
</style>