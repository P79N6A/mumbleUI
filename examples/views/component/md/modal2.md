```html
<template>
    <Wb-button @click='showModal2'>显示超出屏幕高的模态框</Wb-button>
    <modal ref="modal2"
            width="600"
            title="我是标题"
            sub-title="我是副标题"
            @on-close="close"
            @on-scroll="scroll">
        <div style="height:1000px">
            我是内容，我是内容
        </div>
    </modal>
</template>
<script>
    export default {
        data: function () {
            return {
                show2: false
            }
        },
        ready: function () {
        },
        methods: {
            showModal2: function () {
                this.$refs.modal2.show()
            },
            close: function () {
                console.log('closed')
            },
            scroll: function (event) {
                console.log('scrolled')
            }
        }
    }
</script>
```