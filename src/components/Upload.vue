<!--上传图片-->
<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          // 上传图片
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false
        };
      },
      mounted () {

      },
      methods: {
        // 删除上传的图片
        handleRemove(file) {
          //console.log(file);
        },
        // 预览图片
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        // 下载上传的图片
        handleDownload(file) {
          //console.log(file);
        }
      }
    };
</script>

<style>

</style>
