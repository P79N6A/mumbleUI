<template>
    <loading :show="show" ></loading>
    <button @click="show=!show">toggle</button>
</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                show: true
            }
        },
        methods: {
        }
    }
</script>
