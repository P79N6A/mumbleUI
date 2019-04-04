<template>
    <ul v-show="total>0" class="ui-page">
        <li :title="t('el.pagination.prev')" class="ui-page-prev" @click="last">
            <i class="ui-icon ui-icon-left" />
        </li>
        <li v-if="showFirst" :title="t('el.pagination.first')" class="ui-page-item" @click="go(1)">
            1
        </li>
        <li v-if="showFirst" :title="t('el.pagination.pprev', {n: len})" class="ui-page-item-jump-prev" @click="prev()">
            <i class="ui-icon ui-icon-double-left" />
        </li>
        <li v-for="(code,index) in codes" :key="index" :class="{'ui-page-item-active':myCurrent==code}" :title="t('el.pagination.n', {n: code})" class="ui-page-item"
            @click="go(code)">
            {{ code }}
        </li>
        <li v-if="showLast" :title="t('el.pagination.nnext', {n: len})" class="ui-page-item-jump-next" @click="nnext()">
            <i class="ui-icon ui-icon-double-right" />
        </li>
        <li v-if="showLast" :title="t('el.pagination.last')" class="ui-page-item" @click="go(total)">
            {{ total }}
        </li>
        <li :title="t('el.pagination.next')" class="ui-page-next" @click="next">
            <i class="ui-icon ui-icon-right" />
        </li>
        <li class="ui-page-select">
            <wb-select v-model="mySize" :clearable="false" @on-change="changePageSize">
                <wb-option v-for="(i, index) in pageSizeList" :value="i" :key="index">{{ t('el.pagination.select', {n: i}) }}</wb-option>
            </wb-select>
        </li>
    </ul>
</template>
<script>
import Select from '../select';
import locale from '../../i18n/mixin.js';
const {WbSelect, WbOption} = Select;
export default {
    components: {
        WbSelect, WbOption
    },
    mixins: [locale],
    props: {
        size: { // 分页大小
            type: Number,
            default: 8
        },
        current: { // 当前页面
            type: Number,
            default: 1
        },
        total: { // 总页数
            type: Number,
            default: 0
        },
        locking: {
            type: Boolean,
            default: false
        },
        sizeList: {
            type: Array,
            default() {
                return [8, 16, 32, 50, 100]
            }
        }
    },
    data() {
        return {
            pageSizeList: this.sizeList,
            len: 6,
            myCurrent: this.current,
            mySize: this.size
        }
    },
    computed: {
        pageCode: function () {
            var pageCode = [];
            for (var i = 1; i <= this.total; i++) {
                pageCode.push(i)
            }
            return pageCode
        },
        codes: function () {
            var result = [];
            if (this.pageCode.length > 0) {
                this.pageCode.slice(0).forEach((item)=> {
                    if ((Math.floor((this.myCurrent - 1 ) / this.len) * this.len) < item ) {
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
            return this.codes[this.len - 1] < this.total
        }
    },
    watch: {
        current: function (value) {
            if (this.myCurrent === value) {
                return
            }
            this.myCurrent = value
        }
    },
    mounted() {
        if (this.pageSizeList.indexOf(this.size) == -1) {
            this.pageSizeList.push(this.size)
        }
    },
    methods: {
        dispatch() {
            this.$emit('on-change', {
                current: this.myCurrent,
                size: this.mySize
            });
            this.$emit('update:current', this.myCurrent);
            this.$emit('update:size', this.mySize);
        },
        last() {
            if (this.myCurrent > 1 && !this.locking) {
                this.myCurrent -= 1;
                this.dispatch();
            }
        },
        next() {
            if (this.myCurrent < this.total && !this.locking) {
                this.myCurrent += 1;
                this.dispatch();
            }
        },
        prev() {
            if (this.myCurrent > 1 && !this.locking) {
                this.myCurrent -= this.len;
                if (this.myCurrent < 1) {
                    this.myCurrent = 1
                }
                this.dispatch();
            }
        },
        nnext() {
            if (this.myCurrent < this.total && !this.locking) {
                this.myCurrent += this.len;
                if (this.myCurrent > this.total) {
                    this.myCurrent = this.total
                }
                this.dispatch();
            }
        },
        go(code) {
            if (this.myCurrent >= 1 && this.myCurrent <= this.total && !this.locking) {
                this.myCurrent = code;
                this.dispatch();
            }
        },
        changePageSize() {
            this.myCurrent = 1;
            this.dispatch();
        }
    }
}
</script>