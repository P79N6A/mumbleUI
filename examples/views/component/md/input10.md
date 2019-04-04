```html
<template>
    <Wb-input v-model="text" clearable placeholder="type默认为text"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text: ''
            }
        }
    }
</script>
```