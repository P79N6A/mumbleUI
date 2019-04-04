```html
<template>
    <Wb-button @click="showModal1">显示普通模态框</Wb-button>
    <modal ref="modal1"
            title="新增"
            sub-title="客户信息"
            @on-close="close">
        <Wb-form>
            <Form-item label="输入框">
                <Wb-input placeholder="我是文本哦"></Wb-input>
            </Form-item>
            <Form-item label="下拉框">
                <Wb-select>
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" disabled>深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </Wb-select>
            </Form-item>
            <Form-item label="单选框">
                <Radio-group>
                    <Radio label="1">
                        <Icon type="apple-o"></Icon>apple
                    </Radio>
                    <Radio label="2">
                        <Icon type="android"></Icon>android
                    </Radio>
                    <Radio label="3" disabled>
                        <Icon type="github"></Icon>github
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="多选框">
                <Checkbox-group>
                    <Checkbox label="1">
                        <Icon type="apple-o"></Icon>apple
                    </Checkbox>
                    <Checkbox label="2">
                        <Icon type="android"></Icon>android
                    </Checkbox>
                    <Checkbox label="3">
                        <Icon type="github"></Icon>github
                    </Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="开关">
                <Wb-switch>
                    <span slot="close">关</span>
                    <span slot="open">开</span>
                </Wb-switch>
            </Form-item>
            <Form-item>
                <Wb-button type="primary">提交</Wb-button>
            </Form-item>
        </Wb-form>
    </modal>
</template>
<script>
    export default {
        data: function () {
            return {
                show1: false,
            }
        },
        ready: function () {
        },
        methods: {
            showModal1: function () {
                this.$refs.modal1.show()
            },
            close: function () {
                console.log('closed')
            }
        }
    }
</script>
```