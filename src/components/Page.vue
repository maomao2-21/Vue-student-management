<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="PageIndex"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="totalPage"
      class="pageClass"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: Number,
  },
  created() {
    if (this.$route.query.PageIndex) {
      this.PageIndex = this.$route.query.PageIndex * 1;
    }
  },
  methods: {
    handleCurrentChange(val) {
      let route = this.$route;
      let querys = JSON.parse(JSON.stringify(route.query));
      querys.PageIndex = val;
      this.$router.push({ path: route.path, query: querys });
      this.PageIndex = val;
    },
  },
  data() {
    return {
      PageIndex: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.pageClass {
  float: right;
}
</style>