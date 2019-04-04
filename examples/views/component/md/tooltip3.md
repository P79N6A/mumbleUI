```html
<template>
    <Wb-button v-tooltip="option">html字符串</Wb-button>
</template>
<script>
    export default {
        data (){
            return {
                option: {
                    align: "left",
                    direction: "bottom",
                    html: "<em>我是带em标签的字符串</em>"
                }
            }
        }
    }
</script>
```