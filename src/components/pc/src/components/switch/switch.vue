<template>
    <div class="switch" @click="toggle" :class="{'switch-on': on , 'switch-off': !on }">
        <div class="switch-circle"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            on: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
            }
        },
        methods:{
            toggle: function () {
                this.on = !this.on;
            }
        }
    }
</script>
<style src="./switch.scss" lang="scss"></style>
