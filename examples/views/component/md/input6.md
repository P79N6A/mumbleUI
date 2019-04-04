```html
<template>
    <Wb-input v-model="text7" type="textarea" placeholder="请输入文本"></Wb-input>
    <Wb-input v-model="text7" type="textarea" :rows="4" placeholder="请输入文本"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text7: "",
            }
        },
    }
</script>
```