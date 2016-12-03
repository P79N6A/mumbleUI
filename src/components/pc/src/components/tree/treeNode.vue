<template>
    <li class="ui-tree-node">
        <i v-if="node.children && node.children.length>0" class="ui-icon" :class="arrowClass(node)" @click="clickIcon(node)"></i>
        <i v-else class="ui-icon-tree-null"></i>
        <span @click="clickItem(node)" class="ui-tree-node-text" :class="{selected: node.selected}">
            {{ node.name }}
        </span>
        <ul v-if="node.children && node.children.length > 0" v-show="node.expanded" class="ui-tree ui-child-tree" :class="{'ui-tree-just-data': node.allChildIsData}">
            <item v-for="sonNode in node.children" :parent-node.sync="node" :node.sync="sonNode" :multiple="multiple"></item>
        </ul>
    </li>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default {
        name: "item",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            parentNode: Object,         //上级节点
            node: Object                //本节点
        },
        data: function () {
            return {

            }
        },
        ready: function () {
        },
        methods: {
            arrowClass: function (node) {
                var className = "";
                if (node.expanded) {
                    className = "ui-icon-tree-open";
                } else {
                    className = "ui-icon-tree-close";
                }
                return className
            },
            clickIcon: function (node) {
                node.expanded = !node.expanded;
            },
            clickItem: function (node) {
                Vue.set(node, "selected", !node.selected);
                this.$dispatch("tree.item.choose", node, this.parentNode);
            }
        }
    }
</script>
