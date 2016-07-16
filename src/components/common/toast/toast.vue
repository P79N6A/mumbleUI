<template>
    <div class="toast">
        <i :class="{'icon-toast-error':type=='error', 'icon-toast-success':type=='success'}"></i>
        <span>{{msg}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            type : {
                type : String
            },
            msg: {
                type : String
            }
        },
        data: function() {
            return {
            }
        },
        ready: function () {
        }
    }
</script>
<style lang="scss">
   .toast {
       position: fixed;
       left: 50%;
       top: 50%;
       -ms-transform: translate(-50%, -50%);
       -moz-transform: translate(-50%, -50%);
       -o-transform: translate(-50%, -50%);
       -webkit-transform: translate(-50%, -50%);
       transform: translate(-50%, -50%);
       z-index: 10000;
       min-width: 200px;
       max-width: 300px;
       padding: 20px 30px;
       background-color: rgba(0, 0, 0, .8);
       filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#9a000000', EndColorStr='#9a000000');
       border-radius: 2px;
       color: #fff;
       font-size: 16px;

        i {
            margin-right: 15px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    :root .toast {
        filter: none\9;
    }
</style>