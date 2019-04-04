```html
<template>
    <Wb-table :data="data">
        <Column prop="date" name="日期" align="left" width="200px"></Column>
        <Column prop="name" name="姓名" align="right"></Column>
        <Column prop="age" name="年龄"  align="center" classes="error" ></Column>
        <Column prop="adr" name="地址" align="center"></Column>
        <Column prop="status" name="状态" align="center" :classes="fixWarnStyle" ></Column>
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
                data: [{
                    name: "张晓刚",
                    age: 24,
                    date: new Date(2016, 9, 10),
                    adr: "北京市海淀区西二旗",
                    status: 1
                }, {
                    name: "李晓红",
                    age: 26,
                    date: new Date(2016, 9, 11),
                    adr: "北京市海淀区西二旗",
                    status: 2
                }, {
                    name: "隔壁老王",
                    age: 22,
                    date: new Date(2016, 9, 12),
                    adr: "北京市海淀区西二旗",
                    status: 3
                }, {
                    name: "我爸是李刚",
                    age: 19,
                    date: new Date(2016, 9, 13),
                    adr: "北京市海淀区西二旗",
                    status: 4
                }],
            }
        },
        methods: {
            fixWarnStyle: function (data, trData) {
                if (data < 3) {
                    return 'error'
                }
            }
        }
    }
</script>
```