```html
<template>
<split @on-move-start="movestart" @on-moving="moving" @on-move-end="moveend">
    <splitItem @on-change="change">
        1
    </splitItem>
    <splitItem>
        2
    </splitItem>
</split>
</template>
<script>
    export default {
        methods: {
            movestart(){

            },
            moving(){

            },
            moveend(){

            },
            change (data){
                console.log(data)
            }
        }
    }
</script>
<style>
    .ui-split {
        height: 300px;
        border: 1px solid #d7d7d7;
        margin: 20px 0;
    }
    .ui-split-vertical .ui-split-item:not(:first-child){
        border-top: 1px solid #d7d7d7;
    }
    .ui-split-horizontal .ui-split-item:not(:first-child){
        border-left: 1px solid #d7d7d7;
    }
</style>
```
