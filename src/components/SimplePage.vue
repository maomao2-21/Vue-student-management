<template>
  <el-pagination
    class="page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageIndex"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="pageLayout"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: Number,
  },
  data() {
    return {
      /** 当前页 */
      pageIndex: 1,
      /** 每页数量 */
      pageSize: 10,
      /** 每页数量 */
      pageSizes: [10, 20, 50, 100, 200, 300, 500],
      /** 分页布局 */
      pageLayout: "total, sizes, prev, pager, next",
    };
  },
  methods: {
    setQuery(query) {
      query.PageIndex = this.pageIndex;
      query.PageSize = this.pageSize;
    },
    /** 分页-每页数量变更时 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("change");
    },
    /** 分页-当前页变更时 */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.$emit("change");
    },
  },
  created() {
    let query = this.$route.query;
    if (query.PageIndex) {
      this.pageIndex = parseInt(query.PageIndex);
    }
    if (query.PageSize) {
      this.pageSize = parseInt(query.PageSize);
    }
  },
};
</script>

<style lang="sass">
</style>