<template>
    <div class="ui-select">
        <div class="ui-select-selection">
            <span class="ui-select-placeholder"></span>
            <span class="ui-select-selected-value"></span>
        </div>
        <div class="ui-select-dropdown">
            <ul class="ui-select-not-found">
                <li>无匹配数据</li>
            </ul>
            <ul class="ui-select-dropdown-list">
                <li class="ui-select-item">北京市</li>
                <li class="ui-select-item">上海市</li>
                <li class="ui-select-item">深圳市</li>
                <li class="ui-select-item">杭州市</li>
                <li class="ui-select-item">南京市</li>
                <li class="ui-select-item">重庆市</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import * as util from "../../util.js";
    export default {
        props: {
            value: {
                default: ""
            },
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
        },
        directives: {},
        data: function () {
            return {}
        },
        computed: {},
        watch: {},
        ready: function () {
        },
        methods: {}
    }
</script>
