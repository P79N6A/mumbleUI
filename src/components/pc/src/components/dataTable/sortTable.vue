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
                    <div class="ui-table-column-sorter">
                        <span class="ui-table-column-sorter-up off" title="↑">
                            <i class="anticon anticon-caret-up "></i>
                        </span>
                        <span class="ui-table-column-sorter-down off" title="↓">
                            <i class="anticon anticon-caret-down "></i>
                        </span>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody class="ui-table-tbody">
            <tr v-for="(rowIndex, trData) in showData | orderBy sortKey order" track-by="$index" class="row_{{rowIndex+1}}"
                @click="bodyTrClick(trData, $event)">
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
//        mixins: [table],
        data: function () {
            return {
                order: 1,
                sortKey: ""
            }
        },
        init: function () {
        },
        methods: {
            getThClass: function (col, index) {
                var obj = {
                    sort: col.dataKey == this.sortKey,
                    up: this.order == 1,
                    down: this.order == -1,
                    ["col_"+(index+1)] : true
                };
                return obj
            },
            thColClick: function (col, index, event) {
                if (col.sort === true || col.sort === "true") {
                    if (this.sortKey == col.dataKey) {
                        this.order = this.order * -1;
                    } else {
                        this.sortKey = col.dataKey;
                        this.order = 1;
                    }
                }
                this.$dispatch("th-col-click", col, index);
            }
        }
    }
</script>
