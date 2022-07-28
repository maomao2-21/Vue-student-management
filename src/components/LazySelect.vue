<template>
  <span>
    <el-autocomplete
      v-if="allowcreate"
      style="width: 100%"
      v-model="form[prop]"
      :fetch-suggestions="handleQuerySearch"
      :placeholder="placeholder ? placeholder : '请输入'"
      value-key="Name"
      value="Id"
    ></el-autocomplete>
    <el-select
      v-else
      v-model="form[prop]"
      value-key="Id"
      :placeholder="placeholder ? placeholder : '请选择'"
      :clearable="clearable"
      filterable
      :loading="loading"
      :allow-create="allowcreate"
      :multiple="multiple"
      @change="handleSelectChange"
      @focus="handleSelectFocus"
      style="width: 100%"
    >
      <el-option
        v-for="item in data"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id"
      >
      </el-option>
    </el-select>
  </span>
</template>

<script>
export default {
  props: {
    /** 表单 */
    form: Object,
    /** 属性名 */
    prop: String,
    /** 选项数据 */
    options: Array,
    /** 地址 */
    action: String,
    /** 参数 */
    params: Object,
    /** 触发刷新 */
    refresh: Array,
    /** 自动完成 */
    allowcreate: Boolean,
    /** 多选 */
    multiple: Boolean,
    /** 即时加载 */
    immediate: Boolean,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /** 加载 */
      loading: false,
      data: [],
    };
  },
  methods: {
    filter(queryString) {
      return queryString
        ? this.data.filter(
            (v) =>
              v.Name &&
              v.Name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
          )
        : this.data;
    },
    handleQuerySearch(queryString, cb) {
      let that = this;
      if (this.data && this.data.length > 0) {
        cb(this.filter(queryString));
      } else {
        this.getData(function () {
          cb(that.filter(queryString));
        });
      }
    },
    /** 选择器值变更时 */
    handleSelectChange(v) {
      // 清除值 删除字段
      if (v == "") {
        this.form[this.prop] = undefined;
      }
      if (this.refresh) {
        for (let i = 0; i < this.refresh.length; i++) {
          const element = this.refresh[i];
          if (this.form[element]) {
            this.form[element] = undefined;
          }
        }
      }
      this.$emit("handleSelectChange", v, this.data);
    },
    setDefault() {
      let defaultId = this.data.filter((v) => v.Default)[0]?.Id;
      if (defaultId) {
        this.form[this.prop] = defaultId;
        this.handleSelectChange(defaultId, this.data);
      } else {
        this.form[this.prop] = undefined;
      }
    },
    getData(cb) {
      let that = this;
      let data = {};
      this.loading = true;
      if (this.params) {
        for (const key in this.params) {
          const paramItem = this.params[key];
          if (key.indexOf("$") == 0 && this.form[paramItem]) {
            var queryKey = key.substring(1);
            data[queryKey] = this.form[paramItem];
          }
        }
      }
      this.$get(this.action, data).then(function (r) {
        that.data = r;
        if (
          that.immediate &&
          !that.form[that.prop] &&
          !that.form[that.prop + "_load"]
        ) {
          let defaultId = r.filter((v) => v.Default)[0]?.Id;
          if (defaultId) {
            that.form[that.prop] = defaultId;
            that.handleSelectChange(defaultId, that.data);
          }
        }

        if (that.form[that.prop]) {
          if (that.multiple) {
          } else {
            if (
              that.data.filter((v) => v.Id == that.form[that.prop]).length == 0
            ) {
              that.form[that.prop] = undefined;
            }
          }
        }
        that.form[that.prop + "_load"] = true;
        that.loading = false;
        if (cb) {
          cb();
        }
      });
    },
    /** 搜索表单 下拉框焦点时 加载 */
    handleSelectFocus() {
      if (this.options && this.options.length > 0) {
        this.data = this.options;
      } else if (!this.loading) {
        if (this.action && (this.data.length == 0 || this.params)) {
          this.getData();
        }
      }
    },
  },
  created() {
    console.log(this.clearable);
    if (this.immediate) {
      this.handleSelectFocus();
    }
  },
};
</script>

<style lang="sass">
</style>