<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      size="normal"
    >
      <el-row :gutter="20" class="form-body">
        <el-col
          v-for="(item, index) in items"
          :key="index"
          :lg="item.span"
          :md="24"
          :offset="0"
        >
          <el-form-item v-if="!item.hide" :label="item.label" :prop="item.prop">
            <!-- 文本 -->
            <el-input
              v-if="item.type == 'text'"
              v-model="form[item.prop]"
              :disabled="item.disabled"
              style="width: 100%"
            ></el-input>
            <el-input
              v-else-if="item.type == 'password'"
              v-model="form[item.prop]"
              :disabled="item.disabled"
              style="width: 100%"
              type="password"
              show-password
              auto-complete="new-password"
            ></el-input>
            <!-- 文本域 -->
            <el-input
              v-else-if="item.type == 'textarea'"
              v-model="form[item.prop]"
              type="textarea"
              style="width: 100%"
            ></el-input>
            <!-- 富文本 -->
            <Editor
              v-else-if="item.type == 'editor'"
              :form="form"
              :prop="item.prop"
              @blur="validateField(item.prop)"
            ></Editor>
            <!-- 复选框 -->
            <el-checkbox
              v-else-if="item.type == 'check'"
              v-model="form[item.prop]"
              :indeterminate="false"
            ></el-checkbox>
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
              v-else-if="item.type == 'date'"
              v-model="form[item.prop]"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            >
            </el-date-picker>
            <!-- 时间域 -->
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
            <el-upload
              v-else-if="item.type == 'files'"
              :action="item.action"
              :auto-upload="true"
              :data="item"
              :http-request="hanleFileUpload"
              :on-remove="handleFileRemove"
              :file-list="form[item.prop + '_Files']"
              list-type="picture"
              multiple
              show-file-list
            >
              <el-button type="primary" size="mini" inon="el-icon-upload"
                >上传文件</el-button
              >
            </el-upload>
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
              @check-change="handleTreeCheckChange(arguments, item)"
            ></el-tree>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="form-footer">
        <el-col :span="12" :offset="0">
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Area from "./Area.vue";
import LazySelect from "./LazySelect.vue";
export default {
  components: { Editor, Area, LazySelect },
  props: {
    /** Id */
    id: String,
    /** Id集合 */
    ids: Array,
    /** 请求地址 */
    action: String,
    /** 表单元素 */
    items: Array,
    /** 自定义 */
    custom: Boolean,
    /** 行数据 */
    row: Object,
  },
  data() {
    // 遍历表单元素
    let form = {};
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];
      // 地区
      if (element.type == "area") {
        form[element.prop] = [];
      }
      // 复选框
      else if (element.type == "check" && element.default != undefined) {
        // 默认值
        form[element.prop] = element.default;
      }
      // 树
      else if (element.type == "tree") {
        form[element.prop] = [];
        /** 查询树数据 */
        this.$get(element.action, null).then(function (r) {
          element.options = r;
        });
      } else if (element.type == "files") {
        form[element.prop] = [];
        form[element.prop + "_Files"] = [];
      } else {
        form[element.prop] = null;
      }
    }
    return {
      /** 表单数据 */
      form: form,
      /** 表单校验 */
      rules: {},
      /** 是否为添加表单 */
      add: true,
    };
  },
  methods: {
    handleFileRemove(info) {
      var files = this.form[info.prop];
      files.splice(files.indexOf(info.id), 1);
    },
    hanleFileUpload(info) {
      let that = this;
      const data = new FormData();
      data.append("file", info.file);
      this.$post(info.action, data).then(function (r) {
        that.form[info.data.prop].push(r.Id);
      });
    },
    handleEditorChange(v, item) {
      this.form[item.prop] = v.html;
    },
    /** 生成表单校验 */
    buildRules() {
      let that = this;
      for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        this.rules[element.prop] = [];
        if (element.required) {
          this.rules[element.prop].push({
            required: true,
            message: "必填",
            trigger:
              ["text", "textarea", "editor"].indexOf(element.type) > -1
                ? "blur"
                : "change",
          });
        }
        if (element.max) {
          this.rules[element.prop].push({
            max: element.max,
            message: "文本长度不能超过 " + element.max + " 个字符",
            trigger: "blur",
          });
        }
        if (element.pattern) {
          this.rules[element.prop].push({
            validator: (rule, value, callback) => {
              if (!element.pattern.test(value)) {
                return callback(new Error(element.patternMsg));
              } else {
                callback();
              }
            },
          });
        }
        if (element.someTo) {
          this.rules[element.prop].push({
            validator: (rule, value, callback) => {
              if (value != that.form[element.someTo]) {
                return callback(new Error(element.someToMsg));
              } else {
                callback();
              }
            },
          });
        }
      }
    },
    /** 树 节点选择变更时 */
    handleTreeCheckChange(args, item) {
      let tree = this.$refs["tree_RoleFunctions_FunctionId"][0];
      // 当前节点
      let currentNode = args[0];
      // 是否选中
      let check = args[1];
      // 选中节点
      let checkNodeIds = this.form[item.prop];
      // 选中节点
      if (check) {
        if (checkNodeIds.indexOf(currentNode.Id) == -1) {
          checkNodeIds.push(currentNode.Id);
        }
        // 选中节点时 所有父节点选中
        if (currentNode.ParentId) {
          for (let i = 0; i < currentNode.ParentIds.length; i++) {
            const parentId = currentNode.ParentIds[i];
            if (checkNodeIds.indexOf(parentId) == -1) {
              checkNodeIds.push(parentId);
            }
          }
        }
      }
      // 取消节点
      else {
        let index = checkNodeIds.indexOf(currentNode.Id);
        if (index > -1) {
          checkNodeIds.splice(index, 1);
        }
      }
      // 选中节点时 若子节点无选中时 全选子节点
      // 取消节点时 取消所有子节点
      if (currentNode.Childrens) {
        this.treeCheckChildren(currentNode, checkNodeIds, check);
      }
      // 设置节点选中
      tree.setCheckedKeys(checkNodeIds);
    },
    /** 树 选中/取消子节点 */
    treeCheckChildren(node, checkNodeIds, check) {
      // 选中
      if (check && checkNodeIds.indexOf(node.Id) == -1) {
        checkNodeIds.push(node.Id);
      }
      // 取消
      else if (!check) {
        let index = checkNodeIds.indexOf(node.Id);
        if (index > -1) {
          checkNodeIds.splice(index, 1);
        }
      }
      // 有子节点时
      // 选中节点时 若子节点无选中时 全选子节点
      // 取消节点时 取消所有子节点
      if (
        node.Childrens &&
        ((check &&
          node.Childrens.filter((v) => checkNodeIds.indexOf(v.Id) > -1)
            .length == 0) ||
          !check)
      ) {
        for (let i = 0; i < node.Childrens.length; i++) {
          const item = node.Childrens[i];
          this.treeCheckChildren(item, checkNodeIds, check);
        }
      }
    },
    validateField(prop) {
      this.$refs.form.validateField(prop);
    },
    /** 提交表单 */
    handleSubmit() {
      var that = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          that.buildFormData();
          if (that.custom) {
            that.$emit("handleSubmit", that.form, that.custom);
          } else if (that.action) {
            var request = that.id ? that.$put : that.$post;
            request(that.action, that.form).then(function (r) {
              that.$emit("handleSubmit", that.form);
            });
          } else {
            that.$emit("handleSubmit", that.form);
          }
        } else {
          return false;
        }
      });
    },
    /** 生成表单嵌套数组数据
     * element 表单元素
     * toData 编辑数据
     */
    buildFormDataNestingArrayValue(element, toData) {
      // 属性
      let props = element.prop.split("_");
      // 源数据
      let fromData = this.form[props[0]] ?? [];
      // 转换编辑数据为源数据格式
      this.form[props[0]] = toData.map((v) => {
        let result = {};
        // 转换格式
        for (let i = 1; i < props.length; i++) {
          result[props[i]] = v;
        }

        // 比对源数据 相同使用数据 不同使用编辑数据
        let fromDataItem = fromData.filter((fv) => {
          var value;
          for (let i = 1; i < props.length; i++) {
            value = fv[props[i]];
          }
          return value == v;
        })[0];
        return fromDataItem ? fromDataItem : result;
      });
    },
    // 生成表单数据
    buildFormData() {
      // 如果有Id集合 则写入
      if (this.ids) {
        this.form["Ids"] = this.ids;
      }
      // 遍历表单元素
      for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        // 选择器
        if (element.type == "select" && element.multiple && element.nesting) {
          var toData = this.form[element.prop] ?? [];
          this.buildFormDataNestingArrayValue(element, toData);
        } else if (element.type == "tree" && element.nesting) {
          var toData =
            this.$refs["tree_" + element.prop][0].getCheckedKeys() ?? [];
          this.buildFormDataNestingArrayValue(element, toData);
        } else if (element.type == "files" && element.nesting) {
          var toData = this.form[element.prop] ?? [];
          this.buildFormDataNestingArrayValue(element, toData);
        }
      }
    },
    /** 写入表单嵌套数组数据 */
    writeFormDataNestingArrayValue(form, element, action) {
      form[element.prop] = [];
      let props = element.prop.split("_");
      let data = form[props[0]];
      // 数组 遍历插入嵌套数据
      if (data && Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          form[element.prop].push(item[props[1]]);
          if (action) {
            action(item);
          }
        }
      }
    },
    /** 写入表单数据 */
    writeFormData(form) {
      let that = this;
      // 遍历表单元素
      for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i];
        // 选择器
        if (element.type == "select" && element.multiple && element.nesting) {
          this.writeFormDataNestingArrayValue(form, element);
        }
        // 树
        else if (element.type == "tree" && element.nesting) {
          this.writeFormDataNestingArrayValue(form, element);
          // 树 组件
          let tree = this.$refs["tree_" + element.prop][0];
          // 选中
          tree.setCheckedKeys(form[element.prop]);
        } else if (element.type == "files" && element.nesting) {
          form[element.prop + "_Files"] = [];
          this.writeFormDataNestingArrayValue(form, element, function (item) {
            form[element.prop + "_Files"].push({
              prop: element.prop,
              id: item["FileStorageId"],
              name: item["FileStorageFilename"],
              url:
                item["FileStorageContentType"].indexOf("image/") == 0
                  ? that.baseURL + item["FileStoragePath"]
                  : require("@/assets/image/file.png"),
            });
          });
        }

        // 有值时
        if (form[element.prop]) {
          // 加载选择器数据
          if (element.type == "select" && element.action) {
            this.$refs["form_" + element.prop][0].handleSelectFocus();
          }
        }
      }
      this.form = form;
    },
  },
  created() {
    this.buildRules();
  },
  mounted() {
    let that = this;
    if (this.custom) {
      this.$emit("handleInitData", this.row);
    } else if (this.id) {
      this.add = false;
      this.$get(this.action + "/" + this.id).then(function (r) {
        that.writeFormData(r);
      });
    }
    setTimeout(function () {
      that.$refs.form.clearValidate();
    }, 100);
  },
};
</script>

<style lang="sass">
.form-body
  overflow: scroll
  position: absolute
  width: 100%
  padding: 0px 10px
  bottom: 100px
  top: 70px

.form-footer

  position: absolute
  bottom: 0px
  width: 100%
</style>