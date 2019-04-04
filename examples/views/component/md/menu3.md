### RouteMenu props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| mode          | 模式，可选有'horizontal（水平）', 'vertical（垂直）' | String  |       vertical              |
| type          | 颜色类型，可选有'light（白色）', 'dark（蓝色）' | String  |       light              |
| width          | 宽度  | Number/String  |                   |
| autoClose        | 是否自动收起菜单。当垂直模式时，点击菜单列表，是否关闭已经打开的菜单列表 | Boolean   |                     false                       |
| menu          | 菜单配置项  | Array  |       无              |
| menu[i].title   | 菜单标题 | String   |    空     
| menu[i].path   | 菜单项点击后，跳转路径 | String   |    空                    
| menu[i].subMenu   | 子菜单，每项也有path和title | Array   |    空                    
               
### Menu props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| mode          | 模式，可选有'horizontal（水平）', 'vertical（垂直）' | String  |       vertical              |
| type          | 颜色类型，可选有'light（白色）', 'dark（蓝色）' | String  |       light              |
| width          | 宽度  | Number/String  |                   |
| active-name        | 激活菜单的 name 值 | Number/String   |                     空                        |
| autoClose        | 是否自动收起菜单。当垂直模式时，点击菜单列表，是否关闭已经打开的菜单列表 | Boolean   |                     false                       |

### Menu events
| 事件名         | 说明                       | 返回值     |
|:--------------|:--------------------------|:--------|
| select          | 选择菜单（Menu-item）时触发  | name 

### MenuGroup props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          | 分组标题  | String  |       空             |

### MenuItem props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| name          | 必填，唯一标识  | Number/String  |       空             |

