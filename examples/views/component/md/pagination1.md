```html
<template>
    <Pagination :size-list="sizeList" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
</template>
<script>
    export default {
        data: function () {
            return {
                pagination: {
                    size: 10,
                    current: 1,
                    total: 100
                },
                sizeList: [10, 20, 30]
            }
        }
    }
</script>
```
