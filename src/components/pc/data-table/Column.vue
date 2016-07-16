<template>
    <span style="display: none"></span>
</template>
<script>
    import Vue from 'vue';
    import _ from 'lodash/core';
    function parseText(str){
        if(str.startsWith("{") || str.startsWith("[")){
            var func = new Function('return ' + str + ';');
            str = func();
        }
        return str;
    }
    export default {
        props: {
            dataKey: {
                type: String
            },
            name: {
                type: String,
                required: true
            },
            align: {
                type: String,
                default: 'left'
            },
            filter: [String, Array, Function],
            width: String,
            action: [String, Array, Object],
            sort: [String, Boolean],
            addClass: [String, Function]
        },
        data: function () {
            return {}
        },
        ready: function () {
            //把{key:1}变成object
            var filter = this.filter;
            if(filter && !_.isObject(filter)){
                this.filter = parseText(filter);
            }
            var action = this.action;
            if(action && !_.isObject(action)){
                this.action = parseText(action);
                if(_.isObject(this.action)){
                    this.action = [this.action];
                }
            }
        }
    }
</script>
