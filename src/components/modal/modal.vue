<template>
    <div v-show="isShow" :class="{scroll: isScroll }" class="ui-modal" @scroll="scroll">
        <div ref="dialog" class="ui-modal-dialog">
            <div class="ui-modal-title">
                <span class="ui-modal-title-main">{{ title }}</span>
                <span class="ui-modal-title-sub">{{ subTitle }}</span>
                <i class="ui-icon ui-icon-close" @click="close" />
            </div>
            <div :style="getStyle" class="ui-modal-body">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import * as util from '../../utils/util.js';
import elementResizeEvent from '../../utils/elementResizeEvent';
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            default: undefined
        },
        width: {
            type: [Number, String],
            default: 400
        },
        closeOnClickShadow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShow: false,
            isScroll: false
        }
    },
    computed: {
        getStyle() {
            if (this.width) {
                return {
                    width: this.width + 'px'
                }
            }
        }
    },
    watch: {
        'isShow'() {
            var body = document.body;
            if (this.isShow) {
                // 必须这样，要不然，这个点击事件会触发
                if (this.closeOnClickShadow) {
                    setTimeout(() => {
                        this.$el.addEventListener('click', this.clickFn, false)
                    }, 0);
                }
                util.addClass(body, 'ui-modal-open');

                // 当modal中的内容超出整个屏幕时，modal-dialog用absolute定位不能撑开滚动，导致看不全，需要特殊处理
                this.$nextTick(this.computeScroll)

            } else {
                util.removeClass(body, 'ui-modal-open');
                if (this.closeOnClickShadow) {
                    this.$el.removeEventListener('click', this.clickFn)
                }
            }
        }
    },
    mounted: function () {
        // 监听esc
        document.addEventListener('keydown', this.esc, false);
        elementResizeEvent(this.$refs.dialog, this.computeScroll);
    },
    beforeDestroy: function () {
        document.removeEventListener('keydown', this.esc);
        elementResizeEvent.unbind(this.$refs.dialog);
    },
    methods: {
        computeScroll() {
            var bodyHeight = window.innerHeight;
            var dialogElemStyle = window.getComputedStyle(this.$refs.dialog, null);
            var height = /^([0-9]*)/.exec(dialogElemStyle.height)[0];
            if (height > bodyHeight - 50) {
                this.isScroll = true;
            } else {
                this.isScroll = false;
            }
        },
        esc(event) {
            var which = event.which || event.keyCode;
            if (this.isShow && which == 27) {
                this.close();
            }
        },
        clickFn(event) {
            if (!util.contains(this.$el, event.target) && this.isShow) {
                this.close();
            }
        },
        close() {
            this.isShow = false;
            this.$emit('on-close');
        },
        hide() {
            this.close();
        },
        scroll(event) {
            this.$emit('on-scroll', event);
        },
        show() {
            this.isShow = true;
        }
    }
}
</script>
