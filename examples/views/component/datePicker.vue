<template>
    <div class="datePicker-page article">
        <h1>datePicker 日期选择器</h1>
        <h2>概述</h2>
        <p>日期选择和配合输入框的日期选择</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <p>选择的时间：{{today}}</p>
                    <Date-picker v-model="today"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>单选</span>
                </div>
                <div class="panel-desc">
                    <p>日期选择器嵌入页面用法</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <p>选择的时间：{{value2}}</p>
                    <Date-picker v-model="value2" model="multiple"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>多选</span>
                </div>
                <div class="panel-desc">
                    <p>设置model为multiple，则日期可以选择多个</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <p>选择的时间：{{value3}}</p>
                    <Date-picker v-model="value3" model="range" max-range="1M"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>区间</span>
                </div>
                <div class="panel-desc">
                    <p>设置model为range，则日期选择一个区间</p>
                    <p>设置max-range控制区间的最大范围，单位有Y（年）、M（月）、D（天）</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Date-picker :min-date="minDate" :max-date="maxDate"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>最大/最小选择日期</span>
                </div>
                <div class="panel-desc">
                    <p>设置minDate，控制最小选择的时间</p>
                    <p>设置maxDate，控制最大选择的时间</p>
                </div>
            </div>
            <markdown5 slot="code"></markdown5>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Date-picker :disable="disableDate"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>禁用日期</span>
                </div>
                <div class="panel-desc">
                    <p>设置disable，控制不能选择的时间, 值是数组</p>
                    <p>如果数组的子项是日期，则不能选择这个日期</p>
                    <p>如果数组的子项是函数，则当前日期为参数输入，返回true的日期不能选择</p>
                    <p>如果数组的子项是对象，则从from的日期到to的日期都不能选择</p>
                </div>
            </div>
            <markdown6 slot="code"></markdown6>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Date-picker :enable="enableDate"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>仅能选择的日期</span>
                </div>
                <div class="panel-desc">
                    <p>设置enable，控制只能选择的时间</p>
                    <p>如果数组的子项是日期，则能选择这个日期</p>
                    <p>如果数组的子项是函数，则当前日期为参数输入，返回true的日期能选择</p>
                    <p>如果数组的子项是对象，则从from的日期到to的日期都能选择</p>
                </div>
            </div>
            <markdown7 slot="code"></markdown7>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Date-picker enable-time  enable-seconds :hour-increment="1" :minute-increment="10" :second-increment="10"></Date-picker>
                </div>
                <div class="panel-header">
                    <span>显示时间/秒</span>
                </div>
                <div class="panel-desc">
                    <p>设置enableTime，则显示小时、分钟输入框</p>
                    <p>设置enableSeconds，则显示秒输入框</p>
                    <p>设置hourIncrement，控制滚动小时输入框时值的跳动间隔</p>
                    <p>设置minuteIncrement，控制滚动分钟输入框时值的跳动间隔</p>
                    <p>设置secondIncrement，控制滚动秒输入框时值的跳动间隔</p>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <p>选择的时间是：{{value5}}</p>
                    <Wb-input-date-picker v-model="value5" model="range"></Wb-input-date-picker>
                    <br/>
                    <Wb-input-date-picker disabled></Wb-input-date-picker>
                    <br/>
                    <Wb-input-date-picker readonly></Wb-input-date-picker>
                </div>
                <div class="panel-header">
                    <span>日期输入框</span>
                </div>
                <div class="panel-desc">
                    <p>Form表单组件，必须设置.sync才能保证数据的双向绑定</p>
                    <p>焦点时弹出日期选择器，配置跟DatePicker一样</p>
                    <p>设置disabled或者readonly则点击不会弹出日历</p>
                </div>
            </div>
            <markdown8 slot="code"></markdown8>
        </panel>

        <h2>API</h2>
        <h3>DatePicker props</h3>
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
                    <td style="text-align:left">inline</td>
                    <td style="text-align:left">是否脱离文档流，ture则用relative定位，false则用absolute定位</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">true</td>
                </tr>
                <tr>
                    <td style="text-align:left">model</td>
                    <td style="text-align:left">模式，可选值有“single”，“range”, “multiple”</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">single</td>
                </tr>
                <tr>
                    <td style="text-align:left">enableTime</td>
                    <td style="text-align:left">是否显示时间</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">enableSeconds</td>
                    <td style="text-align:left">是否显示秒</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">hourIncrement</td>
                    <td style="text-align:left">滚动小时的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">1</td>
                </tr>
                <tr>
                    <td style="text-align:left">minuteIncrement</td>
                    <td style="text-align:left">滚动分钟的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">5</td>
                </tr>
                <tr>
                    <td style="text-align:left">secondIncrement</td>
                    <td style="text-align:left">滚动秒的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">5</td>
                </tr>
                <tr>
                    <td style="text-align:left">maxDate</td>
                    <td style="text-align:left">最大可选时间</td>
                    <td style="text-align:left">Date</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">minDate</td>
                    <td style="text-align:left">最小可选时间</td>
                    <td style="text-align:left">Date</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">日期的值, 使用v-model可以实现数据双向通讯</td>
                    <td style="text-align:left">Array|Number</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>DatePicker events</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">事件名</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">返回值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">on-change</td>
                    <td style="text-align:left">值改变时触发</td>
                    <td style="text-align:left">最新的值</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-finish</td>
                    <td style="text-align:left">选择结束触发</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>InputDatePicker props</h3>
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
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">日期的值,使用v-model可以实现数据双向通讯</td>
                    <td style="text-align:left">Array|Number</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">placeholder</td>
                    <td style="text-align:left">未选择时的提示语</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">请选择日期</td>
                </tr>
                <tr>
                    <td style="text-align:left">model</td>
                    <td style="text-align:left">模式，可选值有“single”，“range”, “multiple”</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">single</td>
                </tr>
                <tr>
                    <td style="text-align:left">enableTime</td>
                    <td style="text-align:left">是否显示时间</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">enableSeconds</td>
                    <td style="text-align:left">是否显示秒</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">hourIncrement</td>
                    <td style="text-align:left">滚动小时的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">1</td>
                </tr>
                <tr>
                    <td style="text-align:left">minuteIncrement</td>
                    <td style="text-align:left">滚动分钟的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">5</td>
                </tr>
                <tr>
                    <td style="text-align:left">secondIncrement</td>
                    <td style="text-align:left">滚动秒的间隔</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">5</td>
                </tr>
                <tr>
                    <td style="text-align:left">maxDate</td>
                    <td style="text-align:left">最大可选时间</td>
                    <td style="text-align:left">Date</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">minDate</td>
                    <td style="text-align:left">最小可选时间</td>
                    <td style="text-align:left">Date</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">disabled</td>
                    <td style="text-align:left">是否禁用</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">readonly</td>
                    <td style="text-align:left">是否只读</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>InputDatePicker events</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">事件名</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">返回值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">on-enter</td>
                    <td style="text-align:left">焦点在input, 按下enter键触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-focus</td>
                    <td style="text-align:left">获取焦点时触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-blur</td>
                    <td style="text-align:left">失去焦点时触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-input</td>
                    <td style="text-align:left">输入时触发</td>
                    <td style="text-align:left">value, event</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-change</td>
                    <td style="text-align:left">值改变时触发</td>
                    <td style="text-align:left">value, event</td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>

</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/datepicker1.md'
    import markdown2 from './md/datepicker2.md'
    import markdown3 from './md/datepicker3.md'
    import markdown4 from './md/datepicker4.md'
    import markdown5 from './md/datepicker5.md'
    import markdown6 from './md/datepicker6.md'
    import markdown7 from './md/datepicker7.md'
    import markdown8 from './md/datepicker8.md'
    export default{
        components: {
            markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, markdown8
        },
        data: function () {
            let today = new Date().getTime();
            let tomorrow = new Date().getTime() + 1000 * 3600 * 24 * 7;
            let minDate = new Date(new Date().getTime() - 1000 * 3600 * 24 * 5);
            let maxDate = new Date(new Date().getTime() + 1000 * 3600 * 24 * 5);
            return {
                value: null,
                value2: [today, tomorrow],
                value3: [today, tomorrow],
                value4: null,
                value5: [],
                today: today,
                tomorrow: tomorrow,
                minDate: minDate,
                maxDate: maxDate,
                disableDate: [new Date(today), function (date) {
                    if (date.day == 6) {
                        return true
                    }
                }, {
                    from: minDate,
                    to: maxDate
                }],
                enableDate: [new Date(today), function (date) {
                    if (date.day == 6) {
                        return true
                    }
                }, {
                    from: minDate,
                    to: maxDate
                }]
            }
        },
        methods: {
            change(data) {
                console.log(data)
            },
            enter(){
                console.log('enter')
            },
            blur(){
                console.log('blur')
            },
            focus(){
                console.log('focus')
            }
        },
        ready() {
            setTimeout(()=> {
                this.minDate = new Date(new Date().getTime() - 1000 * 3600 * 24 * 10)
            }, 3000);
        }
    }
</script>
