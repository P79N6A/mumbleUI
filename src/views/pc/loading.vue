<template>
    <loading :show="show" />
</template>
<script type="text/ecmascript-6">
    import loading from "../../components/pc/loading/loading.vue";
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
