```html
<template>
    <Wb-form label-position="left" :label-width="100">
        <Form-item label="输入框" :label-width="150">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item label="输入框">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
    </Wb-form>
    <Wb-form label-position="right" :label-width="100">
        <Form-item label="输入框">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
    </Wb-form>
    <Wb-form label-position="top">
        <Form-item label="输入框">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
    </Wb-form>
</template>
<script>
    export default {

    }
</script>
```