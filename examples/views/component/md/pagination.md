```html
<template>
    <Pagination @on-change="changePage" :locking="pagination.locking" 
        :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
</template>
<script>
    export default {
        data: function () {
            return {
                pagination: {
                    size: 10,
                    current: 1,
                    total: 100
                }
            }
        },
        methods: {
            changePage({ current, size}){
                console.log(arguments)
            }
        }
    }
</script>
```
