import Vue from "vue";
import Tooltip from "./tooltip.vue";
import * as util from "../../util.js";

var triggerMap = {
    mouseenter: ["mouseenter", "mouseleave"],
    click: ["click", "click"],
    focus: ["focus", "blur"],
    outsideClick: ["click", "outsideClick"]
};

function triggerBind(e) {
    if(!this.tooltipComponent) return;
    this.tooltipComponent.show = !this.tooltipComponent.show;
}

function showTooltipBind() {
    if(!this.tooltipComponent) return;
    this.tooltipComponent.show = true;
}

function hideTooltipBind() {
    if(!this.tooltipComponent) return;
    this.tooltipComponent.show = false;
}

function bodyHideTooltipBind(e) {
    if(!this.tooltipComponent) return;
    if (this.el != e.target && this.tooltipComponent.$el != e.target
        && !util.contains(this.el, e.target) && !util.contains(this.tooltipComponent.$el, e.target)){
        this.tooltipComponent.show = false;
    }
}

function create(parent, option){
    var tooltipComponent = new Vue({
        replace: false,
        data: function () {
            var defaultOption = {
                show: false,
                direction: "bottom",
                text: "",
                styleObject: {}
            };
            return util.extend(defaultOption, option || {})
        },
        components: {
            Tooltip: Tooltip
        },
        template: '<tooltip v-show="show" :direction="direction" :text="text" :style-object="styleObject"></tooltip>',
        ready: function () {
        },
        methods:{
        }
    });
    tooltipComponent.$mount().$appendTo(parent.el.parentNode);
    return tooltipComponent;
}



export  default {
    params: ["tooltipOption"],
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        var $dom = this.el;
        this.params.tooltipOption = this.params.tooltipOption || {};
        this.params.tooltipOption.direction = this.params.tooltipOption.direction || "bottom";
        this.params.tooltipOption.trigger = this.params.tooltipOption.trigger || "mouseenter";
        if(this.expression){
            this.params.tooltipOption.text = "" + this.expression;
        }
        //如果input不是相对定位
        this.vm.$nextTick(()=> {
            this.params.tooltipOption.styleObject = util.getPositionWhenAfterBorther($dom, this.params.tooltipOption.direction, 0, 0);
            this.tooltipComponent = create(this, this.params.tooltipOption);
        });

        var show = triggerMap[this.params.tooltipOption.trigger][0];
        var hide = triggerMap[this.params.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            $dom.addEventListener('click', triggerBind.bind(this), false);
            document.addEventListener('click', bodyHideTooltipBind.bind(this), false);
        } else if (show === hide) {
            $dom.addEventListener(show, triggerBind.bind(this), false);
        } else{
            $dom.addEventListener(show, showTooltipBind.bind(this), false);
            $dom.addEventListener(hide, hideTooltipBind.bind(this), false);
        }
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        var show = triggerMap[this.params.tooltipOption.trigger][0];
        var hide = triggerMap[this.params.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            this.el.removeEventListener('click', triggerBind.bind(this));
            document.removeEventListener('click', bodyHideTooltipBind.bind(this));
        } else if (show === hide) {
            this.el.removeEventListener(show, triggerBind.bind(this));
        } else{
            this.el.removeEventListener(show, showTooltipBind.bind(this));
            this.el.removeEventListener(hide, hideTooltipBind.bind(this));
        }
        //
        // this.el.removeEventListener(triggerMap[this.params.tooltipOption.trigger][0], trigger.bind(this));
        // this.el.removeEventListener(triggerMap[this.params.tooltipOption.trigger][1], trigger.bind(this));
    }
}
