<template>
    <ul class="ui-tree" :class="{ 'ui-tree-inline': inline}">
        <default-node v-for="node in list" :node.sync="node" :multiple="multiple"></default-node>
    </ul>
</template>
<script type="text/ecmascript-6">
    import defaultNode from "./treeNode.vue";
    import Vue from 'vue'
    function recursion(node) {
        if (node.children && node.children.length > 0) {
            Vue.set(node, "expanded", false);
            var f = node.children.every(function (item) {
                return !item.children || item.children.length == 0
            });
            if (f) {
                Vue.set(node, "allChildIsData", true);
            } else {
                node.children.forEach(function (item) {
                    recursion(item)
                })
            }
        }
    }
    export default {
        components: {
            defaultNode: defaultNode
        },
        props: {
            inline: {
                type: Boolean,
                default: true
            },
            multiple: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array
            }
        },
        data: function () {
            return {
                chooseNode: []
            }
        },
        ready: function () {
            this.list.forEach(function (node) {
                recursion(node)
            })
            this.$on("tree.item.choose", function (node, parentNode) {
                if(!this.multiple){
                    if(this.chooseNode.length > 0){
                        this.chooseNode[0].selected = false;
                        this.chooseNode = [];
                    }
                    this.chooseNode.push(node);
                    this.$dispatch("tree.choose", node);
                }else{
                    var index = this.chooseNode.indexOf(node);
                    if(index != -1){
                        this.chooseNode.splice(index, 1);
                    }else{
                        this.chooseNode.push(node);
                    }
                    this.$dispatch("tree.choose", this.chooseNode);
                }
            });
        },
        watch: {
            //因为treeList数据可能是异步取的，当组件初始化时，它还是空的, 之后它还会更新
            "list": function () {
                this.list.forEach(function (node) {
                    recursion(node)
                })
            }
        },
    }
</script>
