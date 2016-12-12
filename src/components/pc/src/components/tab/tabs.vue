<template>
    <div class="ui-tabs">
        <div class="ui-tabs-header">
            <div class="ui-tabs-header-item" v-for="item in keys" track-by="$index"  @click="choose($index)"
                 :class="{ 'ui-tabs-header-current': current == $index + 1 }">
                {{item}}
            </div>
        </div>
        <div class="ui-tabs-body">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            current: {
                type: Number,
                default: 1
            }
        },
        data: function () {
            return {
                len: 0,
                keys: []
            }
        },
//        watch: {
//            "current": function () {
//                this.upDateChildren();
//            }
//        },
        ready: function () {
            this.len = this.$children.length;
            this.upDateChildren();
        },
        methods: {
            upDateChildren: function () {
                var _this = this;
                if(this.$children){
                    this.$children.forEach(function (tab, index) {
                        _this.keys.push(tab.label);
                        if(index == _this.current -1){
                            tab.show = true
                        }
                    })
                }
            },
            choose: function (index) {
                this.$children[this.current -1].show = false;
                this.current = index + 1;
                this.$children[index].show = true;
            }
        }
    }
</script>
