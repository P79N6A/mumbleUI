<template>
    <button @click="click1">点我弹出toast</button>
    <button @click="click2">点我弹出错误的toast</button>
    <button @click="click3">点我弹出成功的toast</button>
</template>
<script type="text/ecmascript-6">
    export default {
        ready: function () {
        },
        methods: {
            click1: function () {
                this.$Toast(1111111111)
            },
            click2: function () {
                this.$Toast.error(1111111111)
            },
            click3: function () {
                this.$Toast.success(1111111111)
            }
        }
    }
</script>
