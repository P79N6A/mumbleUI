<template>
    <div class="modal" v-show="isShow" @scroll="scroll">
        <div class="modal-dialog">
            <div class="modal-title">
                <span>{{title}}</span>
                <em>{{subTitle}}</em>
                <i class="close" @click="close"></i>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import * as util from "../../util.js";
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
                var body = document.body;
                if (this.isShow) {
                    //必须这样，要不然，这个点击事件会触发
                    setTimeout(() => {
                        body.addEventListener("click", this.clickFn, false)
                    }, 0)
                    util.addClass(body, "modal-open");
                } else {
                    util.removeClass(body, "modal-open");
                    body.removeEventListener("click", this.clickFn)
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
                    var bodyHeight = window.innerHeight;
                    var dialogElem = this.$el.querySelector(".modal-dialog");
                    var dialogElemStyle = window.getComputedStyle(dialogElem, null);
                    var height = /^([0-9]*)/.exec(dialogElemStyle.height)[0];
                    var width = /^([0-9]*)/.exec(dialogElemStyle.width)[0];
                    if (height > bodyHeight - 50) {
                        dialogElem.style.width = width + 'px';
                        dialogElem.style.position = "relative";
                        dialogElem.style.margin = "25px auto";
                        dialogElem.style.left = "0";
                        dialogElem.style.top = "0";
                        dialogElem.style.transform = "translate(0, 0)";
                        dialogElem.style["-ms-transform"] = "translate(0, 0)";
                        dialogElem.style["-webkit-transform"] = "translate(0, 0)";
                        dialogElem.style["-o-transform"] = "translate(0, 0)";
                        dialogElem.style["-moz-transform"] = "translate(0, 0)";
                    }
                })
            })
            //监听esc
            document.addEventListener("keydown", this.esc, false);

        },
        destroyed: function () {
            body.removeEventListener("click", this.clickFn)
            document.removeEventListener("keydown", this.esc)
        },
        methods: {
            esc: function (event) {
                var which = event.which || event.keyCode;
                if (this.isShow && which == 27) {
                    this.close();
                }
            },
            clickFn: function (event) {
                if (!util.contains(this.$el, event.target) && this.isShow) {
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
