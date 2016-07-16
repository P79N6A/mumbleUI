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
            <tr v-for="(rowIndex, trData) in data | orderBy sortKey order" class="row_{{rowIndex+1}}" 
                @click="bodyTrClick(trData, $event)">
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
    import table from './BaseTable'
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
            console.log(this._frag)
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
<style scoped lang="scss">
    th.sort {
    }

    th.sort.down:before {
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid black;
    }

    th.sort.up:before {
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid black;
    }
</style>
