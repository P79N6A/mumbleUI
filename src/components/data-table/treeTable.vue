<template>
    <div :class="classes" class="ui-table-swap">
        <slot />
        <table class="ui-table">
            <thead class="ui-table-thead">
                <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex">
                    <th v-for="(col, colIndex) in row" :key="colIndex" :colspan="col.colSpan" :rowspan="col.rowSpan"
                        :style="getTdStyle(col, colIndex)" @click="thClick(col, colIndex, $event)">
                        <span>
                            {{ col.name }}
                            <div v-if="col.sort" class="ui-table-column-sorter">
                                <span :class="getSortClass(col, 'up')" class="ui-table-column-sorter-up" title="↑" @click.stop="sortUp(col)">
                                    <i class="ui-icon ui-icon-caret-up " />
                                </span>
                                <span :class="getSortClass(col, 'down')" class="ui-table-column-sorter-down" title="↓" @click.stop="sortDown(col)">
                                    <i class="ui-icon ui-icon-caret-down " />
                                </span>
                            </div>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="ui-table-tbody">
                <tr v-for="(trData, rowIndex) in showData" v-show="isShow(trData)" :key="trData._rowKey"
                    :class="getTrClass(rowIndex)"
                    @click="trClick(getOriginalData(trData), rowIndex, $event)">
                    <td v-for="(col, colIndex) in cols" :key="colIndex"
                        :style="getTdStyle(col, colIndex)"
                        :class="getTreeTdClass(col, colIndex, trData[col.prop], trData)"
                        @click="tdClick(getOriginalData(trData), trData[col.prop], colIndex, $event)">
                        <i v-if="trData.children && trData.children.length>0 && colIndex==0" :class="{'ui-expand-close':!trData._expanded,'ui-expand-open': trData._expanded}" @click.stop="toggle(trData, $event)" />
                        <i v-else class="ui-expand-null" />
                        <table-text v-if="!col.action && !col.component" :col="col" :tr-data="trData" />
                        <table-action :col="col" :tr-data="trData" @on-click="fireAction" />
                        <table-component :col="col" :tr-data="trData" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="noDataText" v-show="showData.length==0" class="ui-table-empty">
            {{ noDataText }}
        </div>
    </div>
</template>
<script>
import table from './table.vue'
import * as util from '../../utils/util.js';
export default {
    name: 'TreeTable',
    extends: table,
    watch: {
        data: {
            handler() {
                this.showData = this.makeData(this.objectToArray(this.data));
            },
            deep: true
        }
    },
    created: function () {
        this.showData = this.makeData(this.objectToArray(this.data));
    },
    methods: {
        // 设置样式
        getTdStyle: function (col, index) {
            return {
                'text-align': index === 0 ? 'left' : col.align,
                'width': col.width
            }
        },
        objectToArray(data, collection, parent) {
            collection = collection || [];
            if (util.isArray(data)) {
                var arr = util.deepCopy(data);
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    var item = arr[i];
                    if (parent) {
                        item._parentSeq = parent._seq;
                        item._seq = parent._seq + '.' + (i + 1);
                    } else {
                        item._seq = '' + (i + 1 )
                    }
                    collection.push(item);
                    if (item.children && item.children.length > 0) {
                        item._expanded = false;
                        this.objectToArray(item.children, collection, item)
                    }
                }
            }
            return collection
        },
        // 设置td的个性样式
        getTreeTdClass(col, index, tdData, trData) {
            var arr = this.getTdClass(col, index, tdData, trData)
            if (index == 0) {
                arr.push('tree-level-' + trData._seq.split('.').length)
            }
            return arr
        },
        // 判断是否一个节点是否显示，需要去递归去找父节点直到父节点是闭合，闭合则隐藏
        isShow: function (trData) {
            var digui = (data)=> {
                var parent = this.showData.filter(function (item) {
                    return item._seq == data._parentSeq
                });
                if (parent[0]) {
                    if (parent[0]._expanded) {
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
        toggle: function (data) {
            if (data._expanded !== undefined) {
                data._expanded = !data._expanded;
            }
        },
        getOriginalData(trData) {
            let result = null;
            trData._seq.split('.').forEach(index=>{
                if (result == null) {
                    result = this.data[index - 1]
                } else {
                    result = result[index]
                }
            })
            return result
        }
    }
}
</script>
