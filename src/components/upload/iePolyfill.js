import toast from '../toast';
export default {
    mounted() {
        this.computedIEStyle();
    },
    methods: {
        computedIEStyle() {
            let ele = this.$slots.default && this.$slots.default[0] && this.$slots.default[0].elm;
            if (ele && this.isIE(9)) {
                this.$nextTick(() => {
                    this.$refs.input.style.width = `${ele.clientWidth}px`;
                    this.$refs.input.style.height = `${ele.clientHeight}px`;
                })
            }
        },
        isIE(ver) {
            var b = document.createElement('b')
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
            return b.getElementsByTagName('i').length === 1
        },
        iePost() {
            var form = document.createElement('form');
            var iframe = document.createElement('iframe');
            var input = this.$refs.input;

            var filenames = input.value.split('.');
            var lastName = filenames[filenames.length - 1];
            if (Array.isArray(this.accept)) {
                if (this.accept.indexOf(lastName) == -1) {
                    toast.error('文件[' + input.value + ']格式不正确，只能上传后缀为' + JSON.stringify(this.accept) + '的文件');
                    this.$refs.input.value = '';
                    this.$emit('on-fail', this.$refs.input);
                    return;
                }
            }

            input.name = this.param;
            form.style.display = 'none';
            iframe.name = 'vueUploadFile' + Date.now();

            form.action = this.url;
            form.method = 'post'
            form.target = iframe.name;
            form.enctype = 'multipart/form-data';
            form.encoding = 'multipart/form-data';

            this.$refs.input.parentNode.insertBefore(
                form,
                this.$refs.input
            );
            form.appendChild(input);
            form.appendChild(iframe);

            iframe.addEventListener('load', () => {
                try {
                    let iframeNodes = iframe.contentDocument.all;
                    let rstMap = {};
                    let rst = {
                        result: {}
                    };
                    for (var i = 0; i < iframeNodes.length; i++) {
                        rstMap[iframeNodes[i].nodeName.toLowerCase()] = iframeNodes[i];
                    }
                    if (rstMap.result) {
                        Object.keys(rstMap).forEach((key) => {
                            rst.result[key] = rstMap[key].textContent
                        })
                        this.$emit('on-success', this.$refs.input, rst);
                    } else if (rstMap.title) {
                        toast.error(rstMap.title.textContent);
                        this.$emit('on-fail', this.$refs.input, rst);
                    } else {
                        toast.error('IE获取url失败，请重新登录重新或改用chrome浏览器');
                        this.$emit('on-fail', this.$refs.input, rst);
                    }
                } catch (e) {
                    this.$emit('on-fail', this.$refs.input);
                    toast.error('IE上传失败，请改用其他浏览器');
                    throw e;
                }
                this.$refs.input.parentNode.parentNode.appendChild(input);
                this.$refs.input.parentNode.removeChild(form);

                input = null;
                form = null;
                iframe = null;
                this.$refs.input.value = '';
            });
            form.submit();
        }
    }
}