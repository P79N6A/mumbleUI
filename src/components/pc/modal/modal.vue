<template>
    <div class="modal" v-show="isShow" @scroll="scroll">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-title">
                    <span>{{title}}</span>
                    <em>{{subTitle}}</em>
                    <i class="fr close" @click="close"></i>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import $ from "jquery"
    export default {
        props: {
            id: {
                type: String
            },
            title: {
                type: String,
                required: true
            },
            subTitle: {
                type: String
            }
        },
        data: function () {
            return {
                isShow: false
            }
        },
        watch: {
            "isShow": function () {
                var $body = $(document.body);
                if (this.isShow) {
                    if (!$body.hasClass("modal-open")) {
                        $body.addClass("modal-open");
                        //必须这样，要不然，这个点击事件会触发
                        setTimeout(() => {
                            $body.on("click", this.clickFn);
                        }, 0)
                    }
                } else {
                    $body.removeClass("modal-open")
                    $body.off("click", this.clickFn)
                }
            }
        },
        ready: function () {
            //监听show事件
            this.$on("modal.show", function(id){
                if(this.id){
                    if(this.id == id){
                        this.isShow = true;
                    }
                }else{
                    this.isShow = true;
                }
                //当modal中的内容超出整个屏幕时，modal-dialog用absolute定位不能撑开滚动，导致看不全，需要特殊处理
                this.$nextTick(function () {
                    var bodyHeight = $(window).height();
                    var $dialog = $(this.$el).find(".modal-dialog");
                    var contentHeight = $dialog.height();
                    var width = $dialog.width();
                    if (contentHeight > bodyHeight - 50) {
                        $dialog.css({
                            "width": width,
                            "position": "relative",
                            "margin": "25px auto",
                            "left": 0,
                            "top": 0,
                            "transform": "translate(0, 0)",
                            "-ms-transform": "translate(0, 0)", /* IE 9 */
                            "-webkit-transform": "translate(0, 0)", /* Safari and Chrome */
                            "-o-transform": "translate(0, 0)", /* Opera */
                            "-moz-transform": "translate(0, 0)" /* Firefox */
                        })
                    }
                })
            })
            //监听esc
            $(window).on("keydown", this.esc);
            
        },
        destroyed: function () {
            $(document.body).off("click", this.clickFn);
            $(window).off("keydown", this.esc)
        },
        methods: {
            esc: function (event) {
                var which = event.which || event.keyCode;
                if (this.isShow && which == 27) {
                    this.close();
                }
            },
            clickFn: function (event) {
                if (!$.contains(this.$el, event.target) && this.isShow) {
                    this.close();
                }
            },
            close: function () {
                this.isShow = false;
                this.$dispatch("modal.close");
            },
            scroll: function (event) {
                this.$dispatch("modal.scroll", event);
            }
        }
    }
</script>
<style src="./modal.scss" lang="scss"></style>
