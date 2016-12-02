<template>
    <div class="table-panel">
        <h2>DataTable：</h2>
        <data-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
            <table-column slot data-key="a" name="Col-a" align="center" :add-class="addClass" width="130px"></table-column>
            <table-column slot data-key="b" name="Col-b" add-class="red" width="130px"></table-column>
            <table-column slot data-key="c" name="Col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></table-column>
            <table-column slot data-key="d" name="Col-d" :filter="filterFuncOne"></table-column>
            <table-column slot data-key="d" name="Col-e" :filter="filterFuncTwo"></table-column>
            <table-column slot name="操作" align="center" width="230px" action="{text:'删除',func:'callback'}"></table-column>
        </data-table>

        <h2>SortTable：</h2>
        <sort-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
            <table-column slot data-key="a" name="Col-a" align="center" width="130px" sort="true"></table-column>
            <table-column slot data-key="b" name="Col-b" width="130px" sort="true"></table-column>
            <table-column slot data-key="c" name="Col-c" filter="[{ key : 1,value : '星期一'},{ key : 2,value : '星期二'}]"></table-column>
            <table-column slot name="操作" align="center" width="230px" action="{text:'删除',func:'callback'}"></table-column>
        </sort-table>

        <h2>TreeTable：</h2>
        <tree-table :data="treeDate" @th-col-click="thColClick" @body-tr-click="trClick">
            <table-column slot data-key="sid" name="Col-a" :add-class="addClass" width="400px"></table-column>
            <table-column slot data-key="scenario_name" name="Col-b" add-class="red" width="130px"></table-column>
        </tree-table>
    </div>
</template>

<script>
    import Vue from "vue"
    export default {
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
