<template>
    <div class="tab-page article">
        <h1>Tabs 标签页</h1>
        <h2>概述</h2>
        <p>选项卡切换组件，常用于平级区域大块内容的的收纳和展现。</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs v-model="value">
                        <Tab label="标签一">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>Tabs的value值或者说v-modal值表示Tabs当前激活项。</p>
                    <p>Tab的name属性默认是在Tabs的中index，从1开始。</p>
                    <p>Tab的name等于Tabs的value值，则激活此Tab</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs v-model="value" type="card">
                        <Tab label="标签一">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>card类型</span>
                </div>
                <div class="panel-desc">
                    设置type为card
                </div>
            </div>
            <markdown9 slot="code"></markdown9>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs v-model="value1">
                        <Tab label="标签一" name="android" icon="android">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二" name="apple" icon="apple">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三" name="windows" icon="windows" disabled>
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>禁用和图标</span>
                </div>
                <div class="panel-desc">
                    <p>设置Tab的icon，可以在Tab显示一个Icon</p>
                    <p>设置Tab的disabled，则禁用该Tab项</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs value="1" closable @on-tab-remove="remove">
                        <Tab v-for="(item,index) in arr" :label="'标签' + item" :name="item" :key="index">
                            <p>{{item}}</p>
                        </Tab>
                        <Wb-button type="ghost" slot="action" @click="addItem">增加</Wb-button>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>自定义动作 + 可删除 + 滚动</span>
                </div>
                <div class="panel-desc">
                    <p>1、在Tabs添加slot为action的元素显示在Tab的头部最右边</p>
                    <p>2、配置closable，则选项可以被删除。删除时触发on-tab-remove事件，参数为删除项的name</p>
                    <p>3、当选项过多时，自动出现左右切换的按钮</p>
                </div>
            </div>
            <markdown6 slot="code"></markdown6>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs v-model="value" draggable  @on-tab-change="change">
                        <Tab label="标签一">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>可拖拽</span>
                </div>
                <div class="panel-desc">
                    <p>配置draggable，则选项可以被拖拽排序。触发on-tab-change事件，参数为{from:index, to:index}</p>
                </div>
            </div>
            <markdown7 slot="code"></markdown7>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tabs v-model="value">
                        <Tab :label="copm(1)">
                            <p>1</p>
                        </Tab>
                        <Tab :label="copm(2)">
                            <p>2</p>
                        </Tab>
                        <Tab :label="copm(3)">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>label可以是组件</span>
                </div>
                <div class="panel-desc">
                     实现自定义的title
                </div>
            </div>
            <markdown8 slot="code"></markdown8>
        </panel>

        <h2>API</h2>
        <h3>Tabs props</h3>
        <markdown3></markdown3>

        <h3>Tabs events</h3>
        <markdown4></markdown4>

        <h3>Tab props</h3>
        <markdown5></markdown5>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/tabs1.md'
    import markdown2 from './md/tabs2.md'
    import markdown3 from './md/tabs3.md'
    import markdown4 from './md/tabs4.md'
    import markdown5 from './md/tabs5.md'
    import markdown6 from './md/tabs6.md'
    import markdown7 from './md/tabs7.md'
    import markdown8 from './md/tabs8.md'
    import markdown9 from './md/tabs9.md'
    
    import Vue from 'vue'
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, markdown8, markdown9
        },
        data: function () {
            return {
                value: '1',
                value1: 'apple',
                arr: [1, 2, 3],
                copm: function(i){
                    return new Vue({
                        data: function(){
                           return{
                               i
                           }
                        },
                        template: '<span>标签<span class="a">{{i}}</span></span>'
                    })
                }
            }
        },
        methods: {
            choose: function (index) {
                this.$Toast('选择第' + index + '个')
            },
            addItem(){
                this.arr.push(this.arr.length + 1);
            },
            remove(){
                console.log(arguments)
            },
            change({from, to }){
                var obj = this.arr[from];
                this.arr.splice(from, 1);
                this.arr.splice(to, 0, obj);
                console.log(this.arr)
            }
        }
    }
</script>
<style>
.a{
    display: inline-block;
    border-radius: 50%;
    height: 16px;
    line-height: 16px;
    text-align: center;
    width: 16px;
    color: white;
    background: red;
}
</style>

