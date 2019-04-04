```html
<template>
    <Radio-group v-model="value1" @on-change="change">
        <Radio value="1">
            apple
        </Radio>
        <Radio value="2">
            android
        </Radio>
        <Radio value="3">
            github
        </Radio>
    </Radio-group>
</template>
<script>
    export default {
        data: function () {
            return {
                value: "1"
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