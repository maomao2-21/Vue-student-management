<template>
  <span>
    <!-- 按钮 -->
    <el-button
      @click="handleClick()"
      v-show="options.power"
      class="table-card-btn"
      size="mini"
      :type="options.theme"
      :icon="options.icon"
      :title="options.label"
      >{{ options.label }}</el-button
    >
    <!-- 上传文件弹框 -->
    <el-dialog
      :title="options.label"
      :visible.sync="show"
      width="30%"
      :before-close="handleBeforeClose"
    >
      <el-upload
        :action="options.action"
        :show-file-list="false"
        :auto-upload="true"
        :before-upload="beforeUpload"
        :http-request="httpRequest"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
          class="upload-btn"
        >
          点击上传
        </el-button>
        <el-button
          v-if="options.template"
          type="primary"
          size="small"
          class="upload-btn"
          @click="handleDownloadTemplate"
          >下载模板</el-button
        >

        <div slot="tip" class="el-upload__tip">
          <span v-if="options.description">{{ options.description }}</span>
          <span v-else>只能上传 .xlsx 文件，且不超过10mb</span>
        </div>
      </el-upload>
    </el-dialog>
  </span>
</template>

<script>
export default {
  props: {
    options: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    /** 打开上传文件对话框 */
    handleClick() {
      this.show = true;
    },
    /** 下载模板 */
    handleDownloadTemplate() {
      var that = this;
      this.$post(this.options.template, null).then(function (r) {
        window.location = that.baseURL + r;
      });
    },
    /** 关闭事件 */
    handleBeforeClose() {
      this.show = false;
      this.$emit("handleBeforeClose");
    },
    beforeUpload(file) {
      if (
        this.options.limitContentTypes &&
        this.options.limitContentTypes.indexOf(file.type) == -1
      ) {
        let type = "";
        for (let i = 0; i < this.options.limitContentTypes.length; i++) {
          const element = this.options.limitContentTypes[i];
          type += element + ", ";
        }
        type = type.substring(0, type.length - 2);
        this.$message.error("上传文件只能是 " + type + " 格式!");
        return false;
      } else if (
        !this.options.limitContentTypes &&
        file.type !=
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.$message.error("上传文件只能是 .xlsx 格式!");
        return false;
      }
      if (this.options.limitLength && file.size > this.options.limitLength) {
        let length = "kb";
        if (this.options.limitLength < 1024 * 1024) {
          length = this.options.limitLength / 1024 + "kb";
        } else if (this.options.limitLength < 1024 * 1024 * 1024) {
          length = this.options.limitLength / 1024 / 1024 + "mb";
        }
        this.$message.error("上传文件大小不能超过 " + length + "!");
        return false;
      } else if (!this.options.limitLength && file.size / 1024 / 1024 > 10) {
        this.$message.error("上传文件大小不能超过 10MB!");
        return false;
      }
      return true;
    },
    /** 上传文件 */
    httpRequest(info) {
      const data = new FormData();
      data.append("file", info.file);
      this.$post(info.action, data);
    },
  },
};
</script>

<style lang="sass">
.upload-btn
  margin-right: 5px
</style>