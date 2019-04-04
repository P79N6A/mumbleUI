```html
<template>
    <Wb-menu :active-name.sync="activeName" :auto-close="true" :type="type" :width="180" @select="selectMenu">
        <Wb-menu-item name="1">我的菜单</Wb-menu-item>
        <Wb-menu-item name="2">个人信息</Wb-menu-item>
        <Wb-menu-item name="3">我的管理</Wb-menu-item>
        <Wb-sub-menu title="内容管理">
            <Wb-menu-item name="4-1">新增</Wb-menu-item>
            <Wb-menu-item name="4-2">修改</Wb-menu-item>
        </Wb-sub-menu>
        <Wb-sub-menu title="内容管理">
            <Wb-menu-group title="编辑">
                <Wb-menu-item name="5-1">新增</Wb-menu-item>
                <Wb-menu-item name="5-2">修改</Wb-menu-item>
            </Wb-menu-group>
            <Wb-menu-group title="查询">
                <Wb-menu-item name="5-3">文章</Wb-menu-item>
                <Wb-menu-item name="5-4">作者</Wb-menu-item>
            </Wb-menu-group>
        </Wb-sub-menu>
    </Wb-menu>
</template>
<script>
export default {
    data(){
        return {
            activeName: 1,
            type: 'light',
        }
    },
    methods: {
        selectMenu(name) {
            console.log('activeName:' + this.activeName, 'name:' + name);
        }
    }
}
```