<template>
    <div class="toast-panel">
        <button @click="click1">点我弹出toast</button>
        <button @click="click2">点我弹出错误的toast</button>
        <button @click="click4">点我弹出警告的toast</button>
        <button @click="click3">点我弹出成功的toast</button>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        ready: function () {
        },
        methods: {
            click1: function () {
                this.$Toast("我是一条提示消息")
            },
            click2: function () {
                this.$Toast.error("用户名或者密码不正确")
            },
            click3: function () {
                this.$Toast.success("创建订单成功")
            },
            click4: function () {
                this.$Toast.warn("请输入正确的用户名")
            }
        }
    }
</script>
