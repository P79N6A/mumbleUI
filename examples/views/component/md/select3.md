```html
<template>
     <Wb-select v-model="value2" multiple @on-change="change">
        <wb-option :value="1" label="北京市"></wb-option>
        <wb-option :value="2">上海市</wb-option>
        <wb-option :value="3">深圳市</wb-option>
        <wb-option :value="4">杭州市</wb-option>
        <wb-option :value="5">南京市</wb-option>
        <wb-option :value="6">重庆市</wb-option>
    </Wb-select>
</template>
<script>
    export default {
        data: function () {
            return {
                value2: []
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