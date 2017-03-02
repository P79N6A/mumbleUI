<template>
    <label class="ui-checkbox-wrapper" :class="getClass">
        <span class="ui-checkbox" :class="{'ui-checkbox-checked': checked}">
            <span class="ui-checkbox-inner"></span>
            <input class="ui-checkbox-input" type="checkbox" :name="name" :value="value" :checked="checked" :disabled="disabled"
                   @click="click"/>
        </span>
        <span class="ui-checkbox-content">
            <slot></slot>
        </span>
    </label>
</template>
<script>
    import * as util from "../../utils/util.js";
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
            },
            name: String
        },
        data: function () {
            return {
                group: false
            }
        },
        computed: {
            getClass(){
                var arr = [];
                if (this.checked) {
                    arr.push("ui-checkbox-wrapper-checked")
                }
                if (this.disabled) {
                    arr.push("ui-checkbox-wrapper-disabled")
                }
                return arr;
            },
        },
        watch: {},
        ready: function () {
        },
        methods: {
            click () {
                if (this.disabled) {
                    return false;
                }
                this.checked = !this.checked;
                if (this.group) {
                    this.$parent.change(this.value, this.checked);
                } else {
                    this.$emit("on-change", this.checked ? this.value : "");
                }
            }
        }
    }
</script>
