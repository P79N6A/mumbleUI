```html
<template>
    <Tabs value="1" closable @on-tab-remove="remove">
        <Tab v-for="(item,index) in arr" :label="'标签' + item" :name="item" :key="index">
            <p>{{item}}</p>
        </Tab>
        <Wb-button type="ghost" slot="action" @click="addItem">增加</Wb-button>
    </Tabs>
</template>
<script>
    export default {
        data: function () {
            return {
                arr: [1, 2, 3]
            }
        },
        methods: {
            addItem(){
                this.arr.push(this.arr.length + 1);
            },
            remove(){
                console.log(arguments)
            }
        }
    }
</script>
```