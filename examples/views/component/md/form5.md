```html
<template>
    <Wb-form ref="formValidate1" :label-width="100">
        <Form-item label="输入框" v-for="(item, index) in textList" :key="index" :prop="item.text"
                    :rule="[{required: true, message: '项目' + (item.text) +'不能为空'}]">
            <wb-input v-model="item.value" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item>
            <Wb-button type="primary" @click="click1">提交</Wb-button>
            <Wb-button type="ghost" style="margin-left: 8px" @click="reset1">重置</Wb-button>
            <Wb-button type="primary" style="margin-left: 8px" @click="add">增加</Wb-button>
            <Wb-button type="primary" style="margin-left: 8px" @click="remove">减少</Wb-button>
        </Form-item>
    </Wb-form>
</template>
<script>
    export default {
        data: function () {
            return {
                textList: [{
                    text: 'text0',
                    value: ''
                }]
            }
        },
        methods: {
             add: function () {
                this.textList.push({
                    text: 'text' + this.textList.length,
                    value: ''
                })
            },
            remove: function () {
                this.textList.splice(this.textList.length - 1, 1)
            },
            click1() {
                this.$refs.formValidate1.validate(valid => {
                    console.log(valid)
                })
            },
            reset1() {
                this.$refs.formValidate1.resetFields()
            }
        }
    }
</script>
```