<template>
    <div class="article">
        <h3>2019.3.13  ui-webank 2.3.15</h3>
        <ul>
            <li>1、Checkbox、Radio、Select、Button、Switch支持使用键盘操作</li>
            <li>2、规范Form组件callback的参数：第一个为是否校验通过，第二个为错误结果。validateField是错误结果list。validate是[错误结果list]</li>
            <li>3、选中Table组件一行或者点击全选按钮时抛出事件</li>
            <li>4、修复Tree组件的bug：选中边缘时会触发两次clickCheckBox，然后怎么也选不上。</li>
            <li>5、重新规划focus和hover的交互，两者有个区分。focus会有蓝色的外阴影。hover会改变border颜色或者改变字体颜色。</li>
            <li>6、Modal组件点击蒙层只关闭自己。</li>
        </ul>

        <h3>2019.1.15  ui-webank 2.3.11</h3>
        <ul>
            <li>1、修复Select组件在高性能模式下，异步获取option数据后不能正确渲染选中效果和显示已经选择的值的bug</li>
            <li>2、修复Select组件在limit控制时，如果达到限制最大值，不能取消选择的bug</li>
            <li>3、Select组件,使用on-search查询数据更新option之后，如果已经选的选项没了，则选择的值也会没了</li>
        </ul>

        <h3>2019.1.9  ui-webank 2.3.10</h3>
        <ul>
            <li>1. Select组件支持高性能配置，使用options属性</li>
            <li>2. Select多选支持可以限制个数</li>
            <li>3. 优化Pagination组件，去掉内部a标签</li>
            <li>4. Pagination组件支持配置分页的pageSizeList</li>
        </ul>

        <h3>2018.12.20  ui-webank 2.3.6</h3>
        <ul>
            <li>1. 支持国际化</li>
        </ul>

        <h3>2018.11.20  ui-webank 2.3.5</h3>
        <ul>
            <li>1. 修复Select组件设置了disable时 x 还是可以点击并且删掉数据</li>
            <li>2. 优化disabeld和readonly在数据录入组件（input、checkbox、radio、select、datepicker）体验的一致性。</li>
            <li>3. Button组件的disabeld根据传参动态变化，随时控制组件是否disabeld</li>
        </ul>

        <h3>2018.11.20  ui-webank 2.3.3</h3>
        <ul>
            <li>1. WbInputdatapicker添加清除按钮</li>
            <li>2. Select组件，输入过滤条件时，抛出on-search事件；修复opiton组件在updated时计算currentLabel的bug，不会拿到最新的值。</li>
            <li>3. Table的内容为空时，配置no-data-text则提示</li>
            <li>4. Button支持disabled属性</li>
            <li>5. Input组件添加clearable属性，若配置则会添加清除按钮</li>
        </ul>

        <h3>2018.10.31  ui-webank 2.3.0</h3>
        <ul>
            <li>1. 支持按需加载</li>
            <li>2. 添加Split面板分割组件</li>
            <li>3. Table的头部支持自定义组件</li>
            <li>4. Tabs组件增加可拖拽功能，增加可删除、可拖拽配置，优化滚动等</li>
            <li>5. Step组件支持自定义内容slot</li>
        </ul>

        <h3>2018.9.10  ui-webank 2.2.34</h3>
        <ul>
            <li>1. 打开或者关闭table的expand时，触发事件出来</li>
        </ul>

        <h3>2018.8.23  ui-webank 2.2.29</h3>
        <ul>
            <li>1. table组件的列支持v-if</li>
        </ul>

        <h3>2018.8.21  ui-webank 2.2.28</h3>
        <ul>
            <li>1. 修复form中type=password校验规则失效的bug</li>
            <li>2. 修复routeMenu组件导致hash中query丢失的bug</li>
        </ul>

        <h3>2018.8.10  ui-webank 2.2.26</h3>
        <ul>
            <li>1. tabs组件增加可拖拽功能，增加可删除、可拖拽配置，优化滚动等</li>
            <li>2. 修复routeMenu组件导致hash中query丢失的bug</li>
        </ul>

        <h3>2018.7.24  ui-webank 2.2.24</h3>
        <ul>
            <li>1. step支持自定义内容slot</li>
        </ul>

        <h3>2018.7.19  ui-webank 2.2.23</h3>
        <ul>
            <li>1. 修复upload组件选择文件之后，选择同文件不触发事件的bug</li>
        </ul>

        <h3>2018.7.13  ui-webank 2.2.21</h3>
        <ul>
            <li>1. contextMenu增加参数click-no-close 左键点击元素自身是否关闭菜单</li>
        </ul>

        <h3>2018.6.22  ui-webank 2.2.18</h3>
        <ul>
            <li>1. modal的内容高度发生变化时，可以自动切换到scroll模式</li>
            <li>1. table添加trClass可以给行添加自定义的class</li>
        </ul>

        <h3>2018.5.29</h3>
        <ul>
            <li>1. Input支持accept属性、autocomplete属性、name属性</li>
            <li>2. Modal增加 closeOnClickShadow</li>
            <li>3. 增加contextmenu右键菜单组件</li>
            <li>4. Tree组件添加自定义节点的功能</li>
            <li>5. Tree组件提供addNode和removeNode方法</li>
        </ul>

        <h3>2018.5.10   ui-webank 2.2.0</h3>
        <ul>
            <li style="color:red">Toast组件Api更新，改为Toast(title, option)</li>
            <li style="color:red">Upload去掉了arg参数</li>
            <li>1. 支持引入单个组件</li>
            <li>2. 增加了拖拽组件Draggable</li>
            <li>3. Toast组件增加align配置，可以配置显示在屏幕头部</li>
            <li>4. Tree组件增加动态加载数据功能</li>
            <li>5. Menu组件增加水平模式</li>
            <li>6. 修复tabs的双向绑定功能</li>
            <li>7. Table组件的action和component的this指向当前向当前作用域</li>
            <li>8. Upload组件增加自主实现提交请求功能</li>
            <li>9. Switch组件不再固定宽度，可根据内容自动伸缩</li>
            <li>10. 优化组件实现，增加性能</li>
        </ul>
        <h3>2017.8.24  ui-webank 2.0.0</h3>
        <ul>
            <li>1. 升级为Vue 2.0</li>
            <li>2. 增加Dropdown下拉菜单、Panel 面板、Process-circle 进度环、Carousel 轮播、Affix 图钉、BackTop 回到顶部等组件</li>
            <li>3. table增加多选行、展开行功能</li>
            <li>4. vue2.0中key不能作为属性，原用key的地方都做了调整</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
            }
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
<style scope>
    h3{
        margin-top: 20px;
        color: #000;
    }
</style>

