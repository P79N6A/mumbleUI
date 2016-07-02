<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="item in rule"
                    :style="getStyle(item)"
                    :class="getThClass(item, $index)"
                    @click="thColClick(item, $event)">
                    {{item.name}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(rowIndex, trData) in data | orderBy sortKey order" class="row_{{rowIndex+1}}"
                @click="bodyTrClick(trData, $event)">
                <td v-for="(colIndex, item) in rule"
                    track-by="$index"
                    :style="getStyle(item)"
                    class="col_{{colIndex+1}}">
                    {{render(trData[item.dataKey], item)}}
                    <template v-if="trData[item.dataKey] == null && item.action">
                        <span v-for="actionItem in item.action" @click.stop="fireAction(actionItem, trData, $event)">
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
            getThClass: function (item, index) {
                var obj = {
                    sort: item.dataKey == this.sortKey,
                    up: this.order == 1,
                    down: this.order == -1
                };
                obj["col_"+(index+1)] = true;
                return obj
            },
            thColClick: function (rule, event) {
                if (rule.sort === true || rule.sort === "true") {
                    if (this.sortKey == rule.dataKey) {
                        this.order = this.order * -1;
                    } else {
                        this.sortKey = rule.dataKey;
                        this.order = 1;
                    }
                }
                this.$dispatch("th-col-click", rule);
            }
        }
    }
</script>
<style scoped>
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
