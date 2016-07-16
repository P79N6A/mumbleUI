<template>
    <h2>普通组件：</h2>
    <mytable :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="a" name="col-a" align="center" :add-class="addClass" width="130px"></column>
        <column slot data-key="b" name="col-b" add-class="red" width="130px"></column>
        <column slot data-key="c" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>
        <column slot data-key="d" name="col-d" :filter="filterFunc"></column>
        <column slot name="操作"  align="center" width="230px" action="{text:'删除',func:'callback'}"></column>
    </mytable>

    <h2>带排序功能的组件：</h2>
    <sort-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="a" name="col-a" align="center" width="130px"></column>
        <column slot data-key="b" name="col-b" width="130px" sort="true"></column>
        <column slot data-key="c" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>
        <column slot name="操作"  align="center" width="230px" action="{text:'删除',func:'callback'}"></column>
    </sort-table>
</template>

<script>
    import Table from './../../components/pc/data-table/BaseTable'
    import Column from './../../components/pc/data-table/Column'
    import SortTable from './../../components/pc/data-table/SortTable'
    export default {
        components: {
            mytable: Table,
            column: Column,
            sortTable: SortTable
        },
        data: function () {
            return {
                data: [{
                    a : 1, b:1, c:1, d: "丹"
                },{
                    a : 2, b:2, c:2, d: "纯"
                }]
            }
        },
        ready: function () {
        },
        methods: {
            addClass(data){
                if(data == 1){
                    return "blue"
                }
            },
            filterFunc(data){
                return data + " | " + data;
            },
            callback: function (data) {
                console.log(data)
            },
            thColClick: function (data) {
                console.log(data)
            },
            trClick: function (data) {
                console.log(data)
            }
        }
    }
</script>
<style lang="scss">
    .blue{
        color: blue;
    }
    .red {
        color: red;
    }
</style>