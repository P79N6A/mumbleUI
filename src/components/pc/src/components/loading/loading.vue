<template>
    <div class="ui-loading" v-show="show">
        <div class="ui-loading-clip" :style="clipStyle"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            color: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: '35px'
            },
            borderWidth:{
                type: String,
                default: "2px"
            },
            show:{
                type: Boolean,
                default: false
            }
        },
        computed: {
            clipStyle: function () {
                var style = {
                    height: this.size,
                    width: this.size,
                    borderWidth: this.borderWidth,
                    borderStyle: 'solid',
                    background: 'transparent'
                };
                if(this.color){
                    style.borderColor = this.color + ' ' + this.color + ' transparent';
                }
                return style
            }
        }
    }
</script>
