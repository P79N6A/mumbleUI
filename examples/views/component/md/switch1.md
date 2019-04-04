```html
<template>
    <Wb-switch v-model="switch" @on-change="change"></Wb-switch>
</template>
<script>
    export default {
        data () {
            return {
                switch: false
            }
        },
        methods: {
            change (status) {
                this.$Toast('开关状态：' + status);
            }
        }
    }
</script>
```