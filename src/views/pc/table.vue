<template>
    <h2>普通组件：</h2>
    <mytable :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="a" name="col-a" align="center" :add-class="addClass" width="130px"></column>
        <column slot data-key="b" name="col-b" add-class="red" width="130px"></column>
        <column slot data-key="c" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>
        <column slot data-key="d" name="col-d" :filter="filterFuncOne"></column>
        <column slot data-key="d" name="col-e" :filter="filterFuncTwo"></column>
        <column slot name="操作" align="center" width="230px" action="{text:'删除',func:'callback'}"></column>
    </mytable>

    <h2>带排序功能的组件：</h2>
    <sort-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="a" name="col-a" align="center" width="130px"></column>
        <column slot data-key="b" name="col-b" width="130px" sort="true"></column>
        <column slot data-key="c" name="col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></column>
        <column slot name="操作" align="center" width="230px" action="{text:'删除',func:'callback'}"></column>
    </sort-table>

    <h2>treeTable：</h2>
    <tree-table :data="treeDate" @th-col-click="thColClick" @body-tr-click="trClick">
        <column slot data-key="sid" name="col-a" :add-class="addClass" width="400px"></column>
        <column slot data-key="scenario_name" name="col-b" add-class="red" width="130px"></column>
    </tree-table>
</template>

<script>
    import Vue from "vue"
    import Table from '../../components/pc/dataTable/baseTable'
    import Column from '../../components/pc/dataTable/column'
    import SortTable from '../../components/pc/dataTable/sortTable'
    import treeTable from '../../components/pc/dataTable/treeTable.vue'
    export default {
        components: {
            mytable: Table,
            column: Column,
            sortTable: SortTable,
            treeTable
        },
        data: function () {
            return {
                data: [{
                    a: 1, b: 1, c: 1, d: "丹"
                }, {
                    a: 2, b: 2, c: 2, d: "纯"
                }],
                treeDate: [{
                    sid: "1",
                    scenario_name: "js",
                    children: [{
                        sid: "1.1",
                        scenario_name: "nj",
                    }, {
                        sid: "1.2",
                        scenario_name: "sz",
                        children: [{
                            sid: "1.2.1",
                            scenario_name: "wj",
                        }, {
                            sid: "1.2.2",
                            scenario_name: "cs",
                        }]
                    }]
                }, {
                    sid: "2",
                    scenario_name: "yn",
                    children: [{
                        sid: "2.1",
                        scenario_name: "wj",
                    }, {
                        sid: "2.2",
                        scenario_name: "cs"
                    }]
                }, {
                    sid: "3",
                    scenario_name: "fj",
                }]
            }
        },
        ready: function () {
        },
        methods: {
            addClass(data){
                if (data == 1) {
                    return "blue"
                }
            },
            filterFuncOne(data){
                return data + " | " + data;
            },
            filterFuncTwo(data){
                return new Vue({
                    data: {
                        msg: "我是一个自定义组件"
                    },
                    template: '<div>{{msg}}</div>',
                    ready: function(){
                    }
                })
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
    .blue {
        color: blue;
    }

    .red {
        color: red;
    }
</style>
