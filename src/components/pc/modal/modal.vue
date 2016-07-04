/**
*modal组件 @wanc
*/
<template>
    <div class="modal" v-show="isShow" @scroll="scroll">
        <div class="modal-dialog" transition="zoom" v-show="isShow">
            <div class="modal-content">
                <div class="modal-title">
                    <span>{{title}}</span>
                    <em>{{subTitle}}</em>
                    <i class="fr close" @click="close"></i>
                </div>
                <div class="modal-body">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            isShow: {
                type: Boolean
            },
            title: {
                type: String
            },
            subTitle: {
                type: String
            }
        },
        data: function () {
            var _this = this;
            return {
                timer: 0,
                esc: function (event) {
                    var which = event.which || event.keyCode;
                    if (_this.isShow && which == 27) {
                        _this.isShow = false;
                        _this.$dispatch("close");
                    }
                },
                clickFn: function (event) {
                    if (!$.contains(_this.$el, event.target) && _this.isShow) {
                        _this.isShow = false;
                        _this.$dispatch("close");
                    }
                }
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
            $(window).on("keydown", this.esc);
            //当modal中的内容超出整个屏幕时，modal-dialog用absolute定位不能撑开滚动，导致看不全，需要特殊处理
            this.$nextTick(function () {
                var bodyHeight = $(window).height();
                var $dialog = $(this.$el).find(".modal-dialog");
                var contentHeight = $dialog.height();
                if (contentHeight > bodyHeight - 50) {
                    $dialog.css({
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
        },
        destroyed: function () {
            $(document.body).off("click", this.clickFn);
            $(window).off("keydown", this.esc)
        },
        methods: {
            close: function () {
                this.isShow = false;
                this.$dispatch("close");
            },
            scroll: function (event) {
                if (Vue.util.isIE9) {
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(()=> {
                        this.$el.style.display = "none";
                        this.$el.style.display = "block";
                    }, 100)
                }
            }
        }
    }
</script>
<style lang="scss">
    .modal-open {
        overflow: hidden;
    }

    .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-overflow-scrolling: touch;
        background-color: rgba(0, 0, 0, .2);
        overflow: hidden;
        outline: 0;
        z-index: 100;
    }

    .modal-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%); /* IE 9 */
        -webkit-transform: translate(-50%, -50%); /* Safari and Chrome */
        -o-transform: translate(-50%, -50%); /* Opera */
        -moz-transform: translate(-50%, -50%); /* Firefox */

        background-color: #ffffff;
        background-clip: padding-box;
        border: 1px solid #d7d7d7;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, .35);
        padding: 20px 30px;
        overflow: hidden;
    }

    .modal-title {
        width: 100%;
        border-bottom: 1px solid #d7d7d7;
        position: relative;
        span {
            display: inline-block;
            color: #333333;
            font-size: 18px;
            padding: 10px 0;
            border-bottom: 2px solid #4b9bff;
        }
        em {
            margin-left: 20px;
            color: #a8a8a8;
        }
        .close {
            float: right;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNjdCM0M5NDA1M0UxMUU2QUQxM0E2REYyQTVDOTlEMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNjdCM0M5NTA1M0UxMUU2QUQxM0E2REYyQTVDOTlEMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2N0IzQzkyMDUzRTExRTZBRDEzQTZERjJBNUM5OUQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2N0IzQzkzMDUzRTExRTZBRDEzQTZERjJBNUM5OUQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kzhvvgAAAQFJREFUeNp00D9LQmEUx/HrVRsUnGoRhHARwRegGEEFgYqCgiD4DnTW3cVFl6hXkJQQDkFUg4P/UJc7FhFEa5BTEm2W3wNHuFzywudyuc/vnPNwXJZluQzDqKKDL2P7s4elyauGczwisCUcwkQyUnCBMRK4h98RDut5BK9S8IMMpjjAA3wajmrnfbRRMfXgG2nMcYg7JDFEEA29+p/HNnqJFPo4xpH+r6O1CZmO+8qWmvot23vGmT3gLJAJ11jhHTH0sPNfQQG3cKOEOJ6QRRdee0EZN9o5r10XOMGLNruSZh4NX+p6cxjYpn5qkWyriF+ZMMIMp47w5vnQojfsrgUYACStNmiYaSnpAAAAAElFTkSuQmCC");
            width: 12px;
            height: 12px;
            margin-top: 13px;
            cursor: pointer;
        }
    }

    .modal-body {
        position: relative;
        padding: 30px 0 10px;
    }
</style>
