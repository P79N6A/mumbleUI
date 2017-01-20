<template>
    <i class="ui-icon" :class="getClass()" :style="getStyle()"></i>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            type: {
                required: true,
                type: String
            },
            size: {
                type: String,
                default: 12,
            },
            color: {
                type: String,
            }
        },
        data: function () {
            return {
            }
        },
        watch: {
        },
        ready: function () {
        },
        destroy: function () {
        },
        methods: {
            getClass: function () {
                return `ui-icon-${this.type}`
            },
            getStyle: function () {
                let style = {
                    "font-size" : `${this.size}px`
                };
                if(this.color){
                    style["color"] = this.color
                }
                return style
            }
        }
    }
</script>
