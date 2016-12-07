<template>
    <div class="ui-steps" :class="{'ui-steps-small' : size=='small' , 'ui-steps-vertical': direction=='vertical'  }">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            current: {
                type: Number,
                required: true
            },
            size: {
                type: String
            },
            direction: {
                type: String
            },
        },
        data: function () {
            return {
                len: 0,
                sonWidth: ""
            }
        },
        watch: {
            "current": function () {
                this.upDateChildren();
            }
        },
        ready: function () {
            this.len = this.$children.length;
            this.sonWidth = 100/this.len + "%";
            if(this.direction == "vertical"){
                this.sonWidth = "100%";
            }
            console.log(this.sonWidth);
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
