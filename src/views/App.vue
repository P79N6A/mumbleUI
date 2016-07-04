<template>
    <div id="wrapper">
        <!-- main view -->
        <router-view v-ref:pageview keep-alive>
        </router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        replace: false,
        data:function() {
            return {
            }
        },
        compiled:function() {
        }
    }
</script>
<style src="../assets/styles/main.scss" lang="scss"></style>
