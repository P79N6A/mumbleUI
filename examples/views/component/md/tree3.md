```html
<template>
    <Tree :data="data2" multiple :load-data="loadData"></Tree>
</template>
<script>
    export default {
        data: function () {
          return {
              data2: [{
                name: 'parent',
                children: []
            }]
          }
        },
        methods: {
            loadData(item, callback) {
                setTimeout(() => {
                    const data = [
                        {
                            name: 'children',
                            children: []
                        },
                        {
                            name: 'children',
                            children: []
                        }
                    ];
                    callback(data);
                }, 1000);
            }
        }
    }
</script>
```