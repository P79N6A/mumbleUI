```html
<template>
    <wb-input type="textarea" autosize v-model="text9" placeholder="请输入文本"></wb-input>
    <wb-input type="textarea" :autosize="{min:4, max:6}" v-model="text9" placeholder="请输入文本"></wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text9: "",
            }
        },
    }
</script>
```