import * as util from "../utils/util.js";
export default {
    params: ['model'],
    paramWatchers: {
        "model": function () {
            this.el.style.overflow = "hidden";
            this.vm.$nextTick(()=> {
                this.handler();
                this.el.style.overflow = "auto";
            });
        }
    },
    bind: function() {
        var el = this.el;
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        this.handler = (e)=> {
            var config;
            if(util.isObject(this.config) &&  this.config.min && this.config.max){
                config = this.config
            }
            else if(this.config === true){
                config = { min: 2, max: 1000000}
            }else{
                return
            }
            var style = window.getComputedStyle(el, null);
            var paddingTop = Number(/^([0-9]*)/.exec(style.paddingTop)[0]);
            var paddingBottom = Number(/^([0-9]*)/.exec(style.paddingBottom)[0]);
            var baseLineHeight = Number(/^([0-9]*)/.exec(style.lineHeight)[0]);
            var borderWidth = Number(/^([0-9]*)/.exec(style.borderBottomWidth)[0]) + Number(/^([0-9]*)/.exec(style.borderTopWidth)[0]);
            var po = paddingTop + paddingBottom;
            var baseHeight = baseLineHeight * config.min;
            el.style.height = baseHeight + po + borderWidth + "px";
            var scrollVal = el.scrollHeight;
            if (scrollVal - po >= baseLineHeight * config.max) {
                scrollVal = baseLineHeight * config.max + po;
            }
            el.style.height = scrollVal + borderWidth + "px";
        };
        this.keydown = function () {
            //很重要，不然当设置height是一行高时，scrollHeight计算时因为滚动条导致多算一行
            el.style.overflow = "hidden";
        };
        this.keyup = function () {
            el.style.overflow = "auto";
        };
        el.addEventListener('input', this.handler, false);
        el.addEventListener('keydown', this.keydown, false);
        el.addEventListener('keyup', this.keyup, false);
        var self = this;
        this.vm.$nextTick(function () {
            self.handler();
        });
    },
    update: function(newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        this.config = newValue;
        this.handler();
    },
    unbind: function() {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        this.el.removeEventListener('input',  this.handler);
        this.el.removeEventListener('keydown',  this.keydown);
        this.el.removeEventListener('keyup',  this.keyup);
    }
}
