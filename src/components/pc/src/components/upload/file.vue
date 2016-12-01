<template>
    <input type="file" :accept="accept" :multiple="multiple" class="upload-file" @change="change"/>
</template>
<script type="text/ecmascript-6">
    import toast from "../toast";
    export default {
        props: {
            api: {
                require: true,
                type: String
            },
            accept: {
                type: String,
                default: "*"
            },
            multiple: {
                type: Boolean,
                default: false
            },
            maxSize: {
                type: Number,
                default: 2097152
            }
        },
        data: function () {
            return {}
        },
        ready: function () {
        },
        methods: {
            change: function (e) {
                var _this = this;
                var files = e.target.files;
                var len = files.length;
                var oMyForm = new FormData();
                for (var i = 0; i < len; i++) {
                    var file = e.target.files[i];
                    oMyForm.append("upfiles", file);
                    if (file.size > this.maxSize) {
                        toast.error("大小不能超过" + option.maxSize / 1024 / 1024 + "MB");
                        return;
                    }
                }
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            try {
                                var result = JSON.parse(xhr.responseText);
                                if(result.code == "0"){
                                    _this.$dispatch("upload.success", files)
                                }
                            }catch (e){
                                toast.error("响应格式不正确");
                            }

                        } else {
                            _this.$dispatch("upload.fail", files)
                        }
                    }
                };
                xhr.open("POST", this.api);
                xhr.send(oMyForm);
            }
        }
    }
</script>
