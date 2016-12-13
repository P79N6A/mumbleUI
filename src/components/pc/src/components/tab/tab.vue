<template>
    <div class="ui-tab" v-show="show" transition="tabfade">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            label:  {
                type: String,
                required: true
            },
            icon:{
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                show: false
            }
        },
        computed: {
        },
        methods:{
        }
    }
</script>
