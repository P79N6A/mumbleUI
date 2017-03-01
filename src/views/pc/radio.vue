<template>
    <div class="home-panel">
        <h2>水平方向</h2>
        <Radio-group :value.sync="value" @on-change="change">
            <Radio value="1">
                <Icon type="apple-o"></Icon>apple
            </Radio>
            <Radio value="2">
                <Icon type="android"></Icon>android
            </Radio>
            <Radio value="3" :disabled="true">
                <Icon type="github"></Icon>github
            </Radio>
        </Radio-group>

        <h2>垂直方向</h2>
        <Radio-group :value.sync="value" @on-change="change" vertical>
            <Radio value="1">
                <Icon type="apple-o"></Icon>apple
            </Radio>
            <Radio value="2">
                <Icon type="android"></Icon>android
            </Radio>
            <Radio value="3" :disabled="true">
                <Icon type="github"></Icon>github
            </Radio>
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
