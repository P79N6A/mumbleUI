<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="col in rule"
                    :style="getStyle(col, $index)"
                    :class="getThClass(col, $index)"
                    @click="thColClick(col, $index, $event)">
                    {{col.name}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(rowIndex, trData) in data" class="row_{{rowIndex+1}}" @click="bodyTrClick(trData, $event)">
                <td v-for="(colIndex, col) in rule"
                    track-by="$index"
                    :style="getStyle(col, colIndex)"
                    :class="getTbClass(col, colIndex, trData[col.dataKey])">
                    {{render(col, trData[col.dataKey])}}
                    <template v-if="trData[col.dataKey] == null && col.action">
                        <span v-for="actionItem in col.action" @click.stop="fireAction(actionItem, trData, $event)">
                            {{actionItem.text}}
                        </span>
                    </template>
                </td>
            </tr>
            </tbody>
        </table>
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'
    import _ from 'lodash/core';
    export default {
        props: ['data'],
        data: function () {
            return {
                rule: []
            }
        },
        ready: function () {
            var _this = this;
            this.$children.forEach(function (child) {
                //把column的配置整合到rule中
                var obj = {};
                for(var p in child._props){
                    obj[p] = child[p]
                }
                _this.rule.push(obj)
            });
        },
        methods: {
            //渲染列 可以根据类型渲染不同的样式，比如说渲染普通文本，渲染数字，渲染过滤后的文本，可以自定义渲染的td
            render: function (col, tdData) {
                //如果filter存在
                if(_.isArray(col.filter)){
                    var theOne = col.filter.filter(function (o) {
                        return o.key == tdData;
                    });
                    if(theOne.length > 0){
                        tdData = theOne[0].value
                    }
                }else if(_.isFunction(col.filter)){
                    tdData = col.filter(tdData)
                }
                return tdData
            },
            //获得头部样式
            getThClass: function (col, index) {
                var obj = {
                    ["col_"+(index+1)] : true
                };
                return obj
            },
            //设置td的个性样式
            getTbClass(col, index, tdData){
                var obj = {
                    ["col_"+(index+1)] : true
                };
                if(col.addClass){
                    if(_.isString(col.addClass)){
                        obj[col.addClass] = true
                    }else if(_.isFunction(col.addClass)){
                        var rst = col.addClass(tdData);
                        if(_.isString(rst)){
                            obj[rst] = true
                        }
                    }
                }
                return obj
            },
            //设置样式
            getStyle: function (col, index) {
                return {
                    "text-align" : col.align,
                    "width" : col.width
                }
            },
            //点击th列
            thColClick: function (col, index, event) {
                this.$dispatch("th-col-click", col, index);
            },
            //点击内容行
            bodyTrClick: function (rowData, event) {
                this.$dispatch("body-tr-click", rowData)
            },
            //触发action动作
            fireAction: function (action, rowData, event) {
                if(_.isString(action.func)){
                    this.$parent[action.func].call(this.$parent, rowData)
                }
                if(_.isFunction(action.func)){
                    action.func(rowData)
                }
            }
        }
    }
</script>
<style lang="scss">
    table {
        width: 100%;
        max-width: 100%;
        border: 1px solid #d7d7d7;
        border-spacing: 0;
        border-collapse: collapse;
    }
    tr{
        border-bottom: 1px solid #e4e4e4;
    }
    td, th{
        padding: 10px 20px;
    }
    th{
        background-color: #e8e8e8;
    }
</style>
