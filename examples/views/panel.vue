<template>
    <Row class="panel">
        <Cell class="son-panel" span="12" ref="left">
            <slot name="template"></slot>
        </Cell>
        <div class="panel-split">
        </div>
        <Cell class="son-panel" span="12" :style="{'height': height, 'overflow': 'hidden'} ">
            <div class="code" ref="code">
                <slot name="code"></slot>
            </div>
        </Cell>
        <div class="more" v-show="status=='down'">
            <a href="javascript:void 0" @click="down"><Icon type="arrow-down"></Icon>下拉展示更多code</a>
        </div>
        <div class="more" v-show="status=='up'">
            <a href="javascript:void 0" @click="up"><Icon type="arrow-up"></Icon>上拉收起</a>
        </div>
    </Row>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function() {
            return {
                status: "down",
                height: 0,
                leftHeight: 0,
                codeHeight: 0
            }
        },
        mounted: function(){
            this.$nextTick(function(){
                this.leftHeight = this.$refs.left.$el.clientHeight;
                this.codeHeight = this.$refs.code.clientHeight;
                this.height = this.leftHeight + 'px';
                if(this.codeHeight < this.leftHeight){
                    this.status = ""
                }
            })
        },
        methods: {
            down(){
                this.height = this.codeHeight + 'px';
                this.status = 'up';
            },
            up(){
                this.height = this.leftHeight + 'px';
                this.status = 'down';
            }
        }
    }
</script>
