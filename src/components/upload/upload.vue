<template>
    <div class="ui-upload" @click="click">
        <slot>
            <Wb-button type="ghost" icon="cloud-upload-o">{{ t('el.upload.placeholder') }}</Wb-button>
        </slot>
        <input ref="input" :multiple="multiple" :class="{'ie-hack': isIE(9)}" type="file" accept="*" class="ui-upload-file" @change="change">
    </div>
</template>
<script>
import toast from '../toast';
import ieMixin from './iePolyfill';
import locale from '../../i18n/mixin.js';
export default {
    name: 'Upload',
    mixins: [ieMixin, locale],
    props: {
        url: {
            type: String,
            default: undefined
        },
        action: {
            type: Function,
            default: undefined
        },
        param: {
            type: String,
            default: 'upFiles'
        },
        accept: {
            type: [String, Array],
            default: undefined
        },
        multiple: {
            type: Boolean,
            default: false
        },
        imageSize: {
            type: Object,
            default: undefined
        },
        maxSize: {
            type: Number,
            default: undefined
        }
    },
    methods: {
        click() {
            if (this.isIE(9)) return;
            this.$refs.input.click();
        },
        validate(file) {
            return new Promise((resolve, reject) => {
                if (this.accept) {
                    var filenames = file.name.split('.');
                    var lastName = filenames[filenames.length - 1];
                    if (Array.isArray(this.accept)) {
                        if (this.accept.indexOf(lastName) == -1) {
                            toast.error(this.t('el.upload.suffixTip', {
                                filename: file.name,
                                suffix: JSON.stringify(this.accept)
                            }));
                            reject();
                        }
                    } else {
                        if (lastName != this.accept) {
                            toast.error(this.t('el.upload.suffixTip', {
                                filename: file.name,
                                suffix: JSON.stringify(this.accept)
                            }));
                            reject();
                        }
                    }
                }
                if (this.maxSize && file.size > this.maxSize) {
                    toast.error(this.t('el.upload.sizeTip', {
                        filename: file.name,
                        size: this.maxSize / 1024 / 1024
                    }));
                    reject();
                }
                if (file.type.indexOf('image') != -1 && this.imageSize) {
                    var img = document.createElement('img');
                    img.src = window.URL.createObjectURL(file);
                    img.onload = () => {
                        if (this.imageSize.height) {
                            if (this.imageSize.height != img.height) {
                                toast.error(this.t('el.upload.heightTip', {
                                    filename: file.name,
                                    height: this.imageSize.height
                                }));
                                reject();
                            }
                        }
                        if (this.imageSize.width) {
                            if (this.imageSize.width != img.width) {
                                toast.error(this.t('el.upload.widthTip', {
                                    filename: file.name,
                                    width: this.imageSize.width
                                }));
                                reject();
                            }
                        }
                        window.URL.revokeObjectURL(img.src);
                        resolve(file);
                    }
                } else {
                    resolve(file)
                }
            })
        },
        change: function (e) {
            this.$emit('on-change', e);
            if (this.isIE(9)) return this.iePost(e);
            var files = e.target.files;
            var len = files.length;
            var validateArray = [];
            for (var i = 0; i < len; i++) {
                let file = e.target.files[i];
                validateArray.push(this.validate(file))
            }
            Promise.all(validateArray).then(values => {
                var fileForm = new FormData();
                values.forEach((file) => {
                    fileForm.append(this.param, file);
                });
                if (this.action) {
                    this.action(true, fileForm);
                    this.$refs.input.value = '';
                } else {
                    if (!this.url) {
                        return console.error('没有配置URL参数');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                                try {
                                    var result = JSON.parse(xhr.responseText);
                                    this.$emit('on-success', files, result);
                                } catch (e1) {
                                    console.error('响应格式不正确');
                                }
                            } else {
                                this.$emit('on-fail', files, xhr.status);
                            }
                            this.$refs.input.value = '';
                        }
                    };
                    xhr.open('POST', this.url);
                    xhr.send(fileForm);
                }
            }, () => {
                // 校验失败
                this.$refs.input.value = '';
                if (this.action) {
                    this.action(false)
                } else {
                    this.$emit('on-fail', files, -1);
                }
            });
        }
    }
}
</script>
<style>
.ui-upload {
    position: relative;
}

.ui-upload .ie-hack {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    z-index: 1000;
}
</style>