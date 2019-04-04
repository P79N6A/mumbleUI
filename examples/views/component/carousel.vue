<template>
    <div class="button-page article">
        <h1>Carousel 轮播</h1>
        <h2>概述</h2>
        <p>视图组件，首页轮播放广告和营销入口</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Carousel :data="list" :interval="interval"></Carousel>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p></p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown></markdown>
                </div>
            </Cell>
        </Row>

        <h3>Carousel props</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">属性</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">类型</th>
                    <th style="text-align:left">默认值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">data</td>
                    <td style="text-align:left">数据源,包含数据源对象的数组</td>
                    <td style="text-align:left">Aarray</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">data.image</td>
                    <td style="text-align:left">图片URL</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">data.link</td>
                    <td style="text-align:left">点击图片跳转的URL</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">interval</td>
                    <td style="text-align:left">轮播频率，多少毫秒一次</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">6000</td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>


</template>
<script type="text/ecmascript-6">
    import markdown from './md/carousel.md'
    export default {
        components: {
            markdown
        },
        data: function () {
            return {
                interval: 3000,
                list: [{
                    image: 'images/web32002.jpg',
                    link: ''
                }, {
                    image: 'images/web32002.jpg',
                    link: ''
                }]
            }
        }
    }
</script>
