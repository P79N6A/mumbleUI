<template>
    <div class="keybord">
        <div @click="down" class="down"></div>
        <ul>
            <li @click="choose">{{arr[0]}}</li>
            <li @click="choose">{{arr[1]}}</li>
            <li @click="choose">{{arr[2]}}</li>
        </ul>
        <ul>
            <li @click="choose">{{arr[3]}}</li>
            <li @click="choose">{{arr[4]}}</li>
            <li @click="choose">{{arr[5]}}</li>
        </ul>
        <ul>
            <li @click="choose">{{arr[6]}}</li>
            <li @click="choose">{{arr[7]}}</li>
            <li @click="choose">{{arr[8]}}</li>
        </ul>
        <ul>
            <li class="none"></li>
            <li @click="choose">0</li>
            <li @click="del" class="none del" data-no="del"><img src="../../img/del.png"></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            config : {
                type : Object,
                default :  function () {
                    return {
                        maxLength : 6,
                        value : ""
                    }
                }
            }
        },

        data () {
            //随机排列0-9
            var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            function shuffle(arr) {
                var s = [];
                while (arr.length) {
                    s.push(arr.splice(Math.random() * arr.length, 1)[0]);
                }
                return s;
            }

            arr = shuffle(arr);
            return {
                arr: arr
            }
        },

        methods: {
            choose(event){
                var li = event.target;
                var value = li.innerText;
                var length = this.config.value.length;
                //初始化开始事件
                if(value && length == 0){
                    this.$dispatch('keybord.start')
                }
                //如果当前值的length小于设置的最大length
                if(length < this.config.maxLength){
                    this.config.value +=  value;
                    length = this.config.value.length;
                    this.$dispatch('keybord.click', this.config.value);
                    if(length == this.config.maxLength){
                        this.$dispatch('keybord.end', this.config.value);
                        setTimeout(()=>{
                            this.$dispatch('keybord.destory', this.config.value);
                        },300)
                    }
                }
            },
            down(){
                this.$dispatch('keybord.end', this.config.value);
            },
            del(){
                //删除一个值
                this.config.value = this.config.value.slice(0, length-1);
                this.$dispatch('keybord.click', this.config.value);
            }
        }
    }
</script>