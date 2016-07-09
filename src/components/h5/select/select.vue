<template>
    <div class="ui-select-table" @touchstart.stop.prevent="">
        <div class="ui-flex center title">
            <div class="cell tal pl" v-touch:tap="cancel">取消</div>
            <div class="cell tar pr" v-touch:tap="sure">完成</div>
        </div>
        <div class="content">
            <ul @touchstart="touchstart"
                @touchmove="touchmove"
                @touchend="touchend"
                v-bind:style="styleObject">
                <li></li>
                <li></li>
                <li v-for="item in items" v-bind:class="{current : $index==chooseItem}" data-code="{{item.key}}">{{item.value}}</li>
                <li></li>
                <li></li>
            </ul>
            <div class="cui-mask-gray"></div>
            <div class="cui-lines">&nbsp;</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    let touchStartX = 0;
    let touchStartY = 0;
    let incrementX = 0;
    let incrementY = 0;
    export default {
        props: {
            items: {
                type: Array  // [{key:, value:}]
            },
            key : {
                type : String
            }

        },
        data () {
            var _this = this;
            let defaultChoose = 0;
            this.items.forEach(function (o, index) {
                if(o.key == _this.key){
                    defaultChoose = index;
                }
            });
            return {
                maxY: 0,
                minY: 0,
                y : 0,
                lastY: 0,
                lastChooseItem : defaultChoose,
                chooseItem: defaultChoose
            }
        },
        ready(){
            if(!this.items.length) {
                return false;
            }
            let height = document.getElementsByClassName("content")[0].offsetHeight;
            this.baseHeight = document.getElementsByClassName("content")[0].firstElementChild.firstElementChild.offsetHeight;
            this.rate = this.baseHeight * this.items.length / height;
            this.minY = height - this.baseHeight * (this.items.length + 4);
            this.y = -this.baseHeight*this.chooseItem;
            this.lastY = -this.baseHeight*this.chooseItem;
        },
        computed: {
            styleObject: function () {
                var _this = this;
                return {
                    "-webkit-transform": "translate3d(0,"+_this.y+"px, 0)",
                    "transform" : "translate3d(0, "+_this.y+"px, 0)"
                }
            }
        },
        methods: {
            cancel(e){
                this.$dispatch('select.cancel');
            },
            sure(e){
                this.$dispatch('select.choose', this.items[this.chooseItem]);
            },
            touchstart(e){
                if (!e.touches.length) return;
                var touch = e.touches[0];
                touchStartX = touch.pageX;
                touchStartY = touch.pageY;
            },
            touchend(e){
                //初始化touch的参数
                touchStartX = 0;
                touchStartY = 0;
                incrementX = 0;
                incrementY = 0;
                //如果移动到某项的上下一半高度内，停止移动后自动选择此项
                this.y =  Math.round(this.y/this.baseHeight)*this.baseHeight;
                //记录上一次的位置
                this.lastY = this.y;
                //更新上一次选中的位置
                this.lastChooseItem = - Math.round(this.y/this.baseHeight);
            },
            touchmove(e){
                var _this = this;
                if (!e.touches.length) return;
                var touch = e.touches[0];
                incrementX = touch.pageX - touchStartX;
                incrementY = touch.pageY - touchStartY;
                //这里是为了手指一定是垂直滚动的,原理是计算Y位置的偏移要比X的偏移大
                if (Math.abs(incrementY) > Math.abs(incrementX)) {
                    //移位大于10才算动了
                    if(Math.abs(incrementY) > 10){
                        let _y = this.lastY + incrementY;
                        if(_y >= this.minY && _y <= this.maxY){
                            //计算当前选中的那一项
                            _this.chooseItem = _this.lastChooseItem - Math.round(incrementY/_this.baseHeight);
                            //设置当前偏移高度
                            this.y = _y;
                        }
                    }
                }
            }
        }
    }
</script>
<style src="./select.scss" lang="scss" scoped></style>
