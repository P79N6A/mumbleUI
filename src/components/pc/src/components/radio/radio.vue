<template>
    <label class="ui-radio-wrapper" :class="getClass">
        <span class="ui-radio"  :class="{'ui-radio-checked': checked}">
            <span class="ui-radio-inner"></span>
            <input class="ui-radio-input" type="radio" :value="value" :checked="checked" :disabled="disabled" @click="click"/>
        </span>
        <span class="ui-radio-content">
            <slot></slot>
        </span>
    </label>
</template>
<script>
    import * as util from "../../util.js";
    export default {
        props: {
            value: {
                type: [String, Number],
            },
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                group: false
            }
        },
        computed: {
            getClass(){
                var arr = [];
                if(this.checked){
                    arr.push("ui-radio-wrapper-checked")
                }
                if(this.disabled){
                    arr.push("ui-radio-wrapper-disabled")
                }
                return arr;
            },
        },
        watch: {
        },
        ready: function () {
        },
        methods: {
            click () {
                if (this.disabled) {
                    return false;
                }
                this.checked = !this.checked;
                if(this.checked){
                    if(this.group){
                        this.$parent.change(this.value);
                    }else{
                        this.$emit("on-change", this.value);
                    }
                }
            }
        }
    }
</script>
