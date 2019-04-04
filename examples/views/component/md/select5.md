```html
<template>
      <Wb-select v-model="value" :options="arr" options-value-name="value1" options-text-name="text1" filterable>
    </Wb-select>
</template>
<script>
    export default {
        data: function () {
            let i = 0;
            let arr = [];
            while (i < 10000) {
                arr.push({
                    value1: i,
                    text1: `option${i}`
                })
                i++;
            }
            return {
                value: '',
                arr
            }
        }
    }
</script>
```