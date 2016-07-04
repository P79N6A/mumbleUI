<template>
    <div class="tab-btn-group" role="group">
        <button type="button" v-bind:class="{choose:$index==(showItem-1)}" v-for="item in items" @click="click($index)">{{item.text}}</button>
    </div>
    <div class="tab" v-touch:swipeleft="swipeleft" v-touch:swiperight="swiperight">
        <div v-for="item in items" v-show="showItem-1==$index" class="item">
            <slot v-bind:name="item.name"></slot>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            items : {
                type : Array  //数据格式规范必须是 [{name : "holding",text : "持有中"}]
            },
            choose : {
                type : String
            }
        },
        data () {
            return {
                showItem : 1
            }
        },
        ready(){
            this.choose = this.items[0].name;
        },
        methods: {
            click(index){
                this.showItem = index + 1;
                this.choose = this.items[this.showItem-1].name;
            },
            swipeleft(){
                if(this.showItem < this.items.length){
                    this.showItem += 1;
                    this.choose = this.items[this.showItem-1].name;
                }
            },
            swiperight(){
                if(this.showItem > 1){
                    this.showItem -= 1;
                    this.choose = this.items[this.showItem-1].name;
                }
            }
        }
    }
</script>
<style src="./tab.scss" lang="scss" scoped></style>
