<template>
    <div class="ui-tab" v-show="show" transition="fade">
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
