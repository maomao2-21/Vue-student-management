<template>
  <el-form :model="form" ref="form" label-width="120px" size="normal">
    <div class="form-body" style="bottom: 10px">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in items"
          :key="index"
          :span="item.span"
          :offset="0"
        >
          <el-form-item :label="item.label">
            <!-- 文本 -->
            <span v-if="item.type == 'text'">{{ form[item.prop] }}</span>
            <!-- 富文本 -->
            <span
              v-else-if="item.type == 'editor'"
              v-html="form[item.prop]"
            ></span>
            <div v-else-if="item.type == 'files'">
              <div
                v-for="file in form[item.prop]"
                :key="file.Id"
                style="float: left; width: 100px; margin-right: 10px"
              >
                <el-link
                  type="info"
                  :href="baseURL + file.FileStoragePath"
                  :title="file.FileStorageFilename"
                  target="_blank"
                >
                  <el-image
                    v-if="file.FileStorageContentType.indexOf('image/') == 0"
                    style="width: 100px; height: 100px"
                    :src="baseURL + file.FileStoragePath"
                    fit="fill"
                  ></el-image>
                  <el-image
                    v-else
                    style="width: 100px; height: 100px"
                    :src="require('@/assets/image/file.png')"
                    fit="fill"
                  ></el-image>
                  <div
                    style="
                      width: 100px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ file.FileStorageFilename }}
                  </div>
                </el-link>
              </div>
            </div>
            <!-- 树 -->
            <el-tree
              v-else-if="item.type == 'tree'"
              :ref="'tree_' + item.prop"
              :data="item.options"
              node-key="Id"
              :props="{
                children: 'Childrens',
                label: 'Name',
              }"
              check-strictly
              show-checkbox
              highlight-current
              accordion
              :default-expanded-keys="form[item.prop]"
            ></el-tree>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import moment from "moment/moment";
export default {
  props: {
    items: Array,
    action: String,
    id: String,
    custom: Boolean,
    row: Object,
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    initData(r) {
      let that = this;
      that.form = r;
      for (let i = 0; i < that.items.length; i++) {
        const element = that.items[i];
        if (element.type == "tree") {
          that.form[element.prop] = [];

          /** 查询树数据 */
          that.$get(element.action, null).then(function (r) {
            element.options = r;
            let props = element.prop.split("_");
            let data = that.form[props[0]];
            // 数组 遍历插入嵌套数据
            if (data && Array.isArray(data)) {
              for (let i = 0; i < data.length; i++) {
                const item = data[i];
                that.form[element.prop].push(item[props[1]]);
              }
            }
            // 树 组件
            let tree = that.$refs["tree_" + element.prop][0];
            // 选中
            tree.setCheckedKeys(that.form[element.prop]);
          });
        }
        // 嵌套数据
        else if (element.nesting) {
          that.form[element.prop] = that.$getNestingValue(element, that.form);
        }
        // 布尔管道
        if (element.pipe == "bool") {
          that.form[element.prop] =
            that.form[element.prop] == undefined
              ? "--"
              : that.form[element.prop]
              ? element.pipeArgs[0]
              : element.pipeArgs[1];
        } else if (element.pipe == "enum") {
          that.form[element.prop] =
            that.form[element.prop] == undefined
              ? "--"
              : element.pipeArgs.filter((v) => v.Id == that.form[element.prop])[0].Name;
        }
        // 日期管道
        else if (element.pipe == "date") {
          if (that.form[element.prop] == "0001-01-01T00:00:00+00:00") {
            that.form[element.prop] = "--";
          } else {
            var format = element.pipeArgs[0];
            that.form[element.prop] = moment(that.form[element.prop]).format(
              format
            );
          }
        }
      }
    },
  },
  mounted() {
    let that = this;
    if (this.custom) {
      this.$emit("handleInitData", this.row);
    } else if (this.action && this.id) {
      this.$get(this.action + "/" + this.id).then(function (r) {
        that.initData(r);
      });
    }
  },
};
</script>

<style lang="scss">
</style>