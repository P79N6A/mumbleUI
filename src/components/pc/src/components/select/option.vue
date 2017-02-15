<template>
    <li class="ui-select-item" :class="getClass" @click="select"><slot>{{ showLabel }}</slot></li>
</template>
<script>
    import * as util from "../../util.js";
    export default {
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                index: 0,
                selected: false,
            }
        },
        computed: {
            getClass(){
                var arr = [];
                if(this.selected){
                    arr.push("ivu-select-item-selected")
                }
                if(this.disabled){
                    arr.push("ivu-select-item-disabled")
                }
                return arr;
            },
            showLabel () {
                return (this.label) ? this.label : this.value;
            }
        },
        watch: {
        },
        ready: function () {
            console.log(this)
        },
        methods: {
            select () {
                if (this.disabled) {
                    return false;
                }
                this.$dispatch('option.selected', this.value);
            }
        }
    }
</script>
