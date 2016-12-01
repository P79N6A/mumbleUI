<template>
    <div class="zoom" v-show="init">
        <div class="zoom-image">
            <i class="zoom-close" @click="close">+</i>
            <img :src="src" @load="load"/>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            minWidth: {
                type: Number,
                default: 140
            },
            maxWidth: {
                type: Number,
                default: window.innerWidth * 0.8
            }
        },
        data: function () {
            return {
                init: false
            }
        },
        ready: function () {
        },
        methods: {
            close: function () {
                this.$dispatch("zoom.close");
            },
            load: function (e) {
                var style = {};
                var imgEle = e.target;
                var swapEle = this.$el.querySelector(".zoom-image");
                style.imgWidth = imgEle.width;
                style.imgHeight = imgEle.height;
                style.bodyWidth = window.innerWidth;
                style.bodyHeight = window.innerHeight;
                //最小宽度是140
                if (style.imgWidth <= this.minWidth) {
                    style.imgHeight = imgEle.height * this.minWidth / style.imgWidth;
                    style.imgWidth = this.minWidth;
                }
                else if (style.imgWidth >= this.maxWidth) {
                    style.imgHeight = imgEle.height * this.maxWidth / style.imgWidth;
                    style.imgWidth = this.maxWidth
                }
                imgEle.style.width = style.imgWidth + "px";
                imgEle.style.height = style.imgHeight + "px";

                var left = (style.bodyWidth - style.imgWidth) / 2 + "px";
                var top = (style.bodyHeight - style.imgHeight) / 2;
                top = ( top > 0 ? top : 0 ) + "px";
                swapEle.style.left = left;
                swapEle.style.top = top;
                if (style.bodyHeight < style.imgHeight) {
                    swapEle.style.margin = "100px 0"
                }
                this.init = true;
            }
        }
    }
</script>
