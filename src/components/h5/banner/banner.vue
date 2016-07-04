<template>
    <div class="ui-banner" @touchmove.stop="touchmove"
         @transitionend="isTransitioning=false;"
         @webkitTransitionEnd="isTransitioning=false;"
         @oTransitionEnd="isTransitioning=false;"
         @otransitionend="isTransitioning=false;">
        <ul class="ui-banner-list" v-bind:class="{ 'animate': animate }"
            style="width:{{listWidth}}px;
                    -webkit-transform: translate3d({{displaceX}}px, 0, 0);
                    transform: translate3d({{displaceX}}px, 0, 0);">
            <li class="item" v-for="item in list" track-by="$index">
                <a v-show="item.show" href="{{item.href}}">
                    <img v-bind:src="item.url">
                </a>
            </li>
        </ul>
        <ul class="ui-banner-dot" v-if="list.length > 1">
            <li class="item" v-for="a in list.length-1" v-bind:class="{ 'cur': (num==$index+1) }"></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        created(){
            var _this = this;
            //创建一个延时的自动滚动
            this.createTimer = function () {
                return setTimeout(()=> {
                    this.isTransitioning = true;
                    //如果当前处于最后一个，需要自动滚动到第一个，过渡效果需要特殊处理
                    if (this.num == (this.list.length - 1)) {
                        //禁止过渡效果，把位置移动到0，然后再打开过渡效果，设置位置从0=》1
                        this.animate = false;
                        this.num = 0;
                        var _this = this;
                        Vue.nextTick(function () {
                            setTimeout(()=> {
                                _this.animate = true;
                                _this.num = 1;
                                _this.createTimer()
                            }, 100)
                        })
                    } else {
                        this.num += 1;
                        if (!this.list[this.num].show) {
                            //改变列表中的值，又想刷新dom就要用$set
                            this.list.$set(this.num, {
                                url: this.list[this.num].url,
                                href: this.list[this.num].href,
                                show: true
                            });
                        }
                        this.createTimer()
                    }
                }, this.time);
            };
            this.clearTouch = function () {
                this.touchStartX = 0;
                this.touchStartY = 0;
                this.moving = true;
                setTimeout(()=> {
                    this.moving = false;
                }, 300);
            };
            this.promise.then(function (data) {
                data.forEach(function (o, index) {
                    _this.list.push(o)
                });
                //第一条数据默认显示,根据show标志异步加载图片
                _this.list[0].show = true;
                //把最后一条数据复制到插入到最前面，然后默认从新的list的第二条显示
                _this.list.unshift(_this.list[_this.list.length - 1]);
                _this.list.forEach(function (obj) {
                    if (obj.href == "") {
                        obj.href = "javascript:void 0"
                    }
                });
                _this.list[0].show = true;
            })
        },
        props: {
            time: {
                type: Number,
                default: 6000
            },
            promise: {
                type: Object
            }
        },
        data () {
            //基础宽度即屏幕宽度
            var baseWidth = document.body.offsetWidth;
            return {
                animate: true,         //控制样式，是否使用过渡效果
                baseWidth: baseWidth,   //基准宽度
                num: 1,                 //当前在第几个
                list: [],
                moving: false,         //是否使用touch移动banner
                touchStartX: 0,         //touch的初始x
                touchStartY: 0,         //touch的初始y
                isTransitioning: false  //是否在动画中
            }
        },
        computed: {
            //列表的宽度
            listWidth: function () {
                return this.list.length * this.baseWidth
            },
            //x偏移
            displaceX: function () {
                return -(this.baseWidth * this.num);
            }
        },
        ready () {
            //创建自动滚动
            this.timerId = this.createTimer();
        },
        methods: {
            touchmove(e){
                //如果没有touch
                if (!e.touches.length) return;
                //如果正在滚动，return
                if (this.isTransitioning) return;
                if (this.moving) return;

                var touch = e.touches[0];
                if (this.touchStartX == 0) {
                    this.touchStartX = touch.pageX;
                    this.touchStartY = touch.pageY;
                    return;
                } else {
                    var x = touch.pageX - this.touchStartX;
                    var y = touch.pageY - this.touchStartY;
                }
                //这里是为了手指一定是横向滚动的,原理是计算X位置的偏移要比Y的偏移大
                if (Math.abs(x) > Math.abs(y)) {
                    clearTimeout(this.timerId);
                    //向右滑动
                    if (x > 40) {
                        if (this.num - 1 == 0) { //正处于第一个，所以不能向右滑动了
                            this.timerId = this.createTimer();
                        } else {
                            this.isTransitioning = true;
                            this.num -= 1;
                        }
                        this.clearTouch();
                    }
                    //向左滑动
                    else if (x < -40) {
                        if (this.num + 1 > this.list.length - 1) {
                            this.timerId = this.createTimer();
                        } else {
                            this.isTransitioning = true;
                            this.num += 1;
                            if (!this.list[this.num].show) {
                                this.list.$set(this.num, {
                                    url: this.list[this.num].url,
                                    href: this.list[this.num].href,
                                    show: true
                                });
                            }
                        }
                        this.clearTouch();
                    }
                }
            }
        }
    }
</script>
<style src="./banner.scss" lang="scss" scoped></style>
