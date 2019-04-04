```html
<template>
    <Date-picker :min-date="minDate" :max-date="maxDate"></Date-picker>
</template>
<script>
    export default {
        data: function () {
            let minDate = new Date(new Date().getTime() - 1000*3600*24*5);
            let maxDate = new Date(new Date().getTime() + 1000*3600*24*5);
            return {
                minDate: minDate,
                maxDate: maxDate,
            }
        },
    }
</script>
```