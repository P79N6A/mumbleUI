```html
<template>
    <p>选择的时间：{{today}}</p>
    <Date-picker v-model="today"></Date-picker>
</template>
<script>
    export default {
        data: function () {
            let today = new Date().getTime();
            return {
                today: today
            }
        },
    }
</script>
```