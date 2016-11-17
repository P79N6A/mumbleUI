<template>
    <div class="loading" v-show="hide">
        <div class="loading-clip" :style="clipStyle"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            color: {
                type: String,
                default: '#5dc596'
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
                return {
                    height: this.size,
                    width: this.size,
                    borderWidth: this.borderWidth,
                    borderStyle: 'solid',
                    borderColor: this.color + ' ' + this.color + ' transparent',
                    background: 'transparent'
                }
            }
        }
    }
</script>
<style src="./loading.scss" lang="scss"></style>
