```html
<template>
    <Wb-table :data="data">
        <Column prop="date" name="日期" :filter="formatDate"></Column>
        <Column prop="name" name="姓名"></Column>
        <Column prop="age" name="年龄"></Column>
        <Column prop="adr" name="地址"></Column>
        <Column prop="status" name="状态" :filter="status"></Column>
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
                status: [{
                    value : 1,
                    text : "黄铜"
                },{
                    value : 2,
                    text : "白银"
                },{
                    value : 3,
                    text : "黄金"
                },{
                    value : 4,
                    text : "铂金"
                }],
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
            formatDate: function (data, trData) {
                var year = data.getFullYear();
                var m = data.getMonth();
                var date = data.getDate();
                return year + "-" + m + "-" + date
            }
        }
    }
</script>
```