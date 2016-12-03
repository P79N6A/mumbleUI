<template>
    <div class="loading-panel">
        <loading :show="show" ></loading>
        <button @click="show=!show">toggle</button>
    </div>
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
