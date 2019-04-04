```html
<template>
    <p>选择的时间：{{value2}}</p>
    <Date-picker v-model="value2" model="multiple"></Date-picker>
</template>
<script>
    export default {
        data: function () {
            let today = new Date().getTime();
            let tomorrow = new Date().getTime() + 1000*3600*24*7;
            return {
                value2: [today, tomorrow] 
            }
        },
    }
</script>
```