const inBrowser =
    typeof window !== 'undefined' &&
    Object.prototype.toString.call(window) !== '[object Object]'
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isIE = UA && UA.indexOf('trident') > 0
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isAndroid = UA && UA.indexOf('android') > 0
const isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA)
const iosVersionMatch = isIos && UA.match(/os ([\d_]+)/)
const iosVersion = iosVersionMatch && iosVersionMatch[1].split('_')

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */
export function getClass(el) {
    var classname = el.className
    if (typeof classname === 'object') {
        classname = classname.baseVal || ''
    }
    return classname
}

/**
 * 判断dom节点是否有某样式
 *
 * @param {Element} el
 * @return {String}
 * @returns {boolean}
 */
export function hasClass(el, name) {
    if (!el) return;
    var className = getClass(el);
    var classes = className.split(" ");
    return classes.indexOf(name) != -1
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */
export function setClass(el, cls) {
    /* istanbul ignore if */
    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
        el.className = cls
    } else {
        el.setAttribute('class', cls)
    }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function addClass(el, cls) {
    if (el.classList) {
        el.classList.add(cls)
    } else {
        var cur = ' ' + getClass(el) + ' '
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            setClass(el, (cur + cls).trim())
        }
    }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function removeClass(el, cls) {
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        var cur = ' ' + getClass(el) + ' '
        var tar = ' ' + cls + ' '
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ')
        }
        setClass(el, cur.trim())
    }
    if (!el.className) {
        el.removeAttribute('class')
    }
}

/**
 * 从jquery扣过来的，递归去算
 *
 * @param {Element} a
 * @param {Element} b
 * @returns {boolean}
 */
export function contains(a, b) {
    var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
    return a === bup || !!( bup && bup.nodeType === 1 && adown.contains(bup) );
}

export function merge() {
    var base = arguments[0];
    if(!base) return;
    [].forEach.call(arguments, function (item, index) {
        if (index > 0) {
            for (var attrname in item) {
                base[attrname] = item[attrname];
            }
        }
    });
    return base;
}

export function extend() {
    var base = arguments[0];
    if(!base) return;
    [].forEach.call(arguments, function (item, index) {
        if (index > 0) {
            for (var attrname in item) {
                if(base[attrname] !== undefined){
                    base[attrname] = item[attrname];
                }
            }
        }
    });
    return base;
}

export function isNumber(value) {return typeof value === 'number';}

export function isDate(value) {
    return toString.call(value) === '[object Date]';
}

export function isFunction(value) {return typeof value === 'function';}

export function isObject(value) {
    return value !== null && typeof value === 'object';
}

export function getPositionWhenAfterBorther(brotherEle, direction, displacementX, displacementY) {
    let offset = {
        left: 0,
        top: 0,
        position: null,
    };
    displacementX = displacementX || 0;
    displacementY = displacementY || 0;
    direction = direction || "bottom";

    var style =  window.getComputedStyle(brotherEle, null);
    var rect = brotherEle.getBoundingClientRect();
    var height = rect.height || (rect.bottom - rect.top);
    var width = rect.width || (rect.right - rect.left);
    if(style.position == "fixed" || style.position == "absolute"){
        offset.position = style.position;
        offset.left = Number(/^([0-9]*)/.exec(style.left)[0]) + displacementX;
        offset.top =  Number(/^([0-9]*)/.exec(style.top)[0]) + displacementY;
    }else{
        offset.position = "absolute";
        //如果target元素不在任何相对定位下，则直接计算离屏幕的高度
        if(!brotherEle.offsetParent){
            offset.left = rect.left + document.documentElement.scrollLeft + displacementX;
            offset.top =  rect.top + document.documentElement.scrollTop + displacementY;
        }else{
            // offsetTop和offsetLeft表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离
            offset.left = brotherEle.offsetLeft + displacementX;
            offset.top =  brotherEle.offsetTop  + displacementY;
        }
    }

    switch (direction) {
        case 'top':
            offset.top = offset.top;
            break;
        case 'bottom':
            offset.top = offset.top + height;
            break;
        case 'left':
            offset.top = offset.top + height/2;
            offset.left = offset.left;
            break;
        case 'right':
            offset.top = offset.top + height/2;
            offset.left = offset.left + width;
            break;
    }

    offset.left += "px";
    offset.top += "px";

    return offset
}
