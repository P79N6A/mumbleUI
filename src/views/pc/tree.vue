<template>
    <div class="tree-panel">
        <h2>多选</h2>
        <tree :list="list1" :multiple="true"></tree>
        <h2>单选</h2>
        <tree :list="list2"></tree>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
          return {
              list1:  [{
                  name: "Jiangsu",
                  code: "js",
                  children: [{
                      name: "Nanjing",
                      code: "nj",
                      selected: true
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
              }],
              list2:  [{
                  name: "Jiangsu",
                  code: "js",
                  children: [{
                      name: "Nanjing",
                      code: "nj",
                      selected: true
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
