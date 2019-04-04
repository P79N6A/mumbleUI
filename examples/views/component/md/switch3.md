```html
<template>
     <Wb-switch v-model="switch" :confirm="confirm"></Wb-switch>
</template>
<script>
    export default {
        data () {
            return {
                switch1: false
            }
        },
        methods: {
            confirm() {
                return new Promise((resolve, reject)=>{
                    this.$Message({
                        title: '标题', // 可以传入文本和domString
                        template: '是否啊啊啊啊啊？', // 可以传入文本和domString
                        buttons: [{ // 最多有两个, 第一条配置第一个button
                            text: '确定',
                            class: 'xx'
                        }, { // 配置第二个button
                            text: '放弃',
                            class: 'yy'
                        }]
                    }).then(function (index) {
                        console.log(index)
                        if (index == 0) {
                            resolve()
                        }
                    })
                })
            }
        }
    }
</script>
```