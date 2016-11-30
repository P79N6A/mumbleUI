<template>
    <button v-upload :upload-option="option">点击上传</button>

    <div>
        <span>上传的文件：</span>
        <ul>
            <li v-for="file in files">{{file.name}}</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import upload from "../../components/pc/src/components/upload/upload.js";
    export default{
        directives: {
            upload
        },
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
