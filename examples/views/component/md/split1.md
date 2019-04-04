```html
<template>
    <split diretion="vertical">
        <splitItem>
            1
        </splitItem>
        <splitItem>
            2
        </splitItem>
        <splitItem>
            3
        </splitItem>
    </split>

    <split>
        <splitItem>
            1
        </splitItem>
        <splitItem>
            2
        </splitItem>
        <splitItem>
            3
        </splitItem>
    </split>
</template>
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
