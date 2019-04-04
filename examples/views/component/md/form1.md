```html
<template>
     <Wb-form>
        <Form-item label="输入框">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item label="密码输入框">
            <wb-input placeholder="请输入" type="password"></wb-input>
        </Form-item>
        <Form-item label="数字输入框">
            <wb-input placeholder="请输入" type="number"></wb-input>
        </Form-item>
        <Form-item label="下拉框">
            <wb-select>
                <wb-option :value="1">北京市</wb-option>
                <wb-option :value="2">上海市</wb-option>
                <wb-option :value="3">深圳市</wb-option>
                <wb-option :value="4">杭州市</wb-option>
                <wb-option :value="5">南京市</wb-option>
                <wb-option :value="6">重庆市</wb-option>
            </wb-select>
        </Form-item>
        <Form-item label="单选框">
            <Radio-group>
                <Radio value="1">
                    男
                </Radio>
                <Radio value="2">
                    女
                </Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="多选框">
            <Checkbox-group>
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
            <Wb-switch>
                <span slot="close">关</span>
                <span slot="open">开</span>
            </Wb-switch>
        </Form-item>
        <Form-item label="文本域">
            <wb-input type="textarea" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item>
            <Wb-button type="primary">提交</Wb-button>
            <Wb-button type="ghost" style="margin-left: 8px">取消</Wb-button>
        </Form-item>
    </Wb-form>
</template>
<script>
    export default {

    }
</script>
```