<template>
    <div class="body-panel">
        <div class="left-panel">
            <ul class="level-1">
                <li :class="{selected: $route.path=='/install' }">
                    <router-link to="/install">安装</router-link>
                </li>
                <li :class="{selected: $route.path=='/play' }">
                    <router-link to="/play">快速上手</router-link>
                </li>
                <li :class="{selected: $route.path=='/i18n' }">
                    <router-link to="/i18n">国际化</router-link>
                </li>
                <li :class="{selected: $route.path=='/log' }">
                    <router-link to="/log">更新日志</router-link>
                </li>
            </ul>
            <h3>组件</h3>
            <ul class="level-2">
                <li :class="{selected: $route.path=='/layout' }">
                    <router-link to="/layout">Layout 栅格</router-link>
                </li>
                <li :class="{selected: $route.path=='/icon' }">
                    <router-link to="/icon">Icon 图标</router-link>
                </li>
                <li :class="{selected: $route.path=='/button' }">
                    <router-link to="/button">Button 按钮</router-link>
                </li>
                <li :class="{selected: $route.path=='/menu' }">
                    <router-link to="/menu">Menu 菜单</router-link>
                </li>
                <li :class="{selected: $route.path=='/dropdown' }">
                    <router-link to="/dropdown">Dropdown 下拉菜单</router-link>
                </li>
                <li :class="{selected: $route.path=='/contextmenu' }">
                    <router-link to="/contextmenu">Contextmenu 右键菜单</router-link>
                </li>
                <li :class="{selected: $route.path=='/tab' }">
                    <router-link to="/tab">Tabs 标签页</router-link>
                </li>
                <li :class="{selected: $route.path=='/table' }">
                    <router-link to="/table">Table 表格</router-link>
                </li>
                <li :class="{selected: $route.path=='/pagination' }">
                    <router-link to="/pagination">Pagination 分页</router-link>
                </li>
                <li :class="{selected: $route.path=='/panel' }">
                    <router-link to="/panel">Panel 面板</router-link>
                </li>
                <li :class="{selected: $route.path=='/tree' }">
                    <router-link to="/tree">Tree 树形控件</router-link>
                </li>
                <li :class="{selected: $route.path=='/step' }">
                    <router-link to="/step">Step 步骤条</router-link>
                </li>
                <li :class="{selected: $route.path=='/processCircle' }">
                    <router-link to="/processCircle">ProcessCircle 进度环</router-link>
                </li>
                <li :class="{selected: $route.path=='/zoom' }">
                    <router-link to="/zoom">Zoom 图片放大镜</router-link>
                </li>
                <li :class="{selected: $route.path=='/carousel' }">
                    <router-link to="/carousel">Carousel 轮播</router-link>
                </li>
                <li :class="{selected: $route.path=='/toast' }">
                    <router-link to="/toast">Toast 全局提示</router-link>
                </li>
                <li :class="{selected: $route.path=='/message' }">
                    <router-link to="/message">Message 对话框</router-link>
                </li>
                <li :class="{selected: $route.path=='/modal' }">
                    <router-link to="/modal">Modal 模态框</router-link>
                </li>
                <li :class="{selected: $route.path=='/tooltip' }">
                    <router-link to="/tooltip">Tooltip 文本提示</router-link>
                </li>
                <li :class="{selected: $route.path=='/loading' }">
                    <router-link to="/loading">Loading 加载中</router-link>
                </li>
                <li :class="{selected: $route.path=='/input' }">
                    <router-link to="/input">Input 输入框</router-link>
                </li>
                <li :class="{selected: $route.path=='/select' }">
                    <router-link to="/select">Select 选择器</router-link>
                </li>
                <li :class="{selected: $route.path=='/radio' }">
                    <router-link to="/radio">Radio 单选</router-link>
                </li>
                <li :class="{selected: $route.path=='/checkbox' }">
                    <router-link to="/checkbox">Checkbox 多选</router-link>
                </li>
                <li :class="{selected: $route.path=='/datePicker' }">
                    <router-link to="/datePicker">DatePicker 日期选择器</router-link>
                </li>
                <li :class="{selected: $route.path=='/switch' }">
                    <router-link to="/switch">Switch 开关</router-link>
                </li>
                <li :class="{selected: $route.path=='/form' }">
                    <router-link to="/form">Form 表单</router-link>
                </li>
                <li :class="{selected: $route.path=='/upload' }">
                    <router-link to="/upload">Upload 上传</router-link>
                </li>
                <li :class="{selected: $route.path=='/affix' }">
                    <router-link to="/affix">Affix 图钉</router-link>
                </li>
                <li :class="{selected: $route.path=='/backtop' }">
                    <router-link to="/backtop">BackTop 回到顶部</router-link>
                </li>
                <li :class="{selected: $route.path=='/draggable' }">
                    <router-link to="/draggable">Draggable 拖拽</router-link>
                </li>
                <li :class="{selected: $route.path=='/split' }">
                    <router-link to="/split">Split 分割面板</router-link>
                </li>
            </ul>
        </div>
        <div class="right-panel">
            <router-view />
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
}
</script>
