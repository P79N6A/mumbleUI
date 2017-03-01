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
        watch: {
            "disabled": function () {
                this.$dispatch("tab.update");
            },
            "label": function () {
                this.$dispatch("tab.update");
            },
            "icon": function () {
                this.$dispatch("tab.update");
            }
        },
        data: function () {
            return {
                show: false
            }
        },
    }
</script>
