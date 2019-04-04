<template>
    <div class="upload-page article">
        <h1>Upload 上传</h1>
        <h2>概述</h2>
        <p>实现文件上传的功能。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Upload>
                        <Wb-button>点击上传</Wb-button>
                    </Upload>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>给任意dom或者组件添加upload指令，则点击时就会触发选择文件，选择完毕上传文件</p>
                    <p>上传成功触发on-upload-success，上传失败触发on-upload-fail</p>
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

        <h2>API</h2>
        <h3>Upload props</h3>
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
                        <td style="text-align:left">url</td>
                        <td style="text-align:left">文件上传的远程api地址</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left"></td>
                    </tr>
                    <tr>
                        <td style="text-align:left">param</td>
                        <td style="text-align:left">文件blob请求字段名</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">upFiles</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">accept</td>
                        <td style="text-align:left">支持上传什么类型的文件</td>
                        <td style="text-align:left">String, Array</td>
                        <td style="text-align:left"></td>
                    </tr>
                    <tr>
                        <td style="text-align:left">multiple</td>
                        <td style="text-align:left">是否支持多文件</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">maxSize</td>
                        <td style="text-align:left">文件最大体积</td>
                        <td style="text-align:left">Number</td>
                        <td style="text-align:left">2097152 byte</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">imageSize</td>
                        <td style="text-align:left">当上传是图片文件时，控制图片的分辨率， 例如{width:200, height:200}</td>
                        <td style="text-align:left">Object</td>
                        <td style="text-align:left"></td>
                    </tr>
                    <tr>
                        <td style="text-align:left">action</td>
                        <td style="text-align:left">配置手动执行上传动作，如果配置了action，则URL不是必须的</td>
                        <td style="text-align:left">Function</td>
                        <td style="text-align:left"></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Upload events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">属性</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">on-success</td>
                        <td style="text-align:left">上传成功触发</td>
                        <td style="text-align:left">files</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-fail</td>
                        <td style="text-align:left">上传失败触发</td>
                        <td style="text-align:left">files</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>
<script>
    import markdown from './md/upload.md'
    export default {
        components: {
            markdown
        },
        data() {
            return {
                option: {
                    api: 'http://localhost:5000/card/uploadimg',
                    accept: 'jpg',
                    imageSize: {
                        width: 91,
                        height: 124
                    }
                }
            }
        },
        mounted: function () {
        },
        methods: {
            sucess(file, result, arg) {
                arg.url = arg.index
                console.log(arguments)
            },
            fail() {
                console.log(arguments)
            }
        }
    }
</script>