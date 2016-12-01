/**
 * Created by Administrator on 2016/8/28.
 */
import Vue from "vue";
import file from "./file.vue";

function create(parent, option){
    var fileComponent = new Vue({
        data: function () {
            return option || {}
        },
        components: {
            fileEle: file
        },
        template: '<div><file-ele :api="api" :accept="accept" :multiple="multiple" :max-size="maxSize" ' +
            '@upload.success="success" @upload.faild="fail"></file-ele></div>',
        ready: function () {
            //设置当前组件的爸爸是业务vm，要不然事件链路是传不上去的
            this.$parent = parent.vm;
        },
        methods:{
            success: function (data) {
                this.$dispatch("upload.success", data)
            },
            fail: function (data) {
                this.$dispatch("upload.fail", data)
            }
        }
    });
    fileComponent.$mount().$appendTo(parent.el.parentNode);
    return fileComponent;
}

function showPicker(){
    this.datePickerComponent.$el.firstChild.click();
}

export  default {
    params: ["uploadOption"],
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        var $dom = this.el;
        //如果input不是相对定位
        this.vm.$nextTick(()=> {
            this.datePickerComponent = create(this, this.params.uploadOption);
            $dom.addEventListener("click", showPicker.bind(this), false)
        });
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        this.el.removeEventListener("click", showPicker.bind(this))
    }
}
