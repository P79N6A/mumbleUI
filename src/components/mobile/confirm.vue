<style lang="sass" scoped>
    .animated {
        animation-duration: .3s;
        animation-fill-mode: both;
    }
</style>
<template>
    <div transition="zoom" class="modal-box animated">
        <div class="modal-cover"></div>
        <div class="modal-flex">
            <div class="modal-con">
                {{{content}}}
                <div class="modal-btn">
                    <div class="item" @click="cancel">
                        {{cancelText}}
                    </div>
                    <div class="item" @click="sure">
                        {{sureText}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            option : {
                type : Object
            },
            content : {
                default : "我就是我，不一样的烟火"
            },
            sureText: {
                default: '确定'
            },
            cancelText: {
                default: '取消'
            }
        },
        data () {
            return {
                content : (this.option.content !== undefined) ? this.option.content  : this.content,
                sureText : (this.option.sureText !== undefined) ? this.option.sureText  : this.sureText,
                cancelText : (this.option.cancelText !== undefined) ? this.option.cancelText  : this.cancelText
            }
        },
        methods: {
            cancel () {
                this.option.isShow = false;
                this.$dispatch('cancel', this.$data);
            },
            sure () {
                this.option.isShow = false;
                this.$dispatch('sure', this.$data);
            }
        }
    }
</script>