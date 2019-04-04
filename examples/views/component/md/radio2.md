```html
<template>
    <Radio-group v-model="value2" @on-change="change" vertical>
        <Radio value="1">
            <Icon type="apple-o"></Icon>apple
        </Radio>
        <Radio value="2">
            <Icon type="android"></Icon>android
        </Radio>
        <Radio value="3">
            <Icon type="github"></Icon>github
        </Radio>
    </Radio-group>
</template>
<script>
    export default {
        data: function () {
            return {
                value2: "1"
            }
        },
        methods: {
            change: function (value) {
                console.log(value)
            }
        }
    }
</script>
```