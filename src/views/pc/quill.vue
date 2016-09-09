<template>
    <div style="width: 1000px; position: fixed; top: 200px; left: 200px">
        <div id="editor"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    require("../../components/quill/assets/snow.styl");
    import Quill from "../../components/quill";
    export default {
        components: {
        },
        data: function () {
            return {
            }
        },
        ready: function () {
            var container = document.getElementById('editor');
            var fullEditor = new Quill(container, {
                placeholder: "请输入内容",
                modules: {
                    'toolbar': [
                        [{ 'font': [] }, { 'size': [] }, 'bold', 'italic', 'underline', 'strike',
                            { 'color': [] }, { 'background': [] },
                            { 'script': 'super' }, { 'script': 'sub' },{ 'header': '1' }, { 'header': '2' }, 'blockquote',
                            { 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' },{ 'indent': '+1' },{ 'align': [] }],
                        [ 'link', 'image'],
                        [ 'clean' ]
                    ],
                },
                theme: 'snow'
            });
        },
        methods: {
        }
    }
</script>
