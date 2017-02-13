<template>
    <div class="ui-tabs">
        <div class="ui-tabs-header">
            <div class="ui-tabs-header-item" v-for="item in children" track-by="$index"  @click="choose($index)"
                 :class="{ 'ui-tabs-header-current': current == $index + 1 , 'ui-tabs-header-disabled':item.disabled  }">
                <i v-if="item.icon" class="ui-icon ui-icon-{{item.icon}}"></i>{{item.label}}
            </div>
            <div class="ui-tab-buttons">
                <div class="ui-button" v-for="icon in icons" :title="icon.text" @click="action(icon)"><i class="ui-icon ui-icon-{{icon.icon}}"></i></div>
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
            icons: Array,
            current: {
                type: Number,
                default: 1
            }
        },
        data: function () {
            return {
                len: 0,
                children: []
            }
        },
        ready: function () {
            this.len = this.$children.length;
            this.upDateChildren();
            this.$on("tab.update", function () {
                this.upDateChildren();
            })
        },
        methods: {
            upDateChildren: function () {
                this.children = [];
                if(this.$children){
                    this.$children.forEach((tab, index)=> {
                        this.children.push({
                            label: tab.label,
                            disabled: tab.disabled,
                            icon: tab.icon
                        } );
                        if(index == this.current -1){
                            tab.show = true
                        }
                    })
                }
            },
            choose: function (index) {
                this.$children[this.current -1].show = false;
                this.current = index + 1;
                this.$children[index].show = true;
                this.$dispatch("tabs.choose", index);
            },
            action(icon){
                icon.func && icon.func();
            }
        }
    }
</script>
