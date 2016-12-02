<template>
    <div class="ui-table">
        <table>
            <thead class="ui-table-thead">
            <tr>
                <th v-for="col in rule"
                    :style="getStyle(col, $index)"
                    :class="getThClass(col, $index)"
                    @click="thColClick(col, $index, $event)">
                    <span>
                        {{col.name}}
                        <div class="ui-table-column-sorter" v-if="col.sort">
                            <span class="ui-table-column-sorter-up" :class="{ on : order===1 &&  col.dataKey == sortKey, off: order!==1}"
                                  title="↑" @click="up(col)">
                                <i class="ui-icon ui-icon-caret-up "></i>
                            </span>
                            <span class="ui-table-column-sorter-down" :class="{ on : order===-1 &&　col.dataKey == sortKey, off: order!==-1}"
                                  title="↓" @click="down(col)">
                                <i class="ui-icon ui-icon-caret-down "></i>
                            </span>
                        </div>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody class="ui-table-tbody">
            <tr v-for="(rowIndex, trData) in showData | orderBy sortKey order" track-by="$index" class="row_{{rowIndex+1}}"
                @click="bodyTrClick(trData, rowIndex, $event)">
                <td v-for="(colIndex, col) in rule"
                    track-by="$index"
                    :style="getStyle(col, colIndex)"
                    :class="getTbClass(col, colIndex, trData[col.dataKey])"
                    v-add-component="trData.components[col.name]">
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
    import table from './baseTable'
    export default {
        extends: table,
        data: function () {
            return {
                order: "",
                sortKey: ""
            }
        },
        init: function () {
        },
        methods: {
            getThClass: function (col, index) {
                var obj = {
                    "ui-table-column-sort" : col.dataKey == this.sortKey,
                    ["col_"+(index+1)] : true
                };
                return obj
            },
            up: function (col) {
                this.sortKey = col.dataKey;
                this.order = 1;
            },
            down: function (col) {
                this.sortKey = col.dataKey;
                this.order = -1;
            }
        }
    }
</script>
