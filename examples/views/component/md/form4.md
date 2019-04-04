```html
<template>
    <Wb-form :rule="ruleValidate" ref="formValidate" :label-width="100">
        <Form-item label="输入框" prop="text" :rule="[{required: radio=='1', message: '不能为空'}]">
            <wb-input v-model="text" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item label="下拉框" prop="select">
            <wb-select v-model="select">
                <wb-option :value="1">北京市</wb-option>
                <wb-option :value="2">上海市</wb-option>
                <wb-option :value="3">深圳市</wb-option>
                <wb-option :value="4">杭州市</wb-option>
                <wb-option :value="5">南京市</wb-option>
                <wb-option :value="6">重庆市</wb-option>
            </wb-select>
        </Form-item>
        <Form-item label="输入框必填" prop="radio">
            <Radio-group v-model="radio">
                <Radio value="1">
                    是
                </Radio>
                <Radio value="2">
                    否
                </Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="多选框" prop="checkbox">
            <Checkbox-group v-model="checkbox">
                <Checkbox value="1">
                    吃饭
                </Checkbox>
                <Checkbox value="2">
                    睡觉
                </Checkbox>
                <Checkbox value="3">
                    跑步
                </Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item label="开关">
            <wb-switch v-model="on">
                <span slot="close">关</span>
                <span slot="open">开</span>
            </wb-switch>
        </Form-item>
        <Form-item label="文本域" prop="textarea">
            <wb-input v-model="textarea" type="textarea" :autosize="true" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item>
            <Wb-button type="primary" @click="click">提交</Wb-button>
            <Wb-button type="ghost" style="margin-left: 8px" @click="reset">重置</Wb-button>
        </Form-item>
    </Wb-form>
</template>
<script>
    export default {
        data: function () {
            return {
                text: "",
                select: "",
                radio: "",
                checkbox: [],
                on: true,
                textarea: "",
                ruleValidate: {
                    text: [
                    ],
                    select: [
                        { required: true, message: '不能为空' }
                    ],
                    radio:  [
                        { required: true, message: '不能为空' }
                    ],
                    checkbox: [
                        { required: true, message: '不能为空', type: 'array', min: 1 }
                    ],
                    textarea: [
                        { required: true, message: '不能为空' }
                    ]
                }
            }
        },
        ready: function () {
        },
        methods: {
            click(){
                this.$refs["formValidate"].validate((valid, errors) => {
                    console.log(valid, errors)
                })
            },
            reset(){
                this.$refs["formValidate"].resetFields()
            }
        }
    }
</script>
```