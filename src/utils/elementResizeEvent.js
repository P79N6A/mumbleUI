var requestFrame = (function () {
    var raf = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function fallbackRAF(func) {
          return window.setTimeout(func, 20)
      }
    return function requestFrameFunction(func) {
        return raf(func)
    }
})()
  
var cancelFrame = (function () {
    var cancel = window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.clearTimeout
    return function cancelFrameFunction(id) {
        return cancel(id)
    }
})()
  
function resizeListener(e) {
    var win = e.target || e.srcElement
    if (win.__resizeRAF__) {
        cancelFrame(win.__resizeRAF__)
    }
    win.__resizeRAF__ = requestFrame(function () {
        var trigger = win.__resizeTrigger__
        var listeners = trigger && trigger.__resizeListeners__
        if (listeners) {
            listeners.forEach(function (fn) {
                fn.call(trigger, e)
            })
        }
    })
}
  
var exports = function exports(element, fn) {
    var document = window.document;
    var attachEvent = document.attachEvent;
    function objectLoad() {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
        this.contentDocument.defaultView.addEventListener('resize', resizeListener)
    }
  
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = []
        if (attachEvent) {
            element.__resizeTrigger__ = element
            element.attachEvent('onresize', resizeListener)
        } else {
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative'
            }
            var obj = (element.__resizeTrigger__ = document.createElement('object'))
            obj.setAttribute(
                'style',
                'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;'
            )
            obj.setAttribute('class', 'resize-sensor')
            obj.__resizeElement__ = element
            obj.onload = objectLoad
            obj.type = 'text/html'
            obj.data = 'about:blank'
            element.appendChild(obj)
        }
    }
    element.__resizeListeners__.push(fn)
}
  
module.exports = typeof window === 'undefined' ? exports : exports.bind(window)
  
module.exports.unbind = function (element, fn) {
    var attachEvent = document.attachEvent
    var listeners = element.__resizeListeners__ || []
    if (fn) {
        var index = listeners.indexOf(fn)
        if (index !== -1) {
            listeners.splice(index, 1)
        }
    } else {
        listeners = element.__resizeListeners__ = []
    }
    if (!listeners.length) {
        if (attachEvent) {
            element.detachEvent('onresize', resizeListener)
        } else if (element.__resizeTrigger__) {
            if (element.__resizeTrigger__.contentDocument) {
                element.__resizeTrigger__.contentDocument.defaultView.removeEventListener(
                    'resize',
                    resizeListener
                )
                delete element.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__
            }
            element.__resizeTrigger__ = !element.removeChild(
                element.__resizeTrigger__
            )
        }
        delete element.__resizeListeners__
    }
}