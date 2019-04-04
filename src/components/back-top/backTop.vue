<template>
    <div v-show="visible" class="ui-back-top-outer" @click="scrollToTop">
        <slot>
            <div class="ui-back-top-inner">
                <Icon class="icon-cls" type="to-top" size="25" />
            </div>
        </slot>
    </div>
</template>

<script>
import { getScroll } from '../../utils/util';
import EventListener from '../../utils/EventListener.js'
function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    let tt = t / (d / 2);
    let result = 0;
    if (tt < 1) {
        result = cc / 2 * tt * tt * tt + b;
    } else {
        result = cc / 2 * ((tt -= 2) * tt * tt + 2) + b;
    }
    return result;
}
function getRequestAnimationFrame() {
    let func = new Function();
    if (typeof window !== 'undefined') {
        func = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }
    return func;
}
export default {
    name: 'BackTop',
    props: {
        HeightToShow: {
            type: Number,
            default: 400
        },
        target: {
            type: Function,
            default: function () {
                return document.body
            }
        }
    },
    data() {
        return {
            visible: false,
            container: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = this.target();
            if (this.container === document.body) {
                this._scrollEvent = EventListener.listen(window, 'scroll', this.handleScroll)
            } else {
                this._scrollEvent = EventListener.listen(this.container, 'scroll', this.handleScroll)
            }
        })
    },
    beforeDestroy() {
        this._scrollEvent.remove();
    },
    methods: {
        setScrollTop(value) {
            this.container.scrollTop = value;
        },
        scrollToTop() {
            const currentScrollTop = this.container.scrollTop;
            const reqAnimationFrame = getRequestAnimationFrame();
            const beginTime = Date.now();

            const animationFrameFunc = () => {
                const currentTime = Date.now();
                const time = currentTime - beginTime;
                this.setScrollTop(easeInOutCubic(time, currentScrollTop, 0, 400));
                if (time < 400) reqAnimationFrame(animationFrameFunc);
            };
            reqAnimationFrame(animationFrameFunc);
        },
        handleScroll() {
            const scrollTop = getScroll(this.container, true);
            this.visible = scrollTop > this.HeightToShow;
        }
    }
}
</script>
