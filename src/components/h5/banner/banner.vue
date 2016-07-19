<template>
    <div class="ui-banner" @touchmove.stop="touchmove" @touchend.stop="touchend" @touchstart.stop="touchstart"
         @transitionend="animateend"
         @webkitTransitionEnd="animateend"
         @oTransitionEnd="animateend"
         @otransitionend="animateend">
        <ul class="ui-banner-list" :class="{ 'animate': animate }" :style="getStyle()">
            <li class="item" v-for="item in list" track-by="$index">
                <a v-if="item.init" :href="item.link">
                    <img :src="item.imgUrl">
                </a>
            </li>
        </ul>
        <ul class="ui-banner-dot" v-if="list.length > 1">
            <li class="item" v-for="a in list.length-1" :class="{ 'cur': (num==$index+1) }"></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
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
        data () {
            console.log("data");
            //基础宽度即屏幕宽度
            var baseWidth = document.body.offsetWidth;
            return {
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
                return this.list.length * this.baseWidth
            },
            //x偏移
            displaceX: function () {
                return -(this.baseWidth * this.num);
            }
        },
        watch: {
            //数据很有可能是异步拿到的，所以需要监听list.length, 然后做初始化处理
            "list.length" : function(){
                if(this.dataReady){
                    return;
                }
                if(this.list && this.list.length > 0){
                    this.dataReady = true;
                    //把最后一条数据复制到插入到最前面，然后默认从新的list的第二条显示
                    this.list.unshift(this.list[this.list.length - 1]);
                    //处理空的href
                    //第一条和第二条数据默认显示,根据init标志异步加载图片
                    this.list.forEach((obj, index)=> {
                        if (obj.link == "") {
                            obj.link = "javascript:void 0"
                        }
                        if(index == 0 || index == 1){
                            obj.init = true;
                        }else{
                            obj.init = false;
                        }
                        this.list.$set(index, Object.assign(obj, {
                            init : true
                        }));            
                    });
                }
            }
        },
        created(){
            console.log("created");
        },
        beforeCompile(){
            console.log("beforeCompile");
        },
        compiled(){
            console.log("compiled");
        },
        ready () {
            console.log("ready")
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            this.ulDom = this.$el.querySelector(".ui-banner-list");
            //创建自动滚动
            this.timerId = this.createTimer();
        },
        destroyed(){
            if(this.timerId){
                clearTimeout(this.timerId);
            }
        },
        methods: {
            getStyle(){
                var x = this.displaceX
                return {
                    "opacity" : 1,
                    "width" : this.listWidth + "px",
                    "-ms-transform" : "translate3d("+ x + "px, 0, 0)",
                    "-moz-transform" : "translate3d("+ x + "px, 0, 0)",
                    "-o-transform" : "translate3d("+ x + "px, 0, 0)",
                    "-webkit-transform" : "translate3d("+ x + "px, 0, 0)",
                    "transform" : "translate3d("+ x + "px, 0, 0)",
                }
            },
            createTimer(){
                return setTimeout(()=> {
                    if(this.list && this.list.length > 0){
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
                            if (!this.list[this.num].init) {
                                //改变列表中的值，又想刷新dom就要用$set
                                this.list.$set(this.num, Object.assign(this.list[this.num], {
                                    init : true
                                }));
                            }
                            this.createTimer()
                        }
                    }else{
                        this.createTimer()
                    }
                }, this.time);
            },
            // clearTouch(){
            //     this.touchStartX = 0;
            //     this.touchStartY = 0;
            //     this.ending = true;
            //     setTimeout(()=> {
            //         this.ending = false;
            //     }, 300);
            // },
            touchstart(e){
                clearTimeout(this.timerId);
                this.animate = false;
            },
            touchmove(e){
                //如果没有touch
                if (!e.touches.length) return;
                //如果正在滚动，return
                if (this.isTransitioning) return;

                var touch = e.touches[0];
                if (this.touchStartX == 0) {
                    this.touchStartX = touch.pageX;
                    this.touchStartY = touch.pageY;
                    return;
                } else {
                    this.x = touch.pageX - this.touchStartX;
                    this.y = touch.pageY - this.touchStartY;
                }

                //这里是为了手指一定是横向滚动的,原理是计算X位置的偏移要比Y的偏移大
                if (Math.abs(this.x) > Math.abs(this.y)) {
                    if(!(this.num == 1 && this.x > 0) && !(this.num + 1 > this.list.length - 1 && this.x < 0)){
                        var movingX = -(this.baseWidth * this.num) + this.x;
                        window.requestAnimationFrame(()=>{
                            this.ulDom.style.transform = "translate3d("+ movingX + "px, 0, 0)";
                            this.ulDom.style["-ms-transform"] = "translate3d("+ movingX + "px, 0, 0)"
                            this.ulDom.style["-moz-transform"] = "translate3d("+ movingX + "px, 0, 0)"
                            this.ulDom.style["-o-transform"] = "translate3d("+ movingX + "px, 0, 0)"
                            this.ulDom.style["-webkit-transform"] = "translate3d("+ movingX + "px, 0, 0)"
                        })
                        
                    }
                }
            },
            touchend(e){
                this.animate = true;
                //这里是为了手指一定是横向滚动的,原理是计算X位置的偏移要比Y的偏移大
                if (Math.abs(this.x) > Math.abs(this.y) && Math.abs(this.x) > this.baseWidth/2.4) {
                    //向右滑动
                    if (this.x > 0) {
                        if (this.num - 1 == 0) { //正处于第一个，所以不能向右滑动了
                            this.timerId = this.createTimer();
                        } else {
                            this.isTransitioning = true;
                            this.num -= 1;
                        }
                    }
                    //向左滑动
                    else if (this.x < 0) {
                        if (this.num + 1 > this.list.length - 1) {
                            this.timerId = this.createTimer();
                        } else {
                            this.isTransitioning = true;
                            this.num += 1;
                            if (!this.list[this.num].show) {
                                this.list.$set(this.num, Object.assign(this.list[this.num], {
                                    init : true
                                }));
                            }
                        }
                    }
                }else{
                    window.requestAnimationFrame(()=>{
                        this.ulDom.style.transform = "translate3d("+ this.displaceX + "px, 0, 0)";
                        this.ulDom.style["-ms-transform"] = "translate3d("+ this.displaceX + "px, 0, 0)"
                        this.ulDom.style["-moz-transform"] = "translate3d("+ this.displaceX + "px, 0, 0)"
                        this.ulDom.style["-o-transform"] = "translate3d("+ this.displaceX + "px, 0, 0)"
                        this.ulDom.style["-webkit-transform"] = "translate3d("+ this.displaceX + "px, 0, 0)"
                    })
                    this.timerId = this.createTimer();
                }
                this.moving = false;
                this.touchStartX = 0;
                this.touchStartY = 0;
            },
            animateend(e){
                this.isTransitioning = false;
            }
        }
    }
</script>
<style src="./banner.scss" lang="scss" scoped></style>
