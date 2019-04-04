<template>
    <div class="article">
        <h1>Split 分割面板</h1>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">

                    <split diretion="vertical">
                        <splitItem>
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                        <splitItem>
                            3
                        </splitItem>
                    </split>

                    <split>
                        <splitItem>
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                        <splitItem>
                            3
                        </splitItem>
                    </split>

                </div>
                <div class="panel-header">
                    <span>基本使用</span>
                </div>
                <div class="panel-desc">
                    <p>用鼠标拖动俩面板之间的线，可以改变面板的大小</p>
                    <p>有两种方向：horizontal垂直，vertical水平</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <split>
                        <splitItem width="0.3" min="0.2" max="0.5">
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                        <splitItem>
                            3
                        </splitItem>
                    </split>
                </div>
                <div class="panel-header">
                    <span>设置初始值和范围</span>
                </div>
                <div class="panel-desc">
                    <p>水平场景下，可以设置splitItem的初始宽度width, 最小宽度min，最大宽度max</p>
                    <p>垂直场景下，可以设置splitItem的初始高度height, 最小高度min，最大高度max</p>
                    <p>width/height/min/max如果值大于1表示绝对值px，如果小于1表示相对容器的高度或者宽度，例如0.1表示10%</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <split @on-move-start="movestart" @on-moving="moving" @on-move-end="moveend">
                        <splitItem @on-change="change">
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                    </split>
                </div>
                <div class="panel-header">
                    <span>事件</span>
                </div>
                <div class="panel-desc">
                    <p>Split组件在拖拽时抛出on-move-start、on-moving、on-move-end三个事件</p>
                    <p>当SplitItem组件的宽度或者高度发生改变时，抛出on-change事件，参数为{width, height}</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <h2>API</h2>
        <h3>Split props</h3>
        <markdown4></markdown4>
        <h3>Split event</h3>
        <markdown5></markdown5>
        <h3>SplitItem props</h3>
        <markdown6></markdown6>
        <h3>SplitItem event</h3>
        <markdown7></markdown7>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/split1.md'
import markdown2 from './md/split2.md'
import markdown3 from './md/split3.md'
import markdown4 from './md/split4.md'
import markdown5 from './md/split5.md'
import markdown6 from './md/split6.md'
import markdown7 from './md/split7.md'
export default {
    components: {
        markdown1,markdown2,markdown3,markdown4,markdown5,markdown6,markdown7
    },
    data: function() {
        return {
            data1: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3'
                }
            ],
            data2: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3',
                    disabled: true
                },
                {
                    content: 'number 4',
                    divided: true
                }
            ],
            data3: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'sub 1',
                    children: [
                        {
                            content: 'number 3'
                        },
                        {
                            content: 'number 4',
                            divided: true
                        },
                        {
                            content: 'sub 2',
                            children: [
                                {
                                    content: 'sub 3',
                                    children: [
                                        {
                                            content: 'number 6'
                                        }
                                    ]
                                },
                                {
                                    content: 'number 5',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        movestart(){

        },
        moving(){

        },
        moveend(){

        },
        change (data){
            console.log(data)
        }
    }
}
</script>
<style>
    .ui-split {
        height: 300px;
        border: 1px solid #d7d7d7;
        margin: 20px 0;
    }
    .ui-split-vertical .ui-split-item:not(:first-child){
        border-top: 1px solid #d7d7d7;
    }
    .ui-split-horizontal .ui-split-item:not(:first-child){
        border-left: 1px solid #d7d7d7;
    }
</style>
