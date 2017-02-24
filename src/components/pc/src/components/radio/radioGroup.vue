<template>
    <div class="ui-radio-group">
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
        watch: {
            "value": function (val) {
                if (this.$children) {
                    this.$children.forEach((option, index) => {
                        if(option.value == val){
                            if (this.selectedOption) {
                                this.selectedOption.checked = false;
                            }
                            option.checked = true;
                            this.selectedOption = option;
                            this.$dispatch("on-change", option.value);
                        }
                    })
                }
            }
        },
        ready: function () {
            this.$children.forEach((option, index) => {
                option.group = true;
            });
        },
        methods: {
            change: function (value, child) {
//                if (this.selectedOption) {
//                    this.selectedOption.checked = false;
//                }
//                this.selectedOption = child;
                this.value = value;
//                this.$emit("on-change", value);
            }
        }
    }
</script>
