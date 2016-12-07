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
            "current": function (value) {
                if(this.$children){
                    var _this = _this;
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
        },
        ready: function () {
            var _this = this;
            var childrens = this.$children;
            this.len = childrens.length;
            childrens.forEach(function (step, index) {
                step.index = index + 1;
                if(step.index > _this.current){
                    step.status = "ready"
                }else if(step.index == _this.current){
                    step.status = "doing"
                }else{
                    step.status = "done"
                }
            })
        },
        methods: {}
    }
</script>
