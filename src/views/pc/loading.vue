<template>
    <loading :show="show" ></loading>
    <button @click="show=!show">toggle</button>
</template>
<script type="text/ecmascript-6">
    import loading from "../../components/pc/src/components/loading/loading.vue";
    export default{
        data: function () {
            return {
                show: true
            }
        },
        components: {
            loading
        },
        methods: {
        }
    }
</script>
