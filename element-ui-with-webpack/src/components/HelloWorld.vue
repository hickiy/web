<template>
  <div class="hello">
    <el-upload action="/" list-type="picture-card" :http-request="httpRequest">
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  provide() {
    return {
      hellow: this,
    };
  },
  created() {
    // console.log(this);
  },
  methods: {
    httpRequest(file) {
      return file;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test-layout-element {
  height: 200px;
  background: pink;
}
</style>
