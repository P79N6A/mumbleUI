<template>
    <div class="ui-switch" @click="toggle" :class="getClass()">
        <div class="ui-switch-circle">
        </div>
        <span class="ui-switch-text">
            <slot name="open" v-if="on"></slot>
            <slot name="close" v-else></slot>
        </span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            on: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
            }
        },
        methods:{
            getClass: function () {
                var classes = {
                    'ui-switch-on' : this.on,
                    'ui-switch-off': !this.on
                };
                return classes
            },
            toggle: function () {
                this.on = !this.on;
            }
        }
    }
</script>
