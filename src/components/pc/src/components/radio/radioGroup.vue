<template>
    <div class="ui-radio-group" :class="getClass">
        <slot></slot>
    </div>
</template>
<script>
    import * as util from "../../util.js";
    export default {
        props: {
            value: {
                type: [String, Number],
                default: ""
            },
            type: String,
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
                    arr.push("ui-radio-group-vertical")
                }
                return arr;
            },
        },
        watch: {
            "value": function (val) {
                if (this.selectedOption) {
                    this.selectedOption.checked = false;
                    this.selectedOption = null;
                }
                this.init(val);
                this.$dispatch("on-change", val);
            }
        },
        ready: function () {
            var name = "radio_" + new Date().getTime();
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
                        if(option.value == value){
                            option.checked = true;
                            this.selectedOption = option;
                        }
                    })
                }
            },
            change: function (value, child) {
                this.value = value;
            }
        }
    }
</script>
