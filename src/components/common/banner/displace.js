export default {
	bind: function () {
	    // 准备工作
	    // 例如，添加事件处理器或只需要运行一次的高耗任务
    	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  	},
	update: function (newValue, oldValue) {
		// 值更新时的工作
		// 也会以初始值为参数调用一次
		window.requestAnimationFrame(()=>{
            this.el.style.transform = "translate3d("+ newValue + "px, 0, 0)";
            this.el.style["-webkit-transform"] = "translate3d("+ newValue + "px, 0, 0)";
        })
	},
	unbind: function () {
		// 清理工作
		// 例如，删除 bind() 添加的事件监听器
	}
}