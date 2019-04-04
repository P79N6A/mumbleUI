```javascript
import Vue from 'vue';
import UiWebank from '@webank/ui-webank';
import '@webank/ui-webank/dist/styles/ui-webank.css';    // 使用 CSS

Vue.use(UiWebank);

```


## 按需引用
- `wnpm install @webank/babel-plugin-import --save-dev`
- 借助插件 babel-plugin-import可以实现按需加载组件，减少文件体积。首先安装，并在文件 .babelrc 中配置：

```js
    // .babelrc
    plugins: [
        [
            '@webank/babel-plugin-import',
            {
                libraryName: '@webank/ui-webank',
                libraryDirectory:
                    '/src/components',
                style: true
            }
        ]
    ]
```
- 然后这样按需引入组件，就可以减小体积了：
```js
    import { DatePicker } from '@webank/ui-webank'
    Vue.component('DatePicker', DatePicker);
```