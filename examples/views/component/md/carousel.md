```html
<template>
    <Carousel :data="list" :interval="interval"></Carousel>
</template>
<script>
    export default {
        data: function () {
            return {
                interval: 3000,
                list: [{
                    image: 'images/web32002.jpg',
                    link: ''
                }, {
                    image: 'images/web32002.jpg',
                    link: ''
                }]
            }
        }
    }
</script>
```
