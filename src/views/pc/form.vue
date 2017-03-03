<template>
    <div class="home-panel">
        <h2>Form</h2>
        <Wb-form :label-width="100" :rule="ruleValidate" v-ref:form-validate>
            <Row>
                <Cell span="12">
                    <Form-item label="输入框"  prop="text1">
                        <wb-input :value.sync="text1" placeholder="我是文本哦"></wb-input>
                    </Form-item>
                </Cell>
                <Cell span="12">
                    <Form-item label="输入框">
                        <wb-input :value.sync="text2" placeholder="我是文本哦"></wb-input>
                    </Form-item>
                </Cell>
            </Row>
            <Form-item label="下拉框" prop="select">
                <wb-select :value.sync="select">
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" :disabled="true">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </wb-select>
            </Form-item>
            <Form-item label="单选框" prop="radio">
                <Radio-group :value.sync="radio">
                    <Radio value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Radio>
                    <Radio value="2">
                        <Icon type="android"></Icon>android
                    </Radio>
                    <Radio value="3" :disabled="true">
                        <Icon type="github"></Icon>github
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="多选框" prop="checkbox">
                <Checkbox-group :value.sync="checkbox">
                    <Checkbox value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Checkbox>
                    <Checkbox value="2">
                        <Icon type="android"></Icon>android
                    </Checkbox>
                    <Checkbox value="3">
                        <Icon type="github"></Icon>github
                    </Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="开关">
                <switch :on.sync="on">
                    <span slot="close">关</span>
                    <span slot="open">开</span>
                </switch>
            </Form-item>
            <Form-item label="文本域" prop="textarea">
                <wb-input :autosize="true" :value.sync="textarea" placeholder="我是文本域" type="textarea"></wb-input>
            </Form-item>
            <Form-item>
                <div class="ui-button" @click.stop="click">提交</div>
            </Form-item>
        </Wb-form>

        <h2>label在left的Form</h2>
        <Wb-form label-position="left">
            <Form-item label="输入框">
                <wb-input :value.sync="text" placeholder="我是文本哦"></wb-input>
            </Form-item>
            <Form-item label="下拉框">
                <wb-select :value.sync="select">
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" :disabled="true">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </wb-select>
            </Form-item>
            <Form-item label="单选框">
                <Radio-group :value.sync="radio">
                    <Radio value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Radio>
                    <Radio value="2">
                        <Icon type="android"></Icon>android
                    </Radio>
                    <Radio value="3" :disabled="true">
                        <Icon type="github"></Icon>github
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="多选框">
                <Checkbox-group :value.sync="checkbox">
                    <Checkbox value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Checkbox>
                    <Checkbox value="2">
                        <Icon type="android"></Icon>android
                    </Checkbox>
                    <Checkbox value="3">
                        <Icon type="github"></Icon>github
                    </Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="开关">
                <switch :on.sync="on">
                    <span slot="close">关</span>
                    <span slot="open">开</span>
                </switch>
            </Form-item>
            <Form-item label="文本域">
                <wb-input :autosize="true" :value.sync="textarea" placeholder="我是文本域" type="textarea"></wb-input>
            </Form-item>
            <Form-item>
                <button class="ui-button">提交</button>
            </Form-item>
        </Wb-form>

        <h2>label在top的Form</h2>
        <Wb-form label-position="top">
            <Form-item label="输入框">
                <wb-input :value.sync="text" placeholder="我是文本哦"></wb-input>
            </Form-item>
            <Form-item label="下拉框">
                <wb-select :value.sync="select">
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" :disabled="true">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </wb-select>
            </Form-item>
            <Form-item label="文本域">
                <wb-input :autosize="true" :value.sync="textarea" placeholder="我是文本域" type="textarea"></wb-input>
            </Form-item>
            <Form-item>
                <button class="ui-button">提交</button>
            </Form-item>
        </Wb-form>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                text1: "",
                text: "",
                select: "",
                radio: "",
                checkbox: [],
                on: true,
                textarea: "",
                ruleValidate: {
                    text1: [
                        { required: true, message: '不能为空' }
                    ],
                    select: [
                        { required: true, message: '不能为空' }
                    ],
                    radio:  [
                        { required: true, message: '不能为空' }
                    ],
                    checkbox: [
                        { required: true, message: '不能为空', type: 'array', min: 1 }
                    ]
                }
            }
        },
        ready: function () {
        },
        methods: {
            click(){
                this.$refs["formValidate"].validate(valid => {
                    console.log(valid)
                })
            }
        }
    }
</script>
