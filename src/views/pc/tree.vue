<template>
    <tree :list="list"></tree>
</template>
<script type="text/ecmascript-6">
    import tree from "../../components/pc/tree/tree";
    export default {
        components: {
            tree: tree
        },
        data: function () {
          return {
              list:  [{
                  name: "Jiangsu",
                  code: "js",
                  children: [{
                      name: "Nanjing",
                      code: "nj"
                  }, {
                      name: "Suzhou",
                      code: "sz",
                      children: [{
                          name: "Wujiang",
                          code: "wj"
                      }, {
                          name: "Changshu",
                          code: "cs"
                      }]
                  }]
              }, {
                  name: "Yunnan",
                  code: "yn"
              }, {
                  name: "Fujian",
                  code: "fj"
              }]
          }
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
