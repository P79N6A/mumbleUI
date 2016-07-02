<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="item in rule"
                    :style="getStyle(item)"
                    class="col_{{$index+1}}"
                    :class="{sort:sortKey==item.dataKey, up:order>=0, down:order<0 }"
                    @click="thColClick(item, $event)">
                    {{item.name}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(rowIndex, trData) in data | orderBy sortKey order | table rule"  class="row_{{rowIndex+1}}"
                @click="bodyTrClick(data[rowIndex], $event)">
                <td v-for="(colIndex, tdData) in trData"
                    track-by="$index"
                    :style="getStyle(rule[colIndex])"
                    class="col_{{colIndex+1}}">
                    {{render(tdData, rule[colIndex])}}
                    <template v-if="tdData === null && rule[colIndex].action">
                        <span v-for="actionItem in rule[colIndex].action"
                              @click.stop="fireAction(actionItem, data[rowIndex], $event)">
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
    import table from './Table'
    export default {
        extends: table,
//        mixins: [table],
        data: function () {
          return {
              order : 1,
              sortKey : ""
          }
        },
        methods: {
            thColClick: function (rule, event) {
                if(rule.sort === true || rule.sort === "true"){
                    if(this.sortKey == rule.dataKey){
                        this.order = this.order * -1;
                    }else{
                        this.sortKey = rule.dataKey;
                        this.order = 1;
                    }
                }
            }
        }
    }
</script>
<style scoped>
    th.sort{
    }
    th.sort.down:before{
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid black;
    }
    th.sort.up:before{
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid black;
    }
</style>
