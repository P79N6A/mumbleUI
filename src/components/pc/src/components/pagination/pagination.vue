<template>
    <ul class="ui-page" v-show="totalPage>0">
        <li title="上一页" class="ui-page-prev" @click="last">
            <a><i class="ui-icon ui-icon-left"></i></a>
        </li>
        <li v-if="showFirst" title="第一页" class="ui-page-item" @click="go(1)">
            <a>1</a>
        </li>
        <li v-if="showFirst" class="ui-page-item-jump-prev" title="向前{{len}}页"  @click="prev()">
            <a><i class="ui-icon ui-icon-double-left"></i></a>
        </li>
        <li v-for="code in codes" class="ui-page-item" :class="{'ui-page-item-active':currentPage==code}" @click="go(code)"
            title="第{{code}}页">
            <a>{{code}}</a>
        </li>
        <li v-if="showLast" class="ui-page-item-jump-next" title="向后{{len}}页" @click="nnext()">
            <a><i class="ui-icon ui-icon-double-right"></i></a>
        </li>
        <li v-if="showLast" class="ui-page-item" title="最后一页:{{totalPage}}" @click="go(totalPage)">
            <a>{{totalPage}}</a>
        </li>
        <li title="下一页" class="ui-page-next" @click="next">
            <a><i class="ui-icon ui-icon-right"></i></a>
        </li>
        <li class="ui-page-select">
            <select v-model="pageSize" @change="changePageSize">
                <option v-for="i in pageSizes | orderBy true" :value="i">{{i}}条/页</option>
            </select>
        </li>
    </ul>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            pageSize:{     //控制样式，是否使用过渡效果
                type: Number,
                default: 8
            },
            currentPage: {      //自动轮播的时间间隔
                type: Number,
                default: 1,
                required : true
            },
            totalPage : {    //数据
                type: Number,
                default: 0,
                required : true
            },
            locking: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                pageSizes: [
                        8,16,32,50
                ],
                len: 6
            }
        },
        computed: {
            pageCode: function () {
                var pageCode = [];
                for(var i=1; i<= this.totalPage; i++){
                    pageCode.push(i)
                }
                return pageCode
            },
            codes: function () {
                var result = [];
                if(this.pageCode.length > 0){
                    this.pageCode.slice(0).forEach((item)=> {
                        if((Math.floor((this.currentPage -1 ) / this.len) * this.len) < item ){
                            result.push(item)
                        }
                    });
                }
                return result.slice(0, this.len)
            },
            showFirst: function () {
                return this.codes[0] > this.len
            },
            showLast: function () {
                return this.codes[this.len-1] < this.totalPage
            }
        },
        ready() {
            if(this.pageSizes.indexOf(this.pageSize) == -1){
                this.pageSizes.push(this.pageSize)
            }
        },
        methods: {
            dispatch(){
                this.$dispatch("pagination.change", {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                });
            },
            last(){
                if(this.currentPage > 1 && !this.locking){
                    this.currentPage -= 1;
                    this.dispatch();
                }
            },
            next(){
                if(this.currentPage < this.totalPage && !this.locking){
                    this.currentPage += 1;
                    this.dispatch();
                }
            },
            prev(){
                if(this.currentPage > 1 && !this.locking){
                    this.currentPage -= this.len;
                    if(this.currentPage <  1){
                        this.currentPage = 1
                    }
                    this.dispatch();
                }
            },
            nnext(){
                if(this.currentPage < this.totalPage && !this.locking){
                    this.currentPage += this.len;
                    if(this.currentPage > this.totalPage){
                        this.currentPage = this.totalPage
                    }
                    this.dispatch();
                }
            },
            go(code){
                if(this.currentPage >= 1 && this.currentPage <= this.totalPage && !this.locking){
                    this.currentPage = code;
                    this.dispatch();
                }
            },
            changePageSize(){
                this.currentPage = 1;
                this.dispatch();
            }
        }
    }
</script>