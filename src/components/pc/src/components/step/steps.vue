<template>
    <div class="ui-steps">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            current: {
                type: Number,
                required: true
            }
        },
        data: function () {
            return {
                len: 0
            }
        },
        watch: {
            "current": function () {
                this.upDateChildren();
            }
        },
        ready: function () {
            this.len = this.$children.length;
            this.upDateChildren();
        },
        methods: {
            upDateChildren: function () {
                var _this = this;
                if(this.$children){
                    this.$children.forEach(function (step, index) {
                        step.index = index + 1;
                        if(step.index > _this.current){
                            step.status = "ready"
                        }else if(step.index == _this.current){
                            step.status = "doing"
                        }else{
                            step.status = "done"
                        }
                    })
                }
            }
        }
    }
</script>
