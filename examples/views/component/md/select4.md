```html
<template>
     <Wb-select v-model="value" filterable @on-search="search">
        <wb-option v-for="item in options" :key="item" :value="item">{{item}}</wb-option>
    </Wb-select>
</template>
<script>
    export default {
        data: function () {
            return {
                value: '',
                options: [1, 2, 3, 4]
            }
        },
        methods: {
            search: function (value) {
                setTimeout(()=>{
                    this.options = [];
                    for(let i=1; i< 10; i++){
                        this.options.push(value + '|' + i)
                    }
                }, 500)
            }
        }
    }
</script>
```