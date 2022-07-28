<template>
  <el-form
    v-if="items"
    :model="form"
    ref="form"
    :label-width="labelWidth"
    size="normal"
  >
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>搜索</span>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in items" :key="index" :span="item.span">
          <el-form-item :label="item.label">
            <!-- 文本 -->
            <el-input
              v-if="item.type == 'text'"
              v-model="form[item.prop]"
            ></el-input>
            <!-- 下拉框 -->
            <lazy-select
              v-else-if="item.type == 'select'"
              :ref="'form_' + item.prop"
              :form="form"
              :prop="item.prop"
              :options="item.options"
              :action="item.action"
              :params="item.params"
              :refresh="item.refresh"
              :allowcreate="item.allowcreate"
              :multiple="item.multiple"
              :immediate="item.immediate"
            ></lazy-select>
            <!-- 时间 -->
            <el-date-picker
              v-else-if="item.type == 'daterange'"
              v-model="form[item.prop]"
              type="daterange"
              range-separator="至"
              format="yyyy-MM-dd"
              style="width: 100%"
            >
            </el-date-picker>
            <!-- 地区 -->
            <Area
              v-else-if="item.type == 'area'"
              :ids.sync="form[item.prop]"
            ></Area>
            <!-- 下拉框 -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="search-form-btn-panel">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>
import LazySelect from "./LazySelect.vue";
import Area from "./Area.vue";
export default {
  components: { LazySelect, Area },
  props: {
    labelWidth: {
      type: String,
      default: "80px",
    },
    items: Array,
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    /** 更改搜索条件 */
    setQuery(query) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        var key = item.prop;
        var value = this.form[key];
        // 格式化时间
        if (item.type == "daterange") {
          query[item.prop] = value.map((v, i) =>
            moment(v).format("YYYY-MM-DD")
          );
        } else {
          query[key] = value;
        }
      }
    },
    /** 生成搜索表单数据 */
    setForm() {
      let data = {};
      let query = this.$route.query;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.type == "area" || item.type == "daterange") {
          data[item.prop] = [];
        } else {
          data[item.prop] = item.data;
        }
        if (item.type == "select" && item.action && query[item.prop]) {
          this.$refs["form_" + item.prop][0].handleSelectFocus();
        }
      }
      for (const key in query) {
        if (Array.isArray(data[key]) && !Array.isArray(query[key])) {
          data[key].push(query[key]);
        } else {
          data[key] = query[key];
        }
      }
      this.form = data;
    },
    /** 查询 */
    search() {
      this.$emit("search", "search");
    },
    /** 重置 */
    reset() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.type == "area" || item.type == "daterange") {
          this.form[item.prop] = [];
        }
        else if (item.type == "select" && item.immediate) {
          this.$refs['form_' + item.prop][0].setDefault();
        }
        else {
          this.form[item.prop] = undefined;
        }
      }
      this.search();
    },
  },
  created() {
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];
      // 地区
      if (element.type == "area") {
        this.form[element.prop] = [];
      }
    }
  },
  mounted() {
    this.setForm();
  },
};
</script>

<style lang="sass">
.search-form-btn-panel
  text-align: center
</style>