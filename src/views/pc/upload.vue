<template>
    <div class="upload-panel">
        <button v-upload :upload-option="option">点击上传</button>
        <h3>上传的文件：</h3>
        <ul>
            <li v-for="file in files">{{file.name}}</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                files: null,
                option: {
                    multiple: true,
                    api : "/upload"
                }
            }
        },
        ready: function () {
          this.$on("upload.success", function (data) {
              this.files = data;
          })
        },
        methods: {
        }
    }
</script>
