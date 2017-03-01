<template>
    <form class="ui-form" :class="getClass">
        <slot></slot>
    </form>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            value: {
                type: Object
            },
            rules: {
                type: Object
            },
            labelPosition: {
                type: String,
                default: "right"   //left、right、top
            },
            labelWidth: {
                type: Number,
                default: 7          //  7/24
            }
        },
        data: function () {
            return {
            }
        },
        computed: {
            getClass(){
                var arr = [];
                arr.push(`ui-form-position-${this.labelPosition}`);
                return arr;
            }
        },
        ready: function () {
            this.$children.forEach((child, index) => {
                if(child.constructor.name == "FormItem"){
                    child.labelWidth = this.labelWidth;
                    child.labelPosition = this.labelPosition;
                }
                console.log(child)
            })
        },
        destroy: function () {
        },
        methods: {
            init: function (value) {
            },
        }
    }
</script>
