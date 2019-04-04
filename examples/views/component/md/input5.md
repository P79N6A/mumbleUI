```html
<template>
    <Wb-input v-model="text6" placeholder="请输入网址">
        <span slot="prepend">http://</span>
        <span slot="append">.com</span>
    </Wb-input>
    <Wb-input v-model="text6" placeholder="日活">
        <span slot="prepend">http://</span>
        <span slot="append"><Icon type="search"></Icon></span>
    </Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text6: "",
            }
        },
    }
</script>
```