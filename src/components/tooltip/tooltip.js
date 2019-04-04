import Vue from 'vue';
import Tooltip from './tooltip.vue';
import * as util from '../../utils/util.js';

let cache = {};

let triggerMap = {
    mouseenter: ['mouseenter', 'mouseleave'],
    click: ['click', 'click'],
    focus: ['focus', 'blur'],
    outsideClick: ['click', 'outsideClick']
};

let create = function (parent, option) {
    var tooltipComponent = new Vue({
        name: 'TooltipDirective',
        components: {
            Tooltip: Tooltip
        },
        data: function () {
            var defaultOption = {
                show: false,
                direction: 'bottom',
                align: 'center',
                styleObject: {},
                text: '',
                html: '',
                confirm: false,
                component: null
            };
            return util.extend(defaultOption, option || {})
        },
        created: function () {
            this.$on('tooltip.ok', this.ok);
            this.$on('tooltip.cancel', this.cancel);
            this.$on('tooltip.mouseenter', this.mouseenter);
            this.$on('tooltip.mouseleave', this.mouseleave);
        },
        beforeDestroy: function () {
            this.$off('tooltip.ok');
            this.$off('tooltip.cancel');
            this.$off('tooltip.mouseenter');
            this.$off('tooltip.mouseleave');
        },
        methods: {
            mouseenter: function () {
                this.show = true;
            },
            mouseleave: function () {
                this.show = false;
            },
            ok: function () {
                option.onOk && option.onOk.call(parent.vm);
            },
            cancel: function () {
                option.onCancel && option.onCancel.call(parent.vm);
            }
        },
        template: '<tooltip v-show="show" :direction="direction" :align="align" :text="text" :html="html" :component="component" :confirm="confirm" :style-object="styleObject" transition="fade"></tooltip>'
    });
    var component = tooltipComponent.$mount();
    if (parent.el.parentNode) {
        parent.el.parentNode.appendChild(component.$el);
    } else {
        parent.el.appendChild(component.$el);
    }
    return tooltipComponent;
};

export default {
    inserted: function (el, binding) {
        // 指令插入节点后执行
        // 准备工作
        let self = {
            el: el
        };
        cache[el] = self;
        if ( util.typeOf(binding.value) == 'string') {
            self.tooltipOption = {
                text: binding.value
            }
        } else if ( util.typeOf(binding.value) == 'object') {
            self.tooltipOption = binding.value
        } else {
            return console.warn('请正确使用tooltip组件！');
        }
        
        // 默认是bottom
        if (!self.tooltipOption.direction) {
            self.tooltipOption.direction = 'bottom';
        }
        if (!self.tooltipOption.align) {
            self.tooltipOption.align = 'center';
        }
        self.tooltipOption.trigger = self.tooltipOption.trigger || 'mouseenter';

        self.triggerBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = !self.tooltipComponent.show;
        };

        self.showTooltipBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = true;
        };

        self.hideTooltipBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = false;
        };

        self.bodyHideTooltipBind = (e) => {
            if (!self.tooltipComponent) return;
            if (self.el != e.target && self.tooltipComponent.$el != e.target &&
                !util.contains(self.el, e.target) && !util.contains(self.tooltipComponent.$el, e.target)) {
                self.tooltipComponent.show = false;
            }
        };

        var show = triggerMap[self.tooltipOption.trigger][0];
        var hide = triggerMap[self.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            el.addEventListener('click', self.triggerBind, false);
            document.addEventListener('click', self.bodyHideTooltipBind, false);
        } else if (show === hide) {
            el.addEventListener(show, self.triggerBind, false);
        } else {
            el.addEventListener(show, self.showTooltipBind, false);
            el.addEventListener(hide, self.hideTooltipBind, false);
        }

        // 根据父节点计算指令的位置
        self.tooltipOption.styleObject = util.getPositionWhenAfterBorther(el, self.tooltipOption.direction, self.tooltipOption.align);
        self.tooltipComponent = create(self, self.tooltipOption);
    },
    unbind: function (el) {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        let self = cache[el];
        var show = triggerMap[self.tooltipOption.trigger][0];
        var hide = triggerMap[self.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            el.removeEventListener('click', self.triggerBind);
            document.removeEventListener('click', self.bodyHideTooltipBind);
        } else if (show === hide) {
            el.removeEventListener(show, self.triggerBind);
        } else {
            el.removeEventListener(show, self.showTooltipBind);
            el.removeEventListener(hide, self.hideTooltipBind);
        }
    }
}