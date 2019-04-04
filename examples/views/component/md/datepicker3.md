```html
<template>
    <p>选择的时间：{{value3}}</p>
    <Date-picker v-model="value3" model="range"></Date-picker>
</template>
<script>
    export default {
        data: function () {
            let today = new Date().getTime();
            let tomorrow = new Date().getTime() + 1000*3600*24*7;
            return {
                value3: [today,tomorrow]
            }
        },
    }
</script>
```