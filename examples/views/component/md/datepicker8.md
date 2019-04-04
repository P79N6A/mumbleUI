```html
<template>
    <p>选择的时间是：{{value5}}</p>
    <Wb-input-date-picker v-model="value5" model="range"></Wb-input-date-picker>
    <br/>
    <Wb-input-date-picker disabled></Wb-input-date-picker>
    <br/>
    <Wb-input-date-picker readonly></Wb-input-date-picker>
</template>
<script>
    export default {
        data: function () {
            return {
                value5: [],
            }
        },
    }
</script>
```