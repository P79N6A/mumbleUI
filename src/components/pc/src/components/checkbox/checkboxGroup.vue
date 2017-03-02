<template>
    <div class="ui-checkbox-group" :class="getClass">
        <slot></slot>
    </div>
</template>
<script>
    import * as util from "../../utils/util.js";
    export default {
        props: {
            value: {
                type: Array,
                default: []
            },
            vertical: {
                type: Boolean,
                default: false
            },
        },
        data: function () {
            return {
                selectedOption: null,
            }
        },
        computed: {
            getClass(){
                var arr = [];
                if (this.vertical) {
                    arr.push("ui-checkbox-group-vertical")
                }
                return arr;
            },
        },
        watch: {
            "value": function (val) {
                this.init(val);
                this.$dispatch("on-change", val);
                this.$dispatch('on-form-change', val);
            }
        },
        ready: function () {
            var name = "checkbox_" + new Date().getTime();
            this.$children.forEach((option, index) => {
                option.group = true;
                option.name = name;
            });
            this.init(this.value)
        },
        methods: {
            init: function (value) {
                if (this.$children) {
                    this.$children.forEach((option, index) => {
                        option.checked = false;
                        if(value.indexOf(option.value) != -1 ){
                            option.checked = true;
                        }
                    })
                }
            },
            change: function (value, checked) {
                if(checked){
                    this.value.push(value)
                }else{
                    var index = this.value.indexOf(value);
                    if(index != -1 ){
                        this.value.splice(index, 1)
                    }else{
                        console.warn("checkbox组件出现异常")
                    }
                }
            }
        }
    }
</script>
