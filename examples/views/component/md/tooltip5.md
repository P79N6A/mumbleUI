```html
<template>
    <Wb-button v-tooltip="option15">confirm模式</Wb-button>
</template>
<script>
    export default {
        data: function(){
            return {
                option15: {
                    text: "确认删除吗？",
                    confirm: true,
                    onOk: function () {
                        this.$Toast("点击了确定")
                    },
                    onCancel: function () {
                        this.$Toast("点击了取消")
                    }
                }
            }
            
        }
    }
</script>
```