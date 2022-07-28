<template>
  <div class="simple-page-list">
    <!-- 搜索表单 -->
    <simple-search-form
      v-if="setting.searchFormItem"
      ref="searchForm"
      :labelWidth="setting.searchFormLabelWidth"
      :items="setting.searchFormItem"
      @search="search"
    ></simple-search-form>
    <!-- 列表卡片 -->
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 卡片标题 -->
      <div slot="header" class="">
        <span>{{ setting.title }}</span>
        <span v-for="(item, index) in setting.titleBtns" :key="index">
          <pow-button
            type="title"
            class="table-card-btn"
            :options="item"
            :drawers="setting.drawers"
            @handleOpenDrawer="handleOpenDrawer"
            @handleRefresh="search"
            @handleCustomBtnClick="handleCustomBtnClick"
          ></pow-button>
        </span>
      </div>

      <!-- 卡片内容：卡片 -->
      <simple-card-list
        v-if="data.length > 0 && setting.type == 'card'"
        :data="data"
        :columns="setting.columns"
        :btns="setting.rowBtns"
        :span="setting.span"
        :check="setting.check"
        :drawers="setting.drawers"
        @handleSelectionChange="handleSelectionChange"
        @handleOpenDrawer="handleOpenDrawer"
        @handleRefresh="search"
        @handleCustomBtnClick="handleCustomBtnClick"
      ></simple-card-list>

      <!-- 卡片内容：列表 -->
      <simple-table-list
        v-else-if="data.length > 0"
        :data="data"
        :columns="setting.columns"
        :btns="setting.rowBtns"
        :check="setting.check"
        :index="setting.index"
        :drawers="setting.drawers"
        @handleRowBtnShow="handleRowBtnShow"
        @handleSelectionChange="handleSelectionChange"
        @handleOpenDrawer="handleOpenDrawer"
        @handleRefresh="search"
        @handleCustomBtnClick="handleCustomBtnClick"
        @handleRowBtnCustomLabel="handleRowBtnCustomLabel"
      ></simple-table-list>

      <!-- 卡片内容：无数据时 -->
      <el-alert v-else-if="loading" title="暂无数据" type="warning" show-icon>
      </el-alert>

      <!-- 卡片底部 -->
      <el-row class="page-footer">
        <!-- 批量按钮 -->
        <el-col :span="12" :offset="0">
          <span style="visibility: hidden; width: 1px; float: right"
            >批量按钮</span
          >
          <span v-for="(item, index) in setting.batchBtns" :key="index">
            <pow-button
              type="batch"
              class="margin-right-5"
              :options="item"
              :multipleSelectionIds="multipleSelectionIds"
              :drawers="setting.drawers"
              @handleOpenDrawer="handleOpenDrawer"
              @handleRefresh="search"
              @handleCustomBtnClick="handleCustomBtnClick"
            ></pow-button>
          </span>
        </el-col>
        <!-- 分页 -->
        <el-col :span="12" :offset="0">
          <simple-page ref="page" :total="total" @change="search"></simple-page>
        </el-col>
      </el-row>
    </el-card>
    <!-- 抽屉 -->
    <div v-for="(item, index) in setting.drawers" :key="index">
      <el-drawer
        :ref="'drawer_' + item.name"
        :title="item.title"
        :visible.sync="item.show"
        direction="rtl"
        :size="item.size"
        :destroy-on-close="true"
        :show-close="true"
        :wrapperClosable="true"
      >
        <simple-form
          v-if="item.type == 'form'"
          ref="form"
          :action="item.action"
          :id="item.id"
          :ids="item.ids"
          :row="item.row"
          :items="item.items"
          :custom="item.custom"
          @handleInitData="handleDrawerFormInitData"
          @handleSubmit="handleDrawerFormSubmit(arguments, index)"
        ></simple-form>
        <simple-detail
          v-else-if="item.type == 'detail'"
          ref="detail"
          :action="item.action"
          :id="item.id"
          :row="item.row"
          :items="item.items"
          :custom="item.custom"
          @handleInitData="handleDrawerDetailInitData"
        ></simple-detail>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import PowButton from "./PowButton.vue";
import SimpleSearchForm from "./SimpleSearchForm.vue";
import SimplePage from "./SimplePage.vue";
import SimpleCardList from "./SimpleCardList.vue";
import SimpleTableList from "./SimpleTableList.vue";
import SimpleForm from "./SimpleForm.vue";
import SimpleDetail from "./SimpleDetail.vue";
export default {
  components: {
    PowButton,
    SimpleSearchForm,
    SimplePage,
    SimpleCardList,
    SimpleTableList,
    SimpleForm,
    SimpleDetail,
  },
  props: {
    /** 配置项 */
    setting: Object,
  },
  data() {
    return {
      /** 列表加载中 */
      loading: false,
      /** 列表数据 */
      data: [],
      /** 总数 */
      total: 0,
      /** 选中数据 */
      multipleSelection: [],
      /** 选中Id */
      multipleSelectionIds: [],
    };
  },
  methods: {
    handleRowBtnCustomLabel(options, row, cb) {
      this.$emit("handleRowBtnCustomLabel", options, row, cb);
    },
    handleRowBtnShow(btn, row, cb) {
      this.$emit("handleRowBtnShow", btn, row, cb);
    },
    /** 抽屉-详细-初始化数据 */
    handleDrawerDetailInitData(row) {
      this.$emit("handleDrawerDetailInitData", row, this.$refs.detail[0]);
    },
    /** 抽屉-表单-初始化数据 */
    handleDrawerFormInitData(row) {
      this.$emit("handleDrawerFormInitData", row, this.$refs.form[0]);
    },
    /** 抽屉-表单提交 */
    handleDrawerFormSubmit(args, index) {
      let that = this;
      if (args[1]) {
        this.$emit(
          "handleDrawerFormSubmit",
          args,
          index,
          this.handleCloseDrawer
        );
      } else {
        this.handleCloseDrawer(index);
      }
    },
    handleCloseDrawer(index) {
      const element = this.setting.drawers[index];
      element.show = false;
      element.id = undefined;
      this.search();
      this.$refs["drawer_" + element.name][0].closeDrawer();
    },
    /** 选择数据时 */
    handleSelectionChange(multipleSelection, multipleSelectionIds) {
      this.multipleSelection = multipleSelection;
      this.multipleSelectionIds = multipleSelectionIds;
    },
    handleOpenDrawer(options, id, ids, row) {
      this.$emit("handleOpenDrawer", options, id, ids, row);
    },
    handleCustomBtnClick(a, b, c) {
      this.$emit("handleCustomBtnClick", a, b, c);
    },
    /** 查询 */
    search(type) {
      if (this.setting.action) {
        let that = this;
        this.loading = false;
        let route = this.$route;
        let query = JSON.parse(JSON.stringify(route.query));
        if (this.$refs.searchForm) {
          this.$refs.searchForm.setQuery(query);
        }
        if (this.$refs.page) {
          this.$refs.page.setQuery(query);
        }
        if (type == "search") {
          query.PageIndex = 1;
        }
        this.$router.push({ path: route.path, query: query });
        this.$get(this.setting.action, query).then(function (r) {
          let Items = r.Items;
          that.data = Items;
          that.total = r.TotalCount;
          that.loading = true;
        });
      } else {
        this.$emit("handleSearch");
      }
    },
    wait() {
      let that = this;
      let success = true;
      if (this.$refs.searchForm && this.$refs.searchForm.form) {
        let form = this.$refs.searchForm.form;
        if (this.setting.searchFormItem) {
          for (let i = 0; i < this.setting.searchFormItem.length; i++) {
            const element = this.setting.searchFormItem[i];
            if (element.immediate && !form[element.prop + "_load"]) {
              success = false;
            }
          }
        }
      }
      if (success) {
        this.search();
      } else {
        setTimeout(function () {
          that.wait();
        }, 100);
      }
    },
  },
  mounted() {
    console.log("----------这是一个分割线----------");
    this.wait();
  },
};
</script>

<style lang="sass">
.margin-right-5
  margin-right: 5px

.table-card-btn
  float: right
  margin-right: 5px

.search-form-btn-panel
  text-align: center

.page-footer
  position: fixed
  padding: 0px 10px
  height: 50px
  line-height: 50px
  bottom: 20px
  background-color: #FFF
  z-index: 999
  left: 16.875rem
  right: 2.5rem

.page
  float: right
  padding-top: 13px
</style>