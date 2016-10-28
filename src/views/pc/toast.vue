<template>
    <button @click="click1">点我弹出toast</button>
    <button @click="click2">点我弹出错误的toast</button>
    <button @click="click3">点我弹出成功的toast</button>
</template>
<script type="text/ecmascript-6">
    import toast from "../../components/pc/toast/toast.js";
    export default {
        ready: function () {
        },
        methods: {
            click1: function () {
                toast(1111111111)
            },
            click2: function () {
                toast.error(1111111111)
            },
            click3: function () {
                toast.success(1111111111)
            }
        }
    }
</script>
