```html
<template>
    <Wb-button @click="click6">提示在头部</Wb-button>
</template>
<script>
    export default {
        methods: {
            click6: function () {
                this.$Toast('提示在头部', {
                    align: 'top'
                })
            }
        }
    }
</script>
```