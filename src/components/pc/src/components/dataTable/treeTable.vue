<template>
    <div class="ui-table">
        <table>
            <thead class="ui-table-thead">
            <tr>
                <th v-for="col in rule"
                    :style="getStyle(col, $index)"
                    :class="getThClass(col, $index)"
                    @click="thColClick(col, $index, $event)">
                    {{col.name}}
                </th>
            </tr>
            </thead>
            <tbody class="ui-table-tbody">
            <tr v-for="(rowIndex, trData) in showData" track-by="$index" class="row_{{rowIndex+1}}"
                v-show="getShow(trData)"
                @click="bodyTrClick(trData, $event)">
                <td v-for="(colIndex, col) in rule"
                    track-by="$index"
                    :style="getStyle(col, colIndex)"
                    :class="getTbClass(col, colIndex, trData[col.dataKey], trData)"
                    v-add-component="trData.components[col.dataKey]">
                    <i v-if="trData.children && trData.children.length>0 && colIndex==0"
                       @click="toggleShow(trData, $event)"
                       :class="{'close':!trData.expanded,'open': trData.expanded}"></i>
                    {{render(col, trData[col.dataKey], trData)}}
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
    import table from './baseTable'
    import _ from 'lodash/core';
    //把树状的数据直接梳理成一维数据，给每条数据添加seq和parentSeq标记
    function objectToArray(data) {
        if (_.isArray(data)) {
            var arr = data;
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var index = i;
                var item = arr[index];
                if (!item.seq) {
                    Vue.set(item, "components", {});
                    Vue.set(item, "seq", index + 1 + "");
                }
                if (item.children && item.children.length > 0) {
                    Vue.set(item, "expanded", false);
                    item.children.forEach(function (childItem, childIndex) {
                        if (!childItem.seq) {
                            Vue.set(childItem, "components", {});
                            Vue.set(childItem, "parentSeq", item.seq);
                            Vue.set(childItem, "seq", item.seq + "." + (childIndex + 1));
                        }
                        arr.splice(index + 1 + childIndex, 0, childItem);
                    });
                    length += item.children.length;
                }
            }
            return arr;
        }
    }
    export default {
        extends: table,
        data: function () {
            return {}
        },
        ready: function () {
        },
        computed: {
            // 一个计算属性的 getter
            showData: function () {
                var arr = this.data.slice(0);
                return objectToArray(arr);
            }
        },
        methods: {
            //设置td的个性样式
            getTbClass(col, index, tdData, trData){
                var obj = {
                    ["col_" + (index + 1)]: true
                };
                if (col.addClass) {
                    if (_.isString(col.addClass)) {
                        obj[col.addClass] = true
                    } else if (_.isFunction(col.addClass)) {
                        var rst = col.addClass(tdData);
                        if (_.isString(rst)) {
                            obj[rst] = true
                        }
                    }
                }
                if (index == 0) {
                    obj["tree-level-" + trData.seq.split(".").length] = true;
                }
                return obj
            },
            //判断是否一个节点是否显示，需要去递归去找父节点直到父节点是闭合，闭合则隐藏
            getShow: function (trData) {
                var _this = this;
                function digui(data) {
                    var parent = _this.showData.filter(function (item) {
                        return item.seq == data.parentSeq
                    });
                    if (parent[0]) {
                        if (parent[0].expanded) {
                            return digui(parent[0])
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                }
                return digui(trData);
            },
            toggleShow: function (data, event) {
                event.stopPropagation();
                if (data.expanded != undefined) {
                    data.expanded = !data.expanded;
                }
                return false
            }
        }
    }
</script>
