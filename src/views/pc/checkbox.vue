<template>
    <div class="home-panel">
        <h2>水平方向</h2>
        <Checkbox-group :value.sync="value" @on-change="change">
            <Checkbox value="1">
                <Icon type="apple-o"></Icon>apple
            </Checkbox>
            <Checkbox value="2">
                <Icon type="android"></Icon>android
            </Checkbox>
            <Checkbox value="3">
                <Icon type="github"></Icon>github
            </Checkbox>
        </Checkbox-group>
        {{value | json}}

        <h2>垂直方向</h2>
        <Checkbox-group :value.sync="value" vertical @on-change="change">
            <Checkbox value="1">
                <Icon type="apple-o"></Icon>apple
            </Checkbox>
            <Checkbox value="2">
                <Icon type="android"></Icon>android
            </Checkbox>
            <Checkbox value="3">
                <Icon type="github"></Icon>github
            </Checkbox>
        </Checkbox-group>
        {{value | json}}
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                value: ["3"]
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
