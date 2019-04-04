```html
<template>
    <Wb-button v-tooltip="option">component模版</Wb-button>
</template>
<script>
    import Vue from 'vue'
    export default {
        data: function(){
            return {
                option: {
                    direction: 'bottom',
                    align: "left",
                    component: new Vue({
                        data : function () {
                            return {
                                a: "组件",
                            }
                        },
                        template: "<Wb-button>我是{{a}}</Wb-button>"
                    })
                }
            }
            
        }
    }
</script>
```