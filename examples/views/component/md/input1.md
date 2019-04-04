```html
<template>
    <Wb-input v-model="text1" placeholder="type默认为text"></Wb-input>
    <Wb-input v-model="text1" :maxlength="10" placeholder="通过maxlength设置最大输入长度"></Wb-input>
    <Wb-input v-model="text1" placeholder="通过width设置宽度" width="200px"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text1: ""
            }
        },
    }
</script>
```