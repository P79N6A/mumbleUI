<template>
    <div class="ui-zoom">
        <div v-show="init" class="ui-zoom-image">
            <div :title="t('el.zoom.close')" class="ui-zoom-close" @click="close">
                <i class="ui-icon ui-icon-close-circle" />
            </div>
            <img :src="src" @load="load">
        </div>
    </div>
</template>
<script>
import emitter from '../../mixins/emitter';
import locale from '../../i18n/mixin.js';
export default {
    name: 'Zoom',
    mixins: [emitter, locale],
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
    data() {
        return {
            init: false
        }
    },
    mounted() {
        // 监听esc
        document.addEventListener('keydown', this.esc, false);
    },
    destroyed() {
        document.removeEventListener('keydown', this.esc)
    },
    methods: {
        esc: function (event) {
            var which = event.which || event.keyCode;
            if (which == 27) {
                this.close();
            }
        },
        close: function () {
            this.dispatch('ZoomContainer', 'on-close');
        },
        load: function (e) {
            var style = {};
            var imgEle = e.target || e.srcElement;
            var img = new Image();
            img.src = imgEle.src;
            var tempImg = {};
            tempImg.width = img.width;
            tempImg.height = img.height;
            var swapEle = this.$el.querySelector('.ui-zoom-image');
            style.imgWidth = tempImg.width;
            style.imgHeight = tempImg.height;
            style.bodyWidth = window.innerWidth;
            style.bodyHeight = window.innerHeight;
            // 最小宽度是140
            if (style.imgWidth <= this.minWidth) {
                style.imgHeight = tempImg.height * this.minWidth / style.imgWidth;
                style.imgWidth = this.minWidth;
            } else if (style.imgWidth >= this.maxWidth) {
                style.imgHeight = tempImg.height * this.maxWidth / style.imgWidth;
                style.imgWidth = this.maxWidth
            }
            imgEle.style.width = style.imgWidth + 'px';
            imgEle.style.height = style.imgHeight + 'px';

            var left = (style.bodyWidth - style.imgWidth) / 2 + 'px';
            var top = (style.bodyHeight - style.imgHeight) / 2;
            top = ( top > 0 ? top : 0 ) + 'px';
            swapEle.style.left = left;
            swapEle.style.top = top;
            if (style.bodyHeight < style.imgHeight) {
                swapEle.style.margin = '100px 0'
            }
            this.init = true;
        }
    }
}
</script>
