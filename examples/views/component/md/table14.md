```html
<template>
    <Wb-table :data="data" no-data-text="暂无数据">
        <Column prop="date" name="日期"></Column>
        <Column prop="name" name="姓名"></Column>
        <Column prop="age" name="年龄"></Column>
        <Column prop="adr" name="地址"></Column>
        <Column prop="status" name="等级"></Column>
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
                data: []
            }
        }
    }
</script>
```