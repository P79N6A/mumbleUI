<template>
    <div class="home-panel">
        <h2>select：</h2>
        <wb-select :value.sync="value" @on-change="change">
            <wb-option :value="1">北京市</wb-option>
            <wb-option :value="2">上海市</wb-option>
            <wb-option :value="3">深圳市</wb-option>
            <wb-option :value="4">杭州市</wb-option>
            <wb-option :value="5">南京市</wb-option>
            <wb-option :value="6">重庆市</wb-option>
        </wb-select>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                value: ""
            }
        },
        ready: function () {
        },
        methods: {
            change: function (value) {
                console.log(value)
            }
        }
    }
</script>
