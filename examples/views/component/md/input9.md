```html
<template>
    <Wb-input type="file" v-model="text4" placeholder="请点击选择文件" @on-change="change"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text4: null
            }
        },
        methods: {
            change(){
                console.log(this.text4)
            }
        }
    }
</script>
```