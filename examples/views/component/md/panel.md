```html
<template>
    <Panel title="我是标题">
        <Icon type="rollback" slot="action"></Icon>
        <Wb-form label-position="left" :label-width="100">
            <Form-item label="输入框">
                <wb-input placeholder="请输入"></wb-input>
            </Form-item>
            <Form-item label="密码输入框">
                <wb-input placeholder="请输入" type="password"></wb-input>
            </Form-item>
            <Form-item label="数字输入框">
                <wb-input placeholder="请输入" type="number"></wb-input>
            </Form-item>
            <Form-item label="数字输入框">
                <wb-input placeholder="请输入" type="number"></wb-input>
            </Form-item>
        </Wb-form>
    </Panel>
</template>
<script>
    export default {
    }
</script>
```
