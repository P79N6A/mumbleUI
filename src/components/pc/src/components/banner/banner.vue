<template>
    <div class="ui-banner" @touchmove.stop="touchmove" @touchend.stop="touchend" @touchstart.stop="touchstart">
        <ul class="ui-banner-list" :class="{ 'ui-banner-animate': animate }" :style="getStyle()" v-displace="displaceX">
            <li class="ui-banner-list-item" v-for="item in useList" track-by="$index">
                <a v-if="item.init" :href="item.link">
                    <img :src="item.imgUrl">
                </a>
            </li>
        </ul>
        <ul class="ui-banner-dot" v-if="useList.length > 2">
            <li class="ui-banner-dot-item" v-for="a in useList.length-1" @click="go(a)" :class="{ 'current': (num==$index+1) }"></li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import displace from '../../directives/displace';
    export default {
        directives : {
            displace : displace
        },
        props: {
            animate:{     //控制样式，是否使用过渡效果
                type: [Boolean, String],
                default: true
            },
            time: {      //自动轮播的时间间隔
                type: Number,
                default: 6000
            },
            list : {    //数据
                type: Array,
                required : true
            }
        },
        data: function () {
            //基础宽度即屏幕宽度
            var baseWidth = document.body.offsetWidth;
            return {
                timerId: null,
                dataReady: false,        //数据是否加载完毕
                baseWidth: baseWidth,    //基准宽度
                num: 1,                  //当前在第几个
                movingX: 0,
                moving: false,           //是否使用touch移动banner
                touchStartX: 0,          //touch的初始x
                touchStartY: 0,          //touch的初始y
                isTransitioning: false   //是否在动画中
            }
        },
        computed: {
            //列表的宽度
            listWidth: function () {
                return this.useList.length * this.baseWidth
            },
            //x偏移
            displaceX: function () {
                return this.moving ? this.movingX : -(this.baseWidth * this.num);
            },
            useList: function(){
                var len = this.list.length;
                var arr = this.list.slice(0);
                arr.unshift(arr[len - 1]);
                arr.forEach((obj, index)=> {
                    if (obj.link == "") {
                        obj.link = "javascript:void 0"
                    }
                    if(obj.init === undefined){
                        if(index == 0 || index == 1){
                            Vue.set(obj, "init", true)
                        }else{
                            Vue.set(obj, "init", false)
                        }
                    }
                });
                this.$nextTick(function () {
                    if(this.timerId){
                        clearTimeout(this.timerId);
                        this.timerId = null;
                    }
                    if(len > 1){
                        this.timerId = this.createTimer();
                    }
                })
                return arr
            }
        },
        ready: function() {
            console.log("ready");
        },
        destroyed: function(){
            if(this.timerId){
                clearTimeout(this.timerId);
                this.timerId = null;
            }
        },
        methods: {
            getStyle:function(){
                return {
                    "width" : this.listWidth + "px",
                }
            },
            createTimer: function(){
                return setTimeout(()=> {
                    if(this.useList && this.useList.length > 0){
                        //如果当前处于最后一个，需要自动滚动到第一个，过渡效果需要特殊处理
                        if (this.num == (this.useList.length - 1)) {
                            //禁止过渡效果，把位置移动到0，然后再打开过渡效果，设置位置从0=》1
                            this.animate = false;
                            this.num = 0;
                            this.$nextTick(function () {
                                setTimeout(()=> {
                                    this.animate = true;
                                    this.num = 1;
                                    this.timerId = this.createTimer()
                                }, 100)
                            })
                        } else {
                            this.num += 1;
                            if (!this.useList[this.num].init) {
                                this.useList[this.num].init = true
                            }
                            this.timerId = this.createTimer()
                        }
                    }else{
                        this.timerId = this.createTimer()
                    }
                }, this.time);
            },
            touchstart: function(e){
                console.log("touchstart")
            },
            touchmove: function(e){
                if(this.useList.length < 3){
                    return
                }

                //如果没有touch
                if (!e.touches.length) return;

                var touch = e.touches[0];
                if (this.touchStartX == 0) {
                    this.touchStartX = touch.pageX;
                    this.touchStartY = touch.pageY;
                    clearTimeout(this.timerId);
                    this.timerId = null;
                    return;
                } else {
                    this.x = touch.pageX - this.touchStartX;
                    this.y = touch.pageY - this.touchStartY;
                }

                //这里是为了手指一定是横向滚动的,原理是计算X位置的偏移要比Y的偏移大
                if (Math.abs(this.x) > Math.abs(this.y)) {
                    if(!(this.num == 1 && this.x > 0) && !(this.num + 1 > this.useList.length - 1 && this.x < 0)){
                        this.animate = false;
                        this.moving = true;
                        this.movingX = -(this.baseWidth * this.num) + this.x;
                    }
                }
            },
            touchend: function(e){
                if(this.useList.length < 3){
                    return
                }
                console.log("touchend")
                this.animate = true;
                this.moving = false;
                //这里是为了手指一定是横向滚动的,原理是计算X位置的偏移要比Y的偏移大
                if (Math.abs(this.x) > this.baseWidth/3) {
                    //向右滑动
                    if (this.x > 0) {
                        if (this.num > 0) { //正处于第一个，所以不能向右滑动了
                            this.num -= 1;
                        }
                    }
                    //向左滑动
                    else if (this.x < 0) {
                        if (this.num + 1 < this.useList.length) {
                            this.num += 1;
                            if (!this.useList[this.num].init) {
                                this.useList[this.num].init = true
                            }
                        }
                    }
                }
                this.timerId = this.createTimer();
                this.touchStartX = 0;
                this.touchStartY = 0;
                this.x = 0;
                this.y = 0;
            },
            go: function (num) {
                clearTimeout(this.timerId);
                this.timerId = null;
                this.num  = num + 1;
                if (!this.useList[this.num].init) {
                    this.useList[this.num].init = true
                }
                this.timerId = this.createTimer();
            }
        }
    }
</script>
