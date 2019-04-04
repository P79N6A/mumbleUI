```html
<template>
    <Radio-group v-model="value3" @on-change="change" type="button">
        <Radio value="1">
            北京
        </Radio>
        <Radio value="2">
            上海
        </Radio>
        <Radio value="3">
            深圳
        </Radio>
    </Radio-group>>
</template>
<script>
    export default {
        data: function () {
            return {
                value3: "1"
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