| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| prop          | 列的唯一标识，对应着数据源对象的属性  | String  |        null              |
| name          | 列的标题  | String  |        null              |
| align          | 列文字对齐方向，可选值有"left"、"center"、"right"  | String  |        center             |
| width          | 列的宽度，传入"200px"或者"10%"  | String  |        null             |
| classes          | 控制TD的样式，当是function时，入参是td的原始值，返回结果必须是string  | String\|Function  |        null          |
| sort          | 列是否可以排序  | Boolean  |       false              |
| filter          | 列的过滤器，把原始值转换成展示需要的内容  | Array\|Function  |        null              |
| action          | 配置按钮列，当前列只显示按钮  | Array\|Object  |        null             |
| component       | 配置子组件列, 参数为trData, tdData  | Function  |        null              |
| detailComponent       | 配置单元格详情，参数为trData, tdData  | Function  |        null              |
| type       | 列类型，可选值有expand、selection  | String  |        null              |
| disabled       | 设置列禁止被选中，只有列的type是selection时有效  | Function  |        null              |


