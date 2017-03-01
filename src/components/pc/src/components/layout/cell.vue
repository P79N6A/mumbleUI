<template>
    <div class="ui-cell" :class="getClass()">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            span: {
                required: true,
                type: [String, Number]
            },
            offset: {
                type: String
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
                var classList = [`ui-cell-span-${this.span}`];
                if(this.offset){
                    classList.push(`ui-cell-offset-${this.offset}`)
                }
                return classList
            }
        }
    }
</script>
