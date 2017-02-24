<template>
    <div class="home-panel">
        <Radio-group :value="value" @on-change="change">
            <Radio value="1">PC</Radio>
            <Radio value="2">MOBILE</Radio>
        </Radio-group>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                value: "1"
            }
        },
        ready: function () {
        },
        methods: {
            change(val){
                console.log(val)
            }
        }
    }
</script>
