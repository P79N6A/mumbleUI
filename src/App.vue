<template>
    <!--<mytable :data="data" @th-col-click="thColClick" @body-tr-click="trClick">-->
        <!--<column slot data-key="a" name="col-a" align="center" width="130px" filter="status"></column>-->
        <!--<column slot data-key="b" name="col-b" width="130px" :filter="haha"></column>-->
        <!--<column slot data-key="b" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>-->
        <!--<column slot name="操作"  align="center" width="230px" action="{text:'删除',func:'callback'}"></column>-->
    <!--</mytable>-->
    <sort-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="a" name="col-a" align="center" width="130px" filter="status"></column>
        <column slot data-key="b" name="col-b" width="130px" sort="true"></column>
        <column slot data-key="c" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>
        <column slot name="操作"  align="center" width="230px" action="{text:'删除',func:'callback'}"></column>
    </sort-table>
</template>

<script>
    import Table from './components/Table'
    import Column from './components/Column'
    import SortTable from './components/SortTable'
    export default {
        components: {
            mytable: Table,
            column: Column,
            sortTable: SortTable
        },
        data: function () {
            return {
                data: [{
                    a : 1, b:1, c:1
                },{
                    a : 2, b:2, c:2
                }]
            }
        },
        ready: function () {
        },
        methods: {
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

<style>
    html,body {
        width: 100%;
        height: 100%;
    }
</style>
