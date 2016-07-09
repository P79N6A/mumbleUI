<template>
    <div class="ui-select-table" @touchstart.stop.prevent="">
        <div class="ui-flex center title">
            <div class="cell tal pl" v-touch:tap="cancel">取消</div>
            <div class="cell tar pr" v-touch:tap="sure">完成</div>
        </div>
        <div class="content ui-flex">
            <ul class="cell"
                @touchstart="touchstart($event,provinceOption)"
                @touchmove="touchmove($event,provinceOption)"
                @touchend="touchend($event,provinceOption)"
                :style="styleObject">
                <li></li>
                <li></li>
                <li v-for="item in provinceList" :class="{current : $index==provinceOption.chooseItem}">{{item.provinceName}}</li>
                <li></li>
                <li></li>
            </ul>
            <ul class="cell"
                @touchstart="touchstart($event,cityOption)"
                @touchmove="touchmove($event,cityOption)"
                @touchend="touchend($event,cityOption)"
                :style="cityStyleObject">
                <li></li>
                <li></li>
                <li v-for="item in cityList | fiterCity provinceId" :class="{current : $index==cityOption.chooseItem}">{{item.cityName}}</li>
                <li></li>
                <li></li>
            </ul>
            <div class="cui-mask-gray"></div>
            <div class="cui-lines">&nbsp;</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    let touchStartX = 0;
    let touchStartY = 0;
    let incrementX = 0;
    let incrementY = 0;
    export default {
        props: {
            defaultValue : {
                type : String,
                default : 0
            }
        },
        data () {
            return {
                provinceList : [
                    {
                        "provinceAbbr": "BJS",
                        "provinceId": "110000",
                        "provinceName": "北京市"
                    },
                    {
                        "provinceAbbr": "TJS",
                        "provinceId": "120000",
                        "provinceName": "天津市"
                    },
                    {
                        "provinceAbbr": "HB",
                        "provinceId": "130000",
                        "provinceName": "河北省"
                    },
                    {
                        "provinceAbbr": "SX",
                        "provinceId": "140000",
                        "provinceName": "山西省"
                    },
                    {
                        "provinceAbbr": "NMG",
                        "provinceId": "150000",
                        "provinceName": "内蒙古自治区"
                    },
                    {
                        "provinceAbbr": "LN",
                        "provinceId": "210000",
                        "provinceName": "辽宁省"
                    },
                    {
                        "provinceAbbr": "JL",
                        "provinceId": "220000",
                        "provinceName": "吉林省"
                    },
                    {
                        "provinceAbbr": "HLJ",
                        "provinceId": "230000",
                        "provinceName": "黑龙江"
                    },
                    {
                        "provinceAbbr": "SH",
                        "provinceId": "310000",
                        "provinceName": "上海市"
                    },
                    {
                        "provinceAbbr": "JS",
                        "provinceId": "320000",
                        "provinceName": "江苏省"
                    },
                    {
                        "provinceAbbr": "ZJ",
                        "provinceId": "330000",
                        "provinceName": "浙江省"
                    },
                    {
                        "provinceAbbr": "AH",
                        "provinceId": "340000",
                        "provinceName": "安徽省"
                    },
                    {
                        "provinceAbbr": "FJ",
                        "provinceId": "350000",
                        "provinceName": "福建省"
                    },
                    {
                        "provinceAbbr": "JX",
                        "provinceId": "360000",
                        "provinceName": "江西省"
                    },
                    {
                        "provinceAbbr": "SD",
                        "provinceId": "370000",
                        "provinceName": "山东省"
                    },
                    {
                        "provinceAbbr": "HN",
                        "provinceId": "410000",
                        "provinceName": "河南省"
                    },
                    {
                        "provinceAbbr": "HB",
                        "provinceId": "420000",
                        "provinceName": "湖北省"
                    },
                    {
                        "provinceAbbr": "HN",
                        "provinceId": "430000",
                        "provinceName": "湖南省"
                    },
                    {
                        "provinceAbbr": "GD",
                        "provinceId": "440000",
                        "provinceName": "广东省"
                    },
                    {
                        "provinceAbbr": "GXZZ",
                        "provinceId": "450000",
                        "provinceName": "广西壮族自治区"
                    },
                    {
                        "provinceAbbr": "HN",
                        "provinceId": "460000",
                        "provinceName": "海南省"
                    },
                    {
                        "provinceAbbr": "CQ",
                        "provinceId": "500000",
                        "provinceName": "重庆市"
                    },
                    {
                        "provinceAbbr": "SC",
                        "provinceId": "510000",
                        "provinceName": "四川省"
                    },
                    {
                        "provinceAbbr": "GZ",
                        "provinceId": "520000",
                        "provinceName": "贵州省"
                    },
                    {
                        "provinceAbbr": "YN",
                        "provinceId": "530000",
                        "provinceName": "云南省"
                    },
                    {
                        "provinceAbbr": "XZZZQ",
                        "provinceId": "540000",
                        "provinceName": "西藏自治区"
                    },
                    {
                        "provinceAbbr": "SX",
                        "provinceId": "610000",
                        "provinceName": "陕西省"
                    },
                    {
                        "provinceAbbr": "GS",
                        "provinceId": "620000",
                        "provinceName": "甘肃省"
                    },
                    {
                        "provinceAbbr": "QH",
                        "provinceId": "630000",
                        "provinceName": "青海省"
                    },
                    {
                        "provinceAbbr": "NXHZ",
                        "provinceId": "640000",
                        "provinceName": "宁夏回族自治区"
                    },
                    {
                        "provinceAbbr": "XJWWE",
                        "provinceId": "650000",
                        "provinceName": "新疆维吾尔自治区"
                    },
                    {
                        "provinceAbbr": "TW",
                        "provinceId": "710000",
                        "provinceName": "台湾省"
                    },
                    {
                        "provinceAbbr": "XG",
                        "provinceId": "810000",
                        "provinceName": "香港特别行政区"
                    },
                    {
                        "provinceAbbr": "AM",
                        "provinceId": "820000",
                        "provinceName": "澳门特别行政区"
                    }
                ],
                cityList : [
                    {
                        "cityId": "110000",
                        "cityName": "北京市",
                        "provinceId": "110000"
                    },
                    {
                        "cityId": "110101",
                        "cityName": "东城区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110102",
                        "cityName": "西城区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110103",
                        "cityName": "崇文区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110104",
                        "cityName": "宣武区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110105",
                        "cityName": "朝阳区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110106",
                        "cityName": "丰台区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110107",
                        "cityName": "石景山区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110108",
                        "cityName": "海淀区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110109",
                        "cityName": "门头沟区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110111",
                        "cityName": "房山区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110112",
                        "cityName": "通州区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110113",
                        "cityName": "顺义区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110114",
                        "cityName": "昌平区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110115",
                        "cityName": "大兴区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110116",
                        "cityName": "怀柔区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110117",
                        "cityName": "平谷区",
                        "provinceId": "110100"
                    },
                    {
                        "cityId": "110228",
                        "cityName": "密云县",
                        "provinceId": "110200"
                    },
                    {
                        "cityId": "110229",
                        "cityName": "延庆县",
                        "provinceId": "110200"
                    },
                    {
                        "cityId": "120100",
                        "cityName": "天津市",
                        "provinceId": "120000"
                    },
                    {
                        "cityId": "120101",
                        "cityName": "和平区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120102",
                        "cityName": "河东区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120103",
                        "cityName": "河西区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120104",
                        "cityName": "南开区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120105",
                        "cityName": "河北区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120106",
                        "cityName": "红桥区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120107",
                        "cityName": "塘沽区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120108",
                        "cityName": "汉沽区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120109",
                        "cityName": "大港区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120110",
                        "cityName": "东丽区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120111",
                        "cityName": "西青区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120112",
                        "cityName": "津南区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120113",
                        "cityName": "北辰区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120114",
                        "cityName": "武清区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120115",
                        "cityName": "宝坻区",
                        "provinceId": "120100"
                    },
                    {
                        "cityId": "120221",
                        "cityName": "宁河县",
                        "provinceId": "120200"
                    },
                    {
                        "cityId": "120223",
                        "cityName": "静海县",
                        "provinceId": "120200"
                    },
                    {
                        "cityId": "120225",
                        "cityName": "蓟县",
                        "provinceId": "120200"
                    },
                    {
                        "cityId": "130100",
                        "cityName": "石家庄市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130101",
                        "cityName": "市辖区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130102",
                        "cityName": "长安区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130103",
                        "cityName": "桥东区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130104",
                        "cityName": "桥西区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130105",
                        "cityName": "新华区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130107",
                        "cityName": "井陉矿区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130108",
                        "cityName": "裕华区",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130121",
                        "cityName": "井陉县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130123",
                        "cityName": "正定县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130124",
                        "cityName": "栾城县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130125",
                        "cityName": "行唐县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130126",
                        "cityName": "灵寿县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130127",
                        "cityName": "高邑县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130128",
                        "cityName": "深泽县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130129",
                        "cityName": "赞皇县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130130",
                        "cityName": "无极县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130131",
                        "cityName": "平山县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130132",
                        "cityName": "元氏县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130133",
                        "cityName": "赵县",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130181",
                        "cityName": "辛集市",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130182",
                        "cityName": "藁城市",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130183",
                        "cityName": "晋州市",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130184",
                        "cityName": "新乐市",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130185",
                        "cityName": "鹿泉市",
                        "provinceId": "130100"
                    },
                    {
                        "cityId": "130200",
                        "cityName": "唐山市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130201",
                        "cityName": "市辖区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130202",
                        "cityName": "路南区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130203",
                        "cityName": "路北区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130204",
                        "cityName": "古冶区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130205",
                        "cityName": "开平区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130207",
                        "cityName": "丰南区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130208",
                        "cityName": "丰润区",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130223",
                        "cityName": "滦县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130224",
                        "cityName": "滦南县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130225",
                        "cityName": "乐亭县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130227",
                        "cityName": "迁西县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130229",
                        "cityName": "玉田县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130230",
                        "cityName": "唐海县",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130281",
                        "cityName": "遵化市",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130283",
                        "cityName": "迁安市",
                        "provinceId": "130200"
                    },
                    {
                        "cityId": "130300",
                        "cityName": "秦皇岛市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130301",
                        "cityName": "市辖区",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130302",
                        "cityName": "海港区",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130303",
                        "cityName": "山海关区",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130304",
                        "cityName": "北戴河区",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130321",
                        "cityName": "青龙满族自治县",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130322",
                        "cityName": "昌黎县",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130323",
                        "cityName": "抚宁县",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130324",
                        "cityName": "卢龙县",
                        "provinceId": "130300"
                    },
                    {
                        "cityId": "130400",
                        "cityName": "邯郸市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130401",
                        "cityName": "市辖区",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130402",
                        "cityName": "邯山区",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130403",
                        "cityName": "丛台区",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130404",
                        "cityName": "复兴区",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130406",
                        "cityName": "峰峰矿区",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130421",
                        "cityName": "邯郸县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130423",
                        "cityName": "临漳县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130424",
                        "cityName": "成安县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130425",
                        "cityName": "大名县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130426",
                        "cityName": "涉县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130427",
                        "cityName": "磁县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130428",
                        "cityName": "肥乡县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130429",
                        "cityName": "永年县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130430",
                        "cityName": "邱县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130431",
                        "cityName": "鸡泽县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130432",
                        "cityName": "广平县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130433",
                        "cityName": "馆陶县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130434",
                        "cityName": "魏县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130435",
                        "cityName": "曲周县",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130481",
                        "cityName": "武安市",
                        "provinceId": "130400"
                    },
                    {
                        "cityId": "130500",
                        "cityName": "邢台市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130501",
                        "cityName": "市辖区",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130502",
                        "cityName": "桥东区",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130503",
                        "cityName": "桥西区",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130521",
                        "cityName": "邢台县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130522",
                        "cityName": "临城县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130523",
                        "cityName": "内丘县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130524",
                        "cityName": "柏乡县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130525",
                        "cityName": "隆尧县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130526",
                        "cityName": "任县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130527",
                        "cityName": "南和县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130528",
                        "cityName": "宁晋县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130529",
                        "cityName": "巨鹿县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130530",
                        "cityName": "新河县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130531",
                        "cityName": "广宗县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130532",
                        "cityName": "平乡县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130533",
                        "cityName": "威县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130534",
                        "cityName": "清河县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130535",
                        "cityName": "临西县",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130581",
                        "cityName": "南宫市",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130582",
                        "cityName": "沙河市",
                        "provinceId": "130500"
                    },
                    {
                        "cityId": "130600",
                        "cityName": "保定市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130601",
                        "cityName": "市辖区",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130602",
                        "cityName": "新市区",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130603",
                        "cityName": "北市区",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130604",
                        "cityName": "南市区",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130621",
                        "cityName": "满城县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130622",
                        "cityName": "清苑县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130623",
                        "cityName": "涞水县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130624",
                        "cityName": "阜平县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130625",
                        "cityName": "徐水县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130626",
                        "cityName": "定兴县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130627",
                        "cityName": "唐县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130628",
                        "cityName": "高阳县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130629",
                        "cityName": "容城县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130630",
                        "cityName": "涞源县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130631",
                        "cityName": "望都县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130632",
                        "cityName": "安新县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130633",
                        "cityName": "易县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130634",
                        "cityName": "曲阳县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130635",
                        "cityName": "蠡县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130636",
                        "cityName": "顺平县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130637",
                        "cityName": "博野县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130638",
                        "cityName": "雄县",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130681",
                        "cityName": "涿州市",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130682",
                        "cityName": "定州市",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130683",
                        "cityName": "安国市",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130684",
                        "cityName": "高碑店市",
                        "provinceId": "130600"
                    },
                    {
                        "cityId": "130700",
                        "cityName": "张家口市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130701",
                        "cityName": "市辖区",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130702",
                        "cityName": "桥东区",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130703",
                        "cityName": "桥西区",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130705",
                        "cityName": "宣化区",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130706",
                        "cityName": "下花园区",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130721",
                        "cityName": "宣化县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130722",
                        "cityName": "张北县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130723",
                        "cityName": "康保县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130724",
                        "cityName": "沽源县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130725",
                        "cityName": "尚义县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130726",
                        "cityName": "蔚县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130727",
                        "cityName": "阳原县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130728",
                        "cityName": "怀安县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130729",
                        "cityName": "万全县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130730",
                        "cityName": "怀来县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130731",
                        "cityName": "涿鹿县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130732",
                        "cityName": "赤城县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130733",
                        "cityName": "崇礼县",
                        "provinceId": "130700"
                    },
                    {
                        "cityId": "130800",
                        "cityName": "承德市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130801",
                        "cityName": "市辖区",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130802",
                        "cityName": "双桥区",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130803",
                        "cityName": "双滦区",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130804",
                        "cityName": "鹰手营子矿区",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130821",
                        "cityName": "承德县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130822",
                        "cityName": "兴隆县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130823",
                        "cityName": "平泉县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130824",
                        "cityName": "滦平县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130825",
                        "cityName": "隆化县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130826",
                        "cityName": "丰宁满族自治县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130827",
                        "cityName": "宽城满族自治县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130828",
                        "cityName": "围场满族蒙古族自治县",
                        "provinceId": "130800"
                    },
                    {
                        "cityId": "130900",
                        "cityName": "沧州市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "130901",
                        "cityName": "市辖区",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130902",
                        "cityName": "新华区",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130903",
                        "cityName": "运河区",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130921",
                        "cityName": "沧县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130922",
                        "cityName": "青县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130923",
                        "cityName": "东光县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130924",
                        "cityName": "海兴县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130925",
                        "cityName": "盐山县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130926",
                        "cityName": "肃宁县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130927",
                        "cityName": "南皮县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130928",
                        "cityName": "吴桥县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130929",
                        "cityName": "献县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130930",
                        "cityName": "孟村回族自治县",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130981",
                        "cityName": "泊头市",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130982",
                        "cityName": "任丘市",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130983",
                        "cityName": "黄骅市",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "130984",
                        "cityName": "河间市",
                        "provinceId": "130900"
                    },
                    {
                        "cityId": "131000",
                        "cityName": "廊坊市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "131001",
                        "cityName": "市辖区",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131002",
                        "cityName": "安次区",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131003",
                        "cityName": "广阳区",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131022",
                        "cityName": "固安县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131023",
                        "cityName": "永清县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131024",
                        "cityName": "香河县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131025",
                        "cityName": "大城县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131026",
                        "cityName": "文安县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131028",
                        "cityName": "大厂回族自治县",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131081",
                        "cityName": "霸州市",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131082",
                        "cityName": "三河市",
                        "provinceId": "131000"
                    },
                    {
                        "cityId": "131100",
                        "cityName": "衡水市",
                        "provinceId": "130000"
                    },
                    {
                        "cityId": "131101",
                        "cityName": "市辖区",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131102",
                        "cityName": "桃城区",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131121",
                        "cityName": "枣强县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131122",
                        "cityName": "武邑县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131123",
                        "cityName": "武强县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131124",
                        "cityName": "饶阳县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131125",
                        "cityName": "安平县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131126",
                        "cityName": "故城县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131127",
                        "cityName": "景县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131128",
                        "cityName": "阜城县",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131181",
                        "cityName": "冀州市",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "131182",
                        "cityName": "深州市",
                        "provinceId": "131100"
                    },
                    {
                        "cityId": "140100",
                        "cityName": "太原市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140101",
                        "cityName": "市辖区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140105",
                        "cityName": "小店区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140106",
                        "cityName": "迎泽区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140107",
                        "cityName": "杏花岭区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140108",
                        "cityName": "尖草坪区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140109",
                        "cityName": "万柏林区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140110",
                        "cityName": "晋源区",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140121",
                        "cityName": "清徐县",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140122",
                        "cityName": "阳曲县",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140123",
                        "cityName": "娄烦县",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140181",
                        "cityName": "古交市",
                        "provinceId": "140100"
                    },
                    {
                        "cityId": "140200",
                        "cityName": "大同市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140201",
                        "cityName": "市辖区",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140202",
                        "cityName": "城区",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140203",
                        "cityName": "矿区",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140211",
                        "cityName": "南郊区",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140212",
                        "cityName": "新荣区",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140221",
                        "cityName": "阳高县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140222",
                        "cityName": "天镇县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140223",
                        "cityName": "广灵县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140224",
                        "cityName": "灵丘县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140225",
                        "cityName": "浑源县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140226",
                        "cityName": "左云县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140227",
                        "cityName": "大同县",
                        "provinceId": "140200"
                    },
                    {
                        "cityId": "140300",
                        "cityName": "阳泉市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140301",
                        "cityName": "市辖区",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140302",
                        "cityName": "城区",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140303",
                        "cityName": "矿区",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140311",
                        "cityName": "郊区",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140321",
                        "cityName": "平定县",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140322",
                        "cityName": "盂县",
                        "provinceId": "140300"
                    },
                    {
                        "cityId": "140400",
                        "cityName": "长治市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140401",
                        "cityName": "市辖区",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140402",
                        "cityName": "城区",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140411",
                        "cityName": "郊区",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140421",
                        "cityName": "长治县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140423",
                        "cityName": "襄垣县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140424",
                        "cityName": "屯留县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140425",
                        "cityName": "平顺县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140426",
                        "cityName": "黎城县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140427",
                        "cityName": "壶关县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140428",
                        "cityName": "长子县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140429",
                        "cityName": "武乡县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140430",
                        "cityName": "沁县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140431",
                        "cityName": "沁源县",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140481",
                        "cityName": "潞城市",
                        "provinceId": "140400"
                    },
                    {
                        "cityId": "140500",
                        "cityName": "晋城市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140501",
                        "cityName": "市辖区",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140502",
                        "cityName": "城区",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140521",
                        "cityName": "沁水县",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140522",
                        "cityName": "阳城县",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140524",
                        "cityName": "陵川县",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140525",
                        "cityName": "泽州县",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140581",
                        "cityName": "高平市",
                        "provinceId": "140500"
                    },
                    {
                        "cityId": "140600",
                        "cityName": "朔州市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140601",
                        "cityName": "市辖区",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140602",
                        "cityName": "朔城区",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140603",
                        "cityName": "平鲁区",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140621",
                        "cityName": "山阴县",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140622",
                        "cityName": "应县",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140623",
                        "cityName": "右玉县",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140624",
                        "cityName": "怀仁县",
                        "provinceId": "140600"
                    },
                    {
                        "cityId": "140700",
                        "cityName": "晋中市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140701",
                        "cityName": "市辖区",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140702",
                        "cityName": "榆次区",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140721",
                        "cityName": "榆社县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140722",
                        "cityName": "左权县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140723",
                        "cityName": "和顺县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140724",
                        "cityName": "昔阳县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140725",
                        "cityName": "寿阳县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140726",
                        "cityName": "太谷县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140727",
                        "cityName": "祁县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140728",
                        "cityName": "平遥县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140729",
                        "cityName": "灵石县",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140781",
                        "cityName": "介休市",
                        "provinceId": "140700"
                    },
                    {
                        "cityId": "140800",
                        "cityName": "运城市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140801",
                        "cityName": "市辖区",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140802",
                        "cityName": "盐湖区",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140821",
                        "cityName": "临猗县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140822",
                        "cityName": "万荣县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140823",
                        "cityName": "闻喜县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140824",
                        "cityName": "稷山县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140825",
                        "cityName": "新绛县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140826",
                        "cityName": "绛县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140827",
                        "cityName": "垣曲县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140828",
                        "cityName": "夏县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140829",
                        "cityName": "平陆县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140830",
                        "cityName": "芮城县",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140881",
                        "cityName": "永济市",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140882",
                        "cityName": "河津市",
                        "provinceId": "140800"
                    },
                    {
                        "cityId": "140900",
                        "cityName": "忻州市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "140901",
                        "cityName": "市辖区",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140902",
                        "cityName": "忻府区",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140921",
                        "cityName": "定襄县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140922",
                        "cityName": "五台县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140923",
                        "cityName": "代县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140924",
                        "cityName": "繁峙县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140925",
                        "cityName": "宁武县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140926",
                        "cityName": "静乐县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140927",
                        "cityName": "神池县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140928",
                        "cityName": "五寨县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140929",
                        "cityName": "岢岚县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140930",
                        "cityName": "河曲县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140931",
                        "cityName": "保德县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140932",
                        "cityName": "偏关县",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "140981",
                        "cityName": "原平市",
                        "provinceId": "140900"
                    },
                    {
                        "cityId": "141000",
                        "cityName": "临汾市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "141001",
                        "cityName": "市辖区",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141002",
                        "cityName": "尧都区",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141021",
                        "cityName": "曲沃县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141022",
                        "cityName": "翼城县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141023",
                        "cityName": "襄汾县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141024",
                        "cityName": "洪洞县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141025",
                        "cityName": "古县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141026",
                        "cityName": "安泽县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141027",
                        "cityName": "浮山县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141028",
                        "cityName": "吉县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141029",
                        "cityName": "乡宁县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141030",
                        "cityName": "大宁县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141031",
                        "cityName": "隰县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141032",
                        "cityName": "永和县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141033",
                        "cityName": "蒲县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141034",
                        "cityName": "汾西县",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141081",
                        "cityName": "侯马市",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141082",
                        "cityName": "霍州市",
                        "provinceId": "141000"
                    },
                    {
                        "cityId": "141100",
                        "cityName": "吕梁市",
                        "provinceId": "140000"
                    },
                    {
                        "cityId": "141101",
                        "cityName": "市辖区",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141102",
                        "cityName": "离石区",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141121",
                        "cityName": "文水县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141122",
                        "cityName": "交城县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141123",
                        "cityName": "兴县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141124",
                        "cityName": "临县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141125",
                        "cityName": "柳林县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141126",
                        "cityName": "石楼县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141127",
                        "cityName": "岚县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141128",
                        "cityName": "方山县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141129",
                        "cityName": "中阳县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141130",
                        "cityName": "交口县",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141181",
                        "cityName": "孝义市",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "141182",
                        "cityName": "汾阳市",
                        "provinceId": "141100"
                    },
                    {
                        "cityId": "150100",
                        "cityName": "呼和浩特市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150101",
                        "cityName": "市辖区",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150102",
                        "cityName": "新城区",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150103",
                        "cityName": "回民区",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150104",
                        "cityName": "玉泉区",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150105",
                        "cityName": "赛罕区",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150121",
                        "cityName": "土默特左旗",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150122",
                        "cityName": "托克托县",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150123",
                        "cityName": "和林格尔县",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150124",
                        "cityName": "清水河县",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150125",
                        "cityName": "武川县",
                        "provinceId": "150100"
                    },
                    {
                        "cityId": "150200",
                        "cityName": "包头市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150201",
                        "cityName": "市辖区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150202",
                        "cityName": "东河区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150203",
                        "cityName": "昆都仑区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150204",
                        "cityName": "青山区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150205",
                        "cityName": "石拐区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150206",
                        "cityName": "白云矿区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150207",
                        "cityName": "九原区",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150221",
                        "cityName": "土默特右旗",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150222",
                        "cityName": "固阳县",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150223",
                        "cityName": "达尔罕茂明安联合旗",
                        "provinceId": "150200"
                    },
                    {
                        "cityId": "150300",
                        "cityName": "乌海市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150301",
                        "cityName": "市辖区",
                        "provinceId": "150300"
                    },
                    {
                        "cityId": "150302",
                        "cityName": "海勃湾区",
                        "provinceId": "150300"
                    },
                    {
                        "cityId": "150303",
                        "cityName": "海南区",
                        "provinceId": "150300"
                    },
                    {
                        "cityId": "150304",
                        "cityName": "乌达区",
                        "provinceId": "150300"
                    },
                    {
                        "cityId": "150400",
                        "cityName": "赤峰市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150401",
                        "cityName": "市辖区",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150402",
                        "cityName": "红山区",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150403",
                        "cityName": "元宝山区",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150404",
                        "cityName": "松山区",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150421",
                        "cityName": "阿鲁科尔沁旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150422",
                        "cityName": "巴林左旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150423",
                        "cityName": "巴林右旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150424",
                        "cityName": "林西县",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150425",
                        "cityName": "克什克腾旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150426",
                        "cityName": "翁牛特旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150428",
                        "cityName": "喀喇沁旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150429",
                        "cityName": "宁城县",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150430",
                        "cityName": "敖汉旗",
                        "provinceId": "150400"
                    },
                    {
                        "cityId": "150500",
                        "cityName": "通辽市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150501",
                        "cityName": "市辖区",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150502",
                        "cityName": "科尔沁区",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150521",
                        "cityName": "科尔沁左翼中旗",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150522",
                        "cityName": "科尔沁左翼后旗",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150523",
                        "cityName": "开鲁县",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150524",
                        "cityName": "库伦旗",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150525",
                        "cityName": "奈曼旗",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150526",
                        "cityName": "扎鲁特旗",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150581",
                        "cityName": "霍林郭勒市",
                        "provinceId": "150500"
                    },
                    {
                        "cityId": "150600",
                        "cityName": "鄂尔多斯市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150602",
                        "cityName": "东胜区",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150621",
                        "cityName": "达拉特旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150622",
                        "cityName": "准格尔旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150623",
                        "cityName": "鄂托克前旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150624",
                        "cityName": "鄂托克旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150625",
                        "cityName": "杭锦旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150626",
                        "cityName": "乌审旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150627",
                        "cityName": "伊金霍洛旗",
                        "provinceId": "150600"
                    },
                    {
                        "cityId": "150700",
                        "cityName": "呼伦贝尔市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150701",
                        "cityName": "市辖区",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150702",
                        "cityName": "海拉尔区",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150721",
                        "cityName": "阿荣旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150722",
                        "cityName": "莫力达瓦达斡尔族自治旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150723",
                        "cityName": "鄂伦春自治旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150724",
                        "cityName": "鄂温克族自治旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150725",
                        "cityName": "陈巴尔虎旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150726",
                        "cityName": "新巴尔虎左旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150727",
                        "cityName": "新巴尔虎右旗",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150781",
                        "cityName": "满洲里市",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150782",
                        "cityName": "牙克石市",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150783",
                        "cityName": "扎兰屯市",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150784",
                        "cityName": "额尔古纳市",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150785",
                        "cityName": "根河市",
                        "provinceId": "150700"
                    },
                    {
                        "cityId": "150800",
                        "cityName": "巴彦淖尔市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150801",
                        "cityName": "市辖区",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150802",
                        "cityName": "临河区",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150821",
                        "cityName": "五原县",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150822",
                        "cityName": "磴口县",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150823",
                        "cityName": "乌拉特前旗",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150824",
                        "cityName": "乌拉特中旗",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150825",
                        "cityName": "乌拉特后旗",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150826",
                        "cityName": "杭锦后旗",
                        "provinceId": "150800"
                    },
                    {
                        "cityId": "150900",
                        "cityName": "乌兰察布市",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "150901",
                        "cityName": "市辖区",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150902",
                        "cityName": "集宁区",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150921",
                        "cityName": "卓资县",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150922",
                        "cityName": "化德县",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150923",
                        "cityName": "商都县",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150924",
                        "cityName": "兴和县",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150925",
                        "cityName": "凉城县",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150926",
                        "cityName": "察哈尔右翼前旗",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150927",
                        "cityName": "察哈尔右翼中旗",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150928",
                        "cityName": "察哈尔右翼后旗",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150929",
                        "cityName": "四子王旗",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "150981",
                        "cityName": "丰镇市",
                        "provinceId": "150900"
                    },
                    {
                        "cityId": "152200",
                        "cityName": "兴安盟",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "152201",
                        "cityName": "乌兰浩特市",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152202",
                        "cityName": "阿尔山市",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152221",
                        "cityName": "科尔沁右翼前旗",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152222",
                        "cityName": "科尔沁右翼中旗",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152223",
                        "cityName": "扎赉特旗",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152224",
                        "cityName": "突泉县",
                        "provinceId": "152200"
                    },
                    {
                        "cityId": "152500",
                        "cityName": "锡林郭勒盟",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "152501",
                        "cityName": "二连浩特市",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152502",
                        "cityName": "锡林浩特市",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152522",
                        "cityName": "阿巴嘎旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152523",
                        "cityName": "苏尼特左旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152524",
                        "cityName": "苏尼特右旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152525",
                        "cityName": "东乌珠穆沁旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152526",
                        "cityName": "西乌珠穆沁旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152527",
                        "cityName": "太仆寺旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152528",
                        "cityName": "镶黄旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152529",
                        "cityName": "正镶白旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152530",
                        "cityName": "正蓝旗",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152531",
                        "cityName": "多伦县",
                        "provinceId": "152500"
                    },
                    {
                        "cityId": "152900",
                        "cityName": "阿拉善盟",
                        "provinceId": "150000"
                    },
                    {
                        "cityId": "152921",
                        "cityName": "阿拉善左旗",
                        "provinceId": "152900"
                    },
                    {
                        "cityId": "152922",
                        "cityName": "阿拉善右旗",
                        "provinceId": "152900"
                    },
                    {
                        "cityId": "152923",
                        "cityName": "额济纳旗",
                        "provinceId": "152900"
                    },
                    {
                        "cityId": "210100",
                        "cityName": "沈阳市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210101",
                        "cityName": "市辖区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210102",
                        "cityName": "和平区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210103",
                        "cityName": "沈河区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210104",
                        "cityName": "大东区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210105",
                        "cityName": "皇姑区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210106",
                        "cityName": "铁西区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210111",
                        "cityName": "苏家屯区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210112",
                        "cityName": "东陵区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210113",
                        "cityName": "新城子区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210114",
                        "cityName": "于洪区",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210122",
                        "cityName": "辽中县",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210123",
                        "cityName": "康平县",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210124",
                        "cityName": "法库县",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210181",
                        "cityName": "新民市",
                        "provinceId": "210100"
                    },
                    {
                        "cityId": "210200",
                        "cityName": "大连市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210201",
                        "cityName": "市辖区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210202",
                        "cityName": "中山区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210203",
                        "cityName": "西岗区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210204",
                        "cityName": "沙河口区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210211",
                        "cityName": "甘井子区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210212",
                        "cityName": "旅顺口区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210213",
                        "cityName": "金州区",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210224",
                        "cityName": "长海县",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210281",
                        "cityName": "瓦房店市",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210282",
                        "cityName": "普兰店市",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210283",
                        "cityName": "庄河市",
                        "provinceId": "210200"
                    },
                    {
                        "cityId": "210300",
                        "cityName": "鞍山市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210301",
                        "cityName": "市辖区",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210302",
                        "cityName": "铁东区",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210303",
                        "cityName": "铁西区",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210304",
                        "cityName": "立山区",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210311",
                        "cityName": "千山区",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210321",
                        "cityName": "台安县",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210323",
                        "cityName": "岫岩满族自治县",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210381",
                        "cityName": "海城市",
                        "provinceId": "210300"
                    },
                    {
                        "cityId": "210400",
                        "cityName": "抚顺市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210401",
                        "cityName": "市辖区",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210402",
                        "cityName": "新抚区",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210403",
                        "cityName": "东洲区",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210404",
                        "cityName": "望花区",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210411",
                        "cityName": "顺城区",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210421",
                        "cityName": "抚顺县",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210422",
                        "cityName": "新宾满族自治县",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210423",
                        "cityName": "清原满族自治县",
                        "provinceId": "210400"
                    },
                    {
                        "cityId": "210500",
                        "cityName": "本溪市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210501",
                        "cityName": "市辖区",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210502",
                        "cityName": "平山区",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210503",
                        "cityName": "溪湖区",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210504",
                        "cityName": "明山区",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210505",
                        "cityName": "南芬区",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210521",
                        "cityName": "本溪满族自治县",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210522",
                        "cityName": "桓仁满族自治县",
                        "provinceId": "210500"
                    },
                    {
                        "cityId": "210600",
                        "cityName": "丹东市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210601",
                        "cityName": "市辖区",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210602",
                        "cityName": "元宝区",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210603",
                        "cityName": "振兴区",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210604",
                        "cityName": "振安区",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210624",
                        "cityName": "宽甸满族自治县",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210681",
                        "cityName": "东港市",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210682",
                        "cityName": "凤城市",
                        "provinceId": "210600"
                    },
                    {
                        "cityId": "210700",
                        "cityName": "锦州市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210701",
                        "cityName": "市辖区",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210702",
                        "cityName": "古塔区",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210703",
                        "cityName": "凌河区",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210711",
                        "cityName": "太和区",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210726",
                        "cityName": "黑山县",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210727",
                        "cityName": "义县",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210781",
                        "cityName": "凌海市",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210782",
                        "cityName": "北宁市",
                        "provinceId": "210700"
                    },
                    {
                        "cityId": "210800",
                        "cityName": "营口市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210801",
                        "cityName": "市辖区",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210802",
                        "cityName": "站前区",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210803",
                        "cityName": "西市区",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210804",
                        "cityName": "鲅鱼圈区",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210811",
                        "cityName": "老边区",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210881",
                        "cityName": "盖州市",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210882",
                        "cityName": "大石桥市",
                        "provinceId": "210800"
                    },
                    {
                        "cityId": "210900",
                        "cityName": "阜新市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "210901",
                        "cityName": "市辖区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210902",
                        "cityName": "海州区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210903",
                        "cityName": "新邱区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210904",
                        "cityName": "太平区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210905",
                        "cityName": "清河门区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210911",
                        "cityName": "细河区",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210921",
                        "cityName": "阜新蒙古族自治县",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "210922",
                        "cityName": "彰武县",
                        "provinceId": "210900"
                    },
                    {
                        "cityId": "211000",
                        "cityName": "辽阳市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "211001",
                        "cityName": "市辖区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211002",
                        "cityName": "白塔区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211003",
                        "cityName": "文圣区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211004",
                        "cityName": "宏伟区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211005",
                        "cityName": "弓长岭区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211011",
                        "cityName": "太子河区",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211021",
                        "cityName": "辽阳县",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211081",
                        "cityName": "灯塔市",
                        "provinceId": "211000"
                    },
                    {
                        "cityId": "211100",
                        "cityName": "盘锦市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "211101",
                        "cityName": "市辖区",
                        "provinceId": "211100"
                    },
                    {
                        "cityId": "211102",
                        "cityName": "双台子区",
                        "provinceId": "211100"
                    },
                    {
                        "cityId": "211103",
                        "cityName": "兴隆台区",
                        "provinceId": "211100"
                    },
                    {
                        "cityId": "211121",
                        "cityName": "大洼县",
                        "provinceId": "211100"
                    },
                    {
                        "cityId": "211122",
                        "cityName": "盘山县",
                        "provinceId": "211100"
                    },
                    {
                        "cityId": "211200",
                        "cityName": "铁岭市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "211201",
                        "cityName": "市辖区",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211202",
                        "cityName": "银州区",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211204",
                        "cityName": "清河区",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211221",
                        "cityName": "铁岭县",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211223",
                        "cityName": "西丰县",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211224",
                        "cityName": "昌图县",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211281",
                        "cityName": "调兵山市",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211282",
                        "cityName": "开原市",
                        "provinceId": "211200"
                    },
                    {
                        "cityId": "211300",
                        "cityName": "朝阳市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "211301",
                        "cityName": "市辖区",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211302",
                        "cityName": "双塔区",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211303",
                        "cityName": "龙城区",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211321",
                        "cityName": "朝阳县",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211322",
                        "cityName": "建平县",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211324",
                        "cityName": "喀喇沁左翼蒙古族自治县",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211381",
                        "cityName": "北票市",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211382",
                        "cityName": "凌源市",
                        "provinceId": "211300"
                    },
                    {
                        "cityId": "211400",
                        "cityName": "葫芦岛市",
                        "provinceId": "210000"
                    },
                    {
                        "cityId": "211401",
                        "cityName": "市辖区",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211402",
                        "cityName": "连山区",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211403",
                        "cityName": "龙港区",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211404",
                        "cityName": "南票区",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211421",
                        "cityName": "绥中县",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211422",
                        "cityName": "建昌县",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "211481",
                        "cityName": "兴城市",
                        "provinceId": "211400"
                    },
                    {
                        "cityId": "220100",
                        "cityName": "长春市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220101",
                        "cityName": "市辖区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220102",
                        "cityName": "南关区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220103",
                        "cityName": "宽城区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220104",
                        "cityName": "朝阳区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220105",
                        "cityName": "二道区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220106",
                        "cityName": "绿园区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220112",
                        "cityName": "双阳区",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220122",
                        "cityName": "农安县",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220181",
                        "cityName": "九台市",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220182",
                        "cityName": "榆树市",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220183",
                        "cityName": "德惠市",
                        "provinceId": "220100"
                    },
                    {
                        "cityId": "220200",
                        "cityName": "吉林市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220201",
                        "cityName": "市辖区",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220202",
                        "cityName": "昌邑区",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220203",
                        "cityName": "龙潭区",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220204",
                        "cityName": "船营区",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220211",
                        "cityName": "丰满区",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220221",
                        "cityName": "永吉县",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220281",
                        "cityName": "蛟河市",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220282",
                        "cityName": "桦甸市",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220283",
                        "cityName": "舒兰市",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220284",
                        "cityName": "磐石市",
                        "provinceId": "220200"
                    },
                    {
                        "cityId": "220300",
                        "cityName": "四平市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220301",
                        "cityName": "市辖区",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220302",
                        "cityName": "铁西区",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220303",
                        "cityName": "铁东区",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220322",
                        "cityName": "梨树县",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220323",
                        "cityName": "伊通满族自治县",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220381",
                        "cityName": "公主岭市",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220382",
                        "cityName": "双辽市",
                        "provinceId": "220300"
                    },
                    {
                        "cityId": "220400",
                        "cityName": "辽源市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220401",
                        "cityName": "市辖区",
                        "provinceId": "220400"
                    },
                    {
                        "cityId": "220402",
                        "cityName": "龙山区",
                        "provinceId": "220400"
                    },
                    {
                        "cityId": "220403",
                        "cityName": "西安区",
                        "provinceId": "220400"
                    },
                    {
                        "cityId": "220421",
                        "cityName": "东丰县",
                        "provinceId": "220400"
                    },
                    {
                        "cityId": "220422",
                        "cityName": "东辽县",
                        "provinceId": "220400"
                    },
                    {
                        "cityId": "220500",
                        "cityName": "通化市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220501",
                        "cityName": "市辖区",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220502",
                        "cityName": "东昌区",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220503",
                        "cityName": "二道江区",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220521",
                        "cityName": "通化县",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220523",
                        "cityName": "辉南县",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220524",
                        "cityName": "柳河县",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220581",
                        "cityName": "梅河口市",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220582",
                        "cityName": "集安市",
                        "provinceId": "220500"
                    },
                    {
                        "cityId": "220600",
                        "cityName": "白山市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220601",
                        "cityName": "市辖区",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220602",
                        "cityName": "八道江区",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220621",
                        "cityName": "抚松县",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220622",
                        "cityName": "靖宇县",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220623",
                        "cityName": "长白朝鲜族自治县",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220625",
                        "cityName": "江源县",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220681",
                        "cityName": "临江市",
                        "provinceId": "220600"
                    },
                    {
                        "cityId": "220700",
                        "cityName": "松原市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220701",
                        "cityName": "市辖区",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220702",
                        "cityName": "宁江区",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220721",
                        "cityName": "前郭尔罗斯蒙古族自治县",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220722",
                        "cityName": "长岭县",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220723",
                        "cityName": "乾安县",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220724",
                        "cityName": "扶余县",
                        "provinceId": "220700"
                    },
                    {
                        "cityId": "220800",
                        "cityName": "白城市",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "220801",
                        "cityName": "市辖区",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "220802",
                        "cityName": "洮北区",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "220821",
                        "cityName": "镇赉县",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "220822",
                        "cityName": "通榆县",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "220881",
                        "cityName": "洮南市",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "220882",
                        "cityName": "大安市",
                        "provinceId": "220800"
                    },
                    {
                        "cityId": "222400",
                        "cityName": "延边朝鲜族自治州",
                        "provinceId": "220000"
                    },
                    {
                        "cityId": "222401",
                        "cityName": "延吉市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222402",
                        "cityName": "图们市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222403",
                        "cityName": "敦化市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222404",
                        "cityName": "珲春市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222405",
                        "cityName": "龙井市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222406",
                        "cityName": "和龙市",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222424",
                        "cityName": "汪清县",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "222426",
                        "cityName": "安图县",
                        "provinceId": "222400"
                    },
                    {
                        "cityId": "230100",
                        "cityName": "哈尔滨市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230101",
                        "cityName": "市辖区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230102",
                        "cityName": "道里区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230103",
                        "cityName": "南岗区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230104",
                        "cityName": "道外区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230106",
                        "cityName": "香坊区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230107",
                        "cityName": "动力区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230108",
                        "cityName": "平房区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230109",
                        "cityName": "松北区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230111",
                        "cityName": "呼兰区",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230123",
                        "cityName": "依兰县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230124",
                        "cityName": "方正县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230125",
                        "cityName": "宾县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230126",
                        "cityName": "巴彦县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230127",
                        "cityName": "木兰县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230128",
                        "cityName": "通河县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230129",
                        "cityName": "延寿县",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230181",
                        "cityName": "阿城市",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230182",
                        "cityName": "双城市",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230183",
                        "cityName": "尚志市",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230184",
                        "cityName": "五常市",
                        "provinceId": "230100"
                    },
                    {
                        "cityId": "230200",
                        "cityName": "齐齐哈尔市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230201",
                        "cityName": "市辖区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230202",
                        "cityName": "龙沙区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230203",
                        "cityName": "建华区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230204",
                        "cityName": "铁锋区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230205",
                        "cityName": "昂昂溪区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230206",
                        "cityName": "富拉尔基区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230207",
                        "cityName": "碾子山区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230208",
                        "cityName": "梅里斯达斡尔族区",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230221",
                        "cityName": "龙江县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230223",
                        "cityName": "依安县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230224",
                        "cityName": "泰来县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230225",
                        "cityName": "甘南县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230227",
                        "cityName": "富裕县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230229",
                        "cityName": "克山县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230230",
                        "cityName": "克东县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230231",
                        "cityName": "拜泉县",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230281",
                        "cityName": "讷河市",
                        "provinceId": "230200"
                    },
                    {
                        "cityId": "230300",
                        "cityName": "鸡西市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230301",
                        "cityName": "市辖区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230302",
                        "cityName": "鸡冠区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230303",
                        "cityName": "恒山区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230304",
                        "cityName": "滴道区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230305",
                        "cityName": "梨树区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230306",
                        "cityName": "城子河区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230307",
                        "cityName": "麻山区",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230321",
                        "cityName": "鸡东县",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230381",
                        "cityName": "虎林市",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230382",
                        "cityName": "密山市",
                        "provinceId": "230300"
                    },
                    {
                        "cityId": "230400",
                        "cityName": "鹤岗市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230401",
                        "cityName": "市辖区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230402",
                        "cityName": "向阳区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230403",
                        "cityName": "工农区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230404",
                        "cityName": "南山区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230405",
                        "cityName": "兴安区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230406",
                        "cityName": "东山区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230407",
                        "cityName": "兴山区",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230421",
                        "cityName": "萝北县",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230422",
                        "cityName": "绥滨县",
                        "provinceId": "230400"
                    },
                    {
                        "cityId": "230500",
                        "cityName": "双鸭山市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230501",
                        "cityName": "市辖区",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230502",
                        "cityName": "尖山区",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230503",
                        "cityName": "岭东区",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230505",
                        "cityName": "四方台区",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230506",
                        "cityName": "宝山区",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230521",
                        "cityName": "集贤县",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230522",
                        "cityName": "友谊县",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230523",
                        "cityName": "宝清县",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230524",
                        "cityName": "饶河县",
                        "provinceId": "230500"
                    },
                    {
                        "cityId": "230600",
                        "cityName": "大庆市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230601",
                        "cityName": "市辖区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230602",
                        "cityName": "萨尔图区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230603",
                        "cityName": "龙凤区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230604",
                        "cityName": "让胡路区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230605",
                        "cityName": "红岗区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230606",
                        "cityName": "大同区",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230621",
                        "cityName": "肇州县",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230622",
                        "cityName": "肇源县",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230623",
                        "cityName": "林甸县",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230624",
                        "cityName": "杜尔伯特蒙古族自治县",
                        "provinceId": "230600"
                    },
                    {
                        "cityId": "230700",
                        "cityName": "伊春市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230701",
                        "cityName": "市辖区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230702",
                        "cityName": "伊春区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230703",
                        "cityName": "南岔区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230704",
                        "cityName": "友好区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230705",
                        "cityName": "西林区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230706",
                        "cityName": "翠峦区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230707",
                        "cityName": "新青区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230708",
                        "cityName": "美溪区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230709",
                        "cityName": "金山屯区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230710",
                        "cityName": "五营区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230711",
                        "cityName": "乌马河区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230712",
                        "cityName": "汤旺河区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230713",
                        "cityName": "带岭区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230714",
                        "cityName": "乌伊岭区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230715",
                        "cityName": "红星区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230716",
                        "cityName": "上甘岭区",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230722",
                        "cityName": "嘉荫县",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230781",
                        "cityName": "铁力市",
                        "provinceId": "230700"
                    },
                    {
                        "cityId": "230800",
                        "cityName": "佳木斯市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230801",
                        "cityName": "市辖区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230802",
                        "cityName": "永红区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230803",
                        "cityName": "向阳区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230804",
                        "cityName": "前进区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230805",
                        "cityName": "东风区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230811",
                        "cityName": "郊区",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230822",
                        "cityName": "桦南县",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230826",
                        "cityName": "桦川县",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230828",
                        "cityName": "汤原县",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230833",
                        "cityName": "抚远县",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230881",
                        "cityName": "同江市",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230882",
                        "cityName": "富锦市",
                        "provinceId": "230800"
                    },
                    {
                        "cityId": "230900",
                        "cityName": "七台河市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "230901",
                        "cityName": "市辖区",
                        "provinceId": "230900"
                    },
                    {
                        "cityId": "230902",
                        "cityName": "新兴区",
                        "provinceId": "230900"
                    },
                    {
                        "cityId": "230903",
                        "cityName": "桃山区",
                        "provinceId": "230900"
                    },
                    {
                        "cityId": "230904",
                        "cityName": "茄子河区",
                        "provinceId": "230900"
                    },
                    {
                        "cityId": "230921",
                        "cityName": "勃利县",
                        "provinceId": "230900"
                    },
                    {
                        "cityId": "231000",
                        "cityName": "牡丹江市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "231001",
                        "cityName": "市辖区",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231002",
                        "cityName": "东安区",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231003",
                        "cityName": "阳明区",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231004",
                        "cityName": "爱民区",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231005",
                        "cityName": "西安区",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231024",
                        "cityName": "东宁县",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231025",
                        "cityName": "林口县",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231081",
                        "cityName": "绥芬河市",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231083",
                        "cityName": "海林市",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231084",
                        "cityName": "宁安市",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231085",
                        "cityName": "穆棱市",
                        "provinceId": "231000"
                    },
                    {
                        "cityId": "231100",
                        "cityName": "黑河市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "231101",
                        "cityName": "市辖区",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231102",
                        "cityName": "爱辉区",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231121",
                        "cityName": "嫩江县",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231123",
                        "cityName": "逊克县",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231124",
                        "cityName": "孙吴县",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231181",
                        "cityName": "北安市",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231182",
                        "cityName": "五大连池市",
                        "provinceId": "231100"
                    },
                    {
                        "cityId": "231200",
                        "cityName": "绥化市",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "231201",
                        "cityName": "市辖区",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231202",
                        "cityName": "北林区",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231221",
                        "cityName": "望奎县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231222",
                        "cityName": "兰西县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231223",
                        "cityName": "青冈县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231224",
                        "cityName": "庆安县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231225",
                        "cityName": "明水县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231226",
                        "cityName": "绥棱县",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231281",
                        "cityName": "安达市",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231282",
                        "cityName": "肇东市",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "231283",
                        "cityName": "海伦市",
                        "provinceId": "231200"
                    },
                    {
                        "cityId": "232700",
                        "cityName": "大兴安岭地区",
                        "provinceId": "230000"
                    },
                    {
                        "cityId": "232721",
                        "cityName": "呼玛县",
                        "provinceId": "232700"
                    },
                    {
                        "cityId": "232722",
                        "cityName": "塔河县",
                        "provinceId": "232700"
                    },
                    {
                        "cityId": "232723",
                        "cityName": "漠河县",
                        "provinceId": "232700"
                    },
                    {
                        "cityId": "310100",
                        "cityName": "上海市",
                        "provinceId": "310000"
                    },
                    {
                        "cityId": "310101",
                        "cityName": "黄浦区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310103",
                        "cityName": "卢湾区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310104",
                        "cityName": "徐汇区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310105",
                        "cityName": "长宁区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310106",
                        "cityName": "静安区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310107",
                        "cityName": "普陀区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310108",
                        "cityName": "闸北区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310109",
                        "cityName": "虹口区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310110",
                        "cityName": "杨浦区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310112",
                        "cityName": "闵行区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310113",
                        "cityName": "宝山区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310114",
                        "cityName": "嘉定区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310115",
                        "cityName": "浦东新区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310116",
                        "cityName": "金山区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310117",
                        "cityName": "松江区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310118",
                        "cityName": "青浦区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310119",
                        "cityName": "南汇区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310120",
                        "cityName": "奉贤区",
                        "provinceId": "310100"
                    },
                    {
                        "cityId": "310230",
                        "cityName": "崇明县",
                        "provinceId": "310200"
                    },
                    {
                        "cityId": "320100",
                        "cityName": "南京市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320101",
                        "cityName": "市辖区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320102",
                        "cityName": "玄武区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320103",
                        "cityName": "白下区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320104",
                        "cityName": "秦淮区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320105",
                        "cityName": "建邺区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320106",
                        "cityName": "鼓楼区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320107",
                        "cityName": "下关区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320111",
                        "cityName": "浦口区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320113",
                        "cityName": "栖霞区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320114",
                        "cityName": "雨花台区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320115",
                        "cityName": "江宁区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320116",
                        "cityName": "六合区",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320124",
                        "cityName": "溧水县",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320125",
                        "cityName": "高淳县",
                        "provinceId": "320100"
                    },
                    {
                        "cityId": "320200",
                        "cityName": "无锡市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320201",
                        "cityName": "市辖区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320202",
                        "cityName": "崇安区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320203",
                        "cityName": "南长区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320204",
                        "cityName": "北塘区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320205",
                        "cityName": "锡山区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320206",
                        "cityName": "惠山区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320211",
                        "cityName": "滨湖区",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320281",
                        "cityName": "江阴市",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320282",
                        "cityName": "宜兴市",
                        "provinceId": "320200"
                    },
                    {
                        "cityId": "320300",
                        "cityName": "徐州市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320301",
                        "cityName": "市辖区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320302",
                        "cityName": "鼓楼区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320303",
                        "cityName": "云龙区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320304",
                        "cityName": "九里区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320305",
                        "cityName": "贾汪区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320311",
                        "cityName": "泉山区",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320321",
                        "cityName": "丰县",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320322",
                        "cityName": "沛县",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320323",
                        "cityName": "铜山县",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320324",
                        "cityName": "睢宁县",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320381",
                        "cityName": "新沂市",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320382",
                        "cityName": "邳州市",
                        "provinceId": "320300"
                    },
                    {
                        "cityId": "320400",
                        "cityName": "常州市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320401",
                        "cityName": "市辖区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320402",
                        "cityName": "天宁区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320404",
                        "cityName": "钟楼区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320405",
                        "cityName": "戚墅堰区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320411",
                        "cityName": "新北区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320412",
                        "cityName": "武进区",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320481",
                        "cityName": "溧阳市",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320482",
                        "cityName": "金坛市",
                        "provinceId": "320400"
                    },
                    {
                        "cityId": "320500",
                        "cityName": "苏州市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320501",
                        "cityName": "市辖区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320502",
                        "cityName": "沧浪区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320503",
                        "cityName": "平江区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320504",
                        "cityName": "金阊区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320505",
                        "cityName": "虎丘区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320506",
                        "cityName": "吴中区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320507",
                        "cityName": "相城区",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320581",
                        "cityName": "常熟市",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320582",
                        "cityName": "张家港市",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320583",
                        "cityName": "昆山市",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320584",
                        "cityName": "吴江市",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320585",
                        "cityName": "太仓市",
                        "provinceId": "320500"
                    },
                    {
                        "cityId": "320600",
                        "cityName": "南通市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320601",
                        "cityName": "市辖区",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320602",
                        "cityName": "崇川区",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320611",
                        "cityName": "港闸区",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320621",
                        "cityName": "海安县",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320623",
                        "cityName": "如东县",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320681",
                        "cityName": "启东市",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320682",
                        "cityName": "如皋市",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320683",
                        "cityName": "通州市",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320684",
                        "cityName": "海门市",
                        "provinceId": "320600"
                    },
                    {
                        "cityId": "320700",
                        "cityName": "连云港市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320701",
                        "cityName": "市辖区",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320703",
                        "cityName": "连云区",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320705",
                        "cityName": "新浦区",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320706",
                        "cityName": "海州区",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320721",
                        "cityName": "赣榆县",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320722",
                        "cityName": "东海县",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320723",
                        "cityName": "灌云县",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320724",
                        "cityName": "灌南县",
                        "provinceId": "320700"
                    },
                    {
                        "cityId": "320800",
                        "cityName": "淮安市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320801",
                        "cityName": "市辖区",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320802",
                        "cityName": "清河区",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320803",
                        "cityName": "楚州区",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320804",
                        "cityName": "淮阴区",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320811",
                        "cityName": "清浦区",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320826",
                        "cityName": "涟水县",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320829",
                        "cityName": "洪泽县",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320830",
                        "cityName": "盱眙县",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320831",
                        "cityName": "金湖县",
                        "provinceId": "320800"
                    },
                    {
                        "cityId": "320900",
                        "cityName": "盐城市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "320901",
                        "cityName": "市辖区",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320902",
                        "cityName": "亭湖区",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320903",
                        "cityName": "盐都区",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320921",
                        "cityName": "响水县",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320922",
                        "cityName": "滨海县",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320923",
                        "cityName": "阜宁县",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320924",
                        "cityName": "射阳县",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320925",
                        "cityName": "建湖县",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320981",
                        "cityName": "东台市",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "320982",
                        "cityName": "大丰市",
                        "provinceId": "320900"
                    },
                    {
                        "cityId": "321000",
                        "cityName": "扬州市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "321001",
                        "cityName": "市辖区",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321002",
                        "cityName": "广陵区",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321003",
                        "cityName": "邗江区",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321011",
                        "cityName": "郊区",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321023",
                        "cityName": "宝应县",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321081",
                        "cityName": "仪征市",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321084",
                        "cityName": "高邮市",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321088",
                        "cityName": "江都市",
                        "provinceId": "321000"
                    },
                    {
                        "cityId": "321100",
                        "cityName": "镇江市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "321101",
                        "cityName": "市辖区",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321102",
                        "cityName": "京口区",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321111",
                        "cityName": "润州区",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321112",
                        "cityName": "丹徒区",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321181",
                        "cityName": "丹阳市",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321182",
                        "cityName": "扬中市",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321183",
                        "cityName": "句容市",
                        "provinceId": "321100"
                    },
                    {
                        "cityId": "321200",
                        "cityName": "泰州市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "321201",
                        "cityName": "市辖区",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321202",
                        "cityName": "海陵区",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321203",
                        "cityName": "高港区",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321281",
                        "cityName": "兴化市",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321282",
                        "cityName": "靖江市",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321283",
                        "cityName": "泰兴市",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321284",
                        "cityName": "姜堰市",
                        "provinceId": "321200"
                    },
                    {
                        "cityId": "321300",
                        "cityName": "宿迁市",
                        "provinceId": "320000"
                    },
                    {
                        "cityId": "321301",
                        "cityName": "市辖区",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "321302",
                        "cityName": "宿城区",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "321311",
                        "cityName": "宿豫区",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "321322",
                        "cityName": "沭阳县",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "321323",
                        "cityName": "泗阳县",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "321324",
                        "cityName": "泗洪县",
                        "provinceId": "321300"
                    },
                    {
                        "cityId": "330100",
                        "cityName": "杭州市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330101",
                        "cityName": "市辖区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330102",
                        "cityName": "上城区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330103",
                        "cityName": "下城区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330104",
                        "cityName": "江干区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330105",
                        "cityName": "拱墅区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330106",
                        "cityName": "西湖区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330108",
                        "cityName": "滨江区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330109",
                        "cityName": "萧山区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330110",
                        "cityName": "余杭区",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330122",
                        "cityName": "桐庐县",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330127",
                        "cityName": "淳安县",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330182",
                        "cityName": "建德市",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330183",
                        "cityName": "富阳市",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330185",
                        "cityName": "临安市",
                        "provinceId": "330100"
                    },
                    {
                        "cityId": "330200",
                        "cityName": "宁波市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330201",
                        "cityName": "市辖区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330203",
                        "cityName": "海曙区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330204",
                        "cityName": "江东区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330205",
                        "cityName": "江北区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330206",
                        "cityName": "北仑区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330211",
                        "cityName": "镇海区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330212",
                        "cityName": "鄞州区",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330225",
                        "cityName": "象山县",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330226",
                        "cityName": "宁海县",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330281",
                        "cityName": "余姚市",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330282",
                        "cityName": "慈溪市",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330283",
                        "cityName": "奉化市",
                        "provinceId": "330200"
                    },
                    {
                        "cityId": "330300",
                        "cityName": "温州市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330301",
                        "cityName": "市辖区",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330302",
                        "cityName": "鹿城区",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330303",
                        "cityName": "龙湾区",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330304",
                        "cityName": "瓯海区",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330322",
                        "cityName": "洞头县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330324",
                        "cityName": "永嘉县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330326",
                        "cityName": "平阳县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330327",
                        "cityName": "苍南县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330328",
                        "cityName": "文成县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330329",
                        "cityName": "泰顺县",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330381",
                        "cityName": "瑞安市",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330382",
                        "cityName": "乐清市",
                        "provinceId": "330300"
                    },
                    {
                        "cityId": "330400",
                        "cityName": "嘉兴市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330401",
                        "cityName": "市辖区",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330402",
                        "cityName": "秀城区",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330411",
                        "cityName": "秀洲区",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330421",
                        "cityName": "嘉善县",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330424",
                        "cityName": "海盐县",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330481",
                        "cityName": "海宁市",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330482",
                        "cityName": "平湖市",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330483",
                        "cityName": "桐乡市",
                        "provinceId": "330400"
                    },
                    {
                        "cityId": "330500",
                        "cityName": "湖州市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330501",
                        "cityName": "市辖区",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330502",
                        "cityName": "吴兴区",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330503",
                        "cityName": "南浔区",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330521",
                        "cityName": "德清县",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330522",
                        "cityName": "长兴县",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330523",
                        "cityName": "安吉县",
                        "provinceId": "330500"
                    },
                    {
                        "cityId": "330600",
                        "cityName": "绍兴市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330601",
                        "cityName": "市辖区",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330602",
                        "cityName": "越城区",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330621",
                        "cityName": "绍兴县",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330624",
                        "cityName": "新昌县",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330681",
                        "cityName": "诸暨市",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330682",
                        "cityName": "上虞市",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330683",
                        "cityName": "嵊州市",
                        "provinceId": "330600"
                    },
                    {
                        "cityId": "330700",
                        "cityName": "金华市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330701",
                        "cityName": "市辖区",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330702",
                        "cityName": "婺城区",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330703",
                        "cityName": "金东区",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330723",
                        "cityName": "武义县",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330726",
                        "cityName": "浦江县",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330727",
                        "cityName": "磐安县",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330781",
                        "cityName": "兰溪市",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330782",
                        "cityName": "义乌市",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330783",
                        "cityName": "东阳市",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330784",
                        "cityName": "永康市",
                        "provinceId": "330700"
                    },
                    {
                        "cityId": "330800",
                        "cityName": "衢州市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330801",
                        "cityName": "市辖区",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330802",
                        "cityName": "柯城区",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330803",
                        "cityName": "衢江区",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330822",
                        "cityName": "常山县",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330824",
                        "cityName": "开化县",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330825",
                        "cityName": "龙游县",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330881",
                        "cityName": "江山市",
                        "provinceId": "330800"
                    },
                    {
                        "cityId": "330900",
                        "cityName": "舟山市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "330901",
                        "cityName": "市辖区",
                        "provinceId": "330900"
                    },
                    {
                        "cityId": "330902",
                        "cityName": "定海区",
                        "provinceId": "330900"
                    },
                    {
                        "cityId": "330903",
                        "cityName": "普陀区",
                        "provinceId": "330900"
                    },
                    {
                        "cityId": "330921",
                        "cityName": "岱山县",
                        "provinceId": "330900"
                    },
                    {
                        "cityId": "330922",
                        "cityName": "嵊泗县",
                        "provinceId": "330900"
                    },
                    {
                        "cityId": "331000",
                        "cityName": "台州市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "331001",
                        "cityName": "市辖区",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331002",
                        "cityName": "椒江区",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331003",
                        "cityName": "黄岩区",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331004",
                        "cityName": "路桥区",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331021",
                        "cityName": "玉环县",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331022",
                        "cityName": "三门县",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331023",
                        "cityName": "天台县",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331024",
                        "cityName": "仙居县",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331081",
                        "cityName": "温岭市",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331082",
                        "cityName": "临海市",
                        "provinceId": "331000"
                    },
                    {
                        "cityId": "331100",
                        "cityName": "丽水市",
                        "provinceId": "330000"
                    },
                    {
                        "cityId": "331101",
                        "cityName": "市辖区",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331102",
                        "cityName": "莲都区",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331121",
                        "cityName": "青田县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331122",
                        "cityName": "缙云县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331123",
                        "cityName": "遂昌县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331124",
                        "cityName": "松阳县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331125",
                        "cityName": "云和县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331126",
                        "cityName": "庆元县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331127",
                        "cityName": "景宁畲族自治县",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "331181",
                        "cityName": "龙泉市",
                        "provinceId": "331100"
                    },
                    {
                        "cityId": "340100",
                        "cityName": "合肥市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340101",
                        "cityName": "市辖区",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340102",
                        "cityName": "瑶海区",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340103",
                        "cityName": "庐阳区",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340104",
                        "cityName": "蜀山区",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340111",
                        "cityName": "包河区",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340121",
                        "cityName": "长丰县",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340122",
                        "cityName": "肥东县",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340123",
                        "cityName": "肥西县",
                        "provinceId": "340100"
                    },
                    {
                        "cityId": "340200",
                        "cityName": "芜湖市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340201",
                        "cityName": "市辖区",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340202",
                        "cityName": "镜湖区",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340203",
                        "cityName": "马塘区",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340204",
                        "cityName": "新芜区",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340207",
                        "cityName": "鸠江区",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340221",
                        "cityName": "芜湖县",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340222",
                        "cityName": "繁昌县",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340223",
                        "cityName": "南陵县",
                        "provinceId": "340200"
                    },
                    {
                        "cityId": "340300",
                        "cityName": "蚌埠市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340301",
                        "cityName": "市辖区",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340302",
                        "cityName": "龙子湖区",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340303",
                        "cityName": "蚌山区",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340304",
                        "cityName": "禹会区",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340311",
                        "cityName": "淮上区",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340321",
                        "cityName": "怀远县",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340322",
                        "cityName": "五河县",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340323",
                        "cityName": "固镇县",
                        "provinceId": "340300"
                    },
                    {
                        "cityId": "340400",
                        "cityName": "淮南市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340401",
                        "cityName": "市辖区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340402",
                        "cityName": "大通区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340403",
                        "cityName": "田家庵区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340404",
                        "cityName": "谢家集区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340405",
                        "cityName": "八公山区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340406",
                        "cityName": "潘集区",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340421",
                        "cityName": "凤台县",
                        "provinceId": "340400"
                    },
                    {
                        "cityId": "340500",
                        "cityName": "马鞍山市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340501",
                        "cityName": "市辖区",
                        "provinceId": "340500"
                    },
                    {
                        "cityId": "340502",
                        "cityName": "金家庄区",
                        "provinceId": "340500"
                    },
                    {
                        "cityId": "340503",
                        "cityName": "花山区",
                        "provinceId": "340500"
                    },
                    {
                        "cityId": "340504",
                        "cityName": "雨山区",
                        "provinceId": "340500"
                    },
                    {
                        "cityId": "340521",
                        "cityName": "当涂县",
                        "provinceId": "340500"
                    },
                    {
                        "cityId": "340600",
                        "cityName": "淮北市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340601",
                        "cityName": "市辖区",
                        "provinceId": "340600"
                    },
                    {
                        "cityId": "340602",
                        "cityName": "杜集区",
                        "provinceId": "340600"
                    },
                    {
                        "cityId": "340603",
                        "cityName": "相山区",
                        "provinceId": "340600"
                    },
                    {
                        "cityId": "340604",
                        "cityName": "烈山区",
                        "provinceId": "340600"
                    },
                    {
                        "cityId": "340621",
                        "cityName": "濉溪县",
                        "provinceId": "340600"
                    },
                    {
                        "cityId": "340700",
                        "cityName": "铜陵市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340701",
                        "cityName": "市辖区",
                        "provinceId": "340700"
                    },
                    {
                        "cityId": "340702",
                        "cityName": "铜官山区",
                        "provinceId": "340700"
                    },
                    {
                        "cityId": "340703",
                        "cityName": "狮子山区",
                        "provinceId": "340700"
                    },
                    {
                        "cityId": "340711",
                        "cityName": "郊区",
                        "provinceId": "340700"
                    },
                    {
                        "cityId": "340721",
                        "cityName": "铜陵县",
                        "provinceId": "340700"
                    },
                    {
                        "cityId": "340800",
                        "cityName": "安庆市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "340801",
                        "cityName": "市辖区",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340802",
                        "cityName": "迎江区",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340803",
                        "cityName": "大观区",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340811",
                        "cityName": "郊区",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340822",
                        "cityName": "怀宁县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340823",
                        "cityName": "枞阳县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340824",
                        "cityName": "潜山县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340825",
                        "cityName": "太湖县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340826",
                        "cityName": "宿松县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340827",
                        "cityName": "望江县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340828",
                        "cityName": "岳西县",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "340881",
                        "cityName": "桐城市",
                        "provinceId": "340800"
                    },
                    {
                        "cityId": "341000",
                        "cityName": "黄山市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341001",
                        "cityName": "市辖区",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341002",
                        "cityName": "屯溪区",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341003",
                        "cityName": "黄山区",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341004",
                        "cityName": "徽州区",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341021",
                        "cityName": "歙县",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341022",
                        "cityName": "休宁县",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341023",
                        "cityName": "黟县",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341024",
                        "cityName": "祁门县",
                        "provinceId": "341000"
                    },
                    {
                        "cityId": "341100",
                        "cityName": "滁州市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341101",
                        "cityName": "市辖区",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341102",
                        "cityName": "琅琊区",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341103",
                        "cityName": "南谯区",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341122",
                        "cityName": "来安县",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341124",
                        "cityName": "全椒县",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341125",
                        "cityName": "定远县",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341126",
                        "cityName": "凤阳县",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341181",
                        "cityName": "天长市",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341182",
                        "cityName": "明光市",
                        "provinceId": "341100"
                    },
                    {
                        "cityId": "341200",
                        "cityName": "阜阳市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341201",
                        "cityName": "市辖区",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341202",
                        "cityName": "颍州区",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341203",
                        "cityName": "颍东区",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341204",
                        "cityName": "颍泉区",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341221",
                        "cityName": "临泉县",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341222",
                        "cityName": "太和县",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341225",
                        "cityName": "阜南县",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341226",
                        "cityName": "颍上县",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341282",
                        "cityName": "界首市",
                        "provinceId": "341200"
                    },
                    {
                        "cityId": "341300",
                        "cityName": "宿州市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341301",
                        "cityName": "市辖区",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341302",
                        "cityName": "墉桥区",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341321",
                        "cityName": "砀山县",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341322",
                        "cityName": "萧县",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341323",
                        "cityName": "灵璧县",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341324",
                        "cityName": "泗县",
                        "provinceId": "341300"
                    },
                    {
                        "cityId": "341400",
                        "cityName": "巢湖市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341401",
                        "cityName": "市辖区",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341402",
                        "cityName": "居巢区",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341421",
                        "cityName": "庐江县",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341422",
                        "cityName": "无为县",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341423",
                        "cityName": "含山县",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341424",
                        "cityName": "和县",
                        "provinceId": "341400"
                    },
                    {
                        "cityId": "341500",
                        "cityName": "六安市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341501",
                        "cityName": "市辖区",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341502",
                        "cityName": "金安区",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341503",
                        "cityName": "裕安区",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341521",
                        "cityName": "寿县",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341522",
                        "cityName": "霍邱县",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341523",
                        "cityName": "舒城县",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341524",
                        "cityName": "金寨县",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341525",
                        "cityName": "霍山县",
                        "provinceId": "341500"
                    },
                    {
                        "cityId": "341600",
                        "cityName": "亳州市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341601",
                        "cityName": "市辖区",
                        "provinceId": "341600"
                    },
                    {
                        "cityId": "341602",
                        "cityName": "谯城区",
                        "provinceId": "341600"
                    },
                    {
                        "cityId": "341621",
                        "cityName": "涡阳县",
                        "provinceId": "341600"
                    },
                    {
                        "cityId": "341622",
                        "cityName": "蒙城县",
                        "provinceId": "341600"
                    },
                    {
                        "cityId": "341623",
                        "cityName": "利辛县",
                        "provinceId": "341600"
                    },
                    {
                        "cityId": "341700",
                        "cityName": "池州市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341701",
                        "cityName": "市辖区",
                        "provinceId": "341700"
                    },
                    {
                        "cityId": "341702",
                        "cityName": "贵池区",
                        "provinceId": "341700"
                    },
                    {
                        "cityId": "341721",
                        "cityName": "东至县",
                        "provinceId": "341700"
                    },
                    {
                        "cityId": "341722",
                        "cityName": "石台县",
                        "provinceId": "341700"
                    },
                    {
                        "cityId": "341723",
                        "cityName": "青阳县",
                        "provinceId": "341700"
                    },
                    {
                        "cityId": "341800",
                        "cityName": "宣城市",
                        "provinceId": "340000"
                    },
                    {
                        "cityId": "341801",
                        "cityName": "市辖区",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341802",
                        "cityName": "宣州区",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341821",
                        "cityName": "郎溪县",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341822",
                        "cityName": "广德县",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341823",
                        "cityName": "泾县",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341824",
                        "cityName": "绩溪县",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341825",
                        "cityName": "旌德县",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "341881",
                        "cityName": "宁国市",
                        "provinceId": "341800"
                    },
                    {
                        "cityId": "350100",
                        "cityName": "福州市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350101",
                        "cityName": "市辖区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350102",
                        "cityName": "鼓楼区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350103",
                        "cityName": "台江区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350104",
                        "cityName": "仓山区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350105",
                        "cityName": "马尾区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350111",
                        "cityName": "晋安区",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350121",
                        "cityName": "闽侯县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350122",
                        "cityName": "连江县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350123",
                        "cityName": "罗源县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350124",
                        "cityName": "闽清县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350125",
                        "cityName": "永泰县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350128",
                        "cityName": "平潭县",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350181",
                        "cityName": "福清市",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350182",
                        "cityName": "长乐市",
                        "provinceId": "350100"
                    },
                    {
                        "cityId": "350200",
                        "cityName": "厦门市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350201",
                        "cityName": "市辖区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350203",
                        "cityName": "思明区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350205",
                        "cityName": "海沧区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350206",
                        "cityName": "湖里区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350211",
                        "cityName": "集美区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350212",
                        "cityName": "同安区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350213",
                        "cityName": "翔安区",
                        "provinceId": "350200"
                    },
                    {
                        "cityId": "350300",
                        "cityName": "莆田市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350301",
                        "cityName": "市辖区",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350302",
                        "cityName": "城厢区",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350303",
                        "cityName": "涵江区",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350304",
                        "cityName": "荔城区",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350305",
                        "cityName": "秀屿区",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350322",
                        "cityName": "仙游县",
                        "provinceId": "350300"
                    },
                    {
                        "cityId": "350400",
                        "cityName": "三明市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350401",
                        "cityName": "市辖区",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350402",
                        "cityName": "梅列区",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350403",
                        "cityName": "三元区",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350421",
                        "cityName": "明溪县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350423",
                        "cityName": "清流县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350424",
                        "cityName": "宁化县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350425",
                        "cityName": "大田县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350426",
                        "cityName": "尤溪县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350427",
                        "cityName": "沙县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350428",
                        "cityName": "将乐县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350429",
                        "cityName": "泰宁县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350430",
                        "cityName": "建宁县",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350481",
                        "cityName": "永安市",
                        "provinceId": "350400"
                    },
                    {
                        "cityId": "350500",
                        "cityName": "泉州市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350501",
                        "cityName": "市辖区",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350502",
                        "cityName": "鲤城区",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350503",
                        "cityName": "丰泽区",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350504",
                        "cityName": "洛江区",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350505",
                        "cityName": "泉港区",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350521",
                        "cityName": "惠安县",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350524",
                        "cityName": "安溪县",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350525",
                        "cityName": "永春县",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350526",
                        "cityName": "德化县",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350527",
                        "cityName": "金门县",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350581",
                        "cityName": "石狮市",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350582",
                        "cityName": "晋江市",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350583",
                        "cityName": "南安市",
                        "provinceId": "350500"
                    },
                    {
                        "cityId": "350600",
                        "cityName": "漳州市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350601",
                        "cityName": "市辖区",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350602",
                        "cityName": "芗城区",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350603",
                        "cityName": "龙文区",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350622",
                        "cityName": "云霄县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350623",
                        "cityName": "漳浦县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350624",
                        "cityName": "诏安县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350625",
                        "cityName": "长泰县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350626",
                        "cityName": "东山县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350627",
                        "cityName": "南靖县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350628",
                        "cityName": "平和县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350629",
                        "cityName": "华安县",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350681",
                        "cityName": "龙海市",
                        "provinceId": "350600"
                    },
                    {
                        "cityId": "350700",
                        "cityName": "南平市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350701",
                        "cityName": "市辖区",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350702",
                        "cityName": "延平区",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350721",
                        "cityName": "顺昌县",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350722",
                        "cityName": "浦城县",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350723",
                        "cityName": "光泽县",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350724",
                        "cityName": "松溪县",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350725",
                        "cityName": "政和县",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350781",
                        "cityName": "邵武市",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350782",
                        "cityName": "武夷山市",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350783",
                        "cityName": "建瓯市",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350784",
                        "cityName": "建阳市",
                        "provinceId": "350700"
                    },
                    {
                        "cityId": "350800",
                        "cityName": "龙岩市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350801",
                        "cityName": "市辖区",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350802",
                        "cityName": "新罗区",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350821",
                        "cityName": "长汀县",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350822",
                        "cityName": "永定县",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350823",
                        "cityName": "上杭县",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350824",
                        "cityName": "武平县",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350825",
                        "cityName": "连城县",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350881",
                        "cityName": "漳平市",
                        "provinceId": "350800"
                    },
                    {
                        "cityId": "350900",
                        "cityName": "宁德市",
                        "provinceId": "350000"
                    },
                    {
                        "cityId": "350901",
                        "cityName": "市辖区",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350902",
                        "cityName": "蕉城区",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350921",
                        "cityName": "霞浦县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350922",
                        "cityName": "古田县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350923",
                        "cityName": "屏南县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350924",
                        "cityName": "寿宁县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350925",
                        "cityName": "周宁县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350926",
                        "cityName": "柘荣县",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350981",
                        "cityName": "福安市",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "350982",
                        "cityName": "福鼎市",
                        "provinceId": "350900"
                    },
                    {
                        "cityId": "360100",
                        "cityName": "南昌市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360101",
                        "cityName": "市辖区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360102",
                        "cityName": "东湖区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360103",
                        "cityName": "西湖区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360104",
                        "cityName": "青云谱区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360105",
                        "cityName": "湾里区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360111",
                        "cityName": "青山湖区",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360121",
                        "cityName": "南昌县",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360122",
                        "cityName": "新建县",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360123",
                        "cityName": "安义县",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360124",
                        "cityName": "进贤县",
                        "provinceId": "360100"
                    },
                    {
                        "cityId": "360200",
                        "cityName": "景德镇市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360201",
                        "cityName": "市辖区",
                        "provinceId": "360200"
                    },
                    {
                        "cityId": "360202",
                        "cityName": "昌江区",
                        "provinceId": "360200"
                    },
                    {
                        "cityId": "360203",
                        "cityName": "珠山区",
                        "provinceId": "360200"
                    },
                    {
                        "cityId": "360222",
                        "cityName": "浮梁县",
                        "provinceId": "360200"
                    },
                    {
                        "cityId": "360281",
                        "cityName": "乐平市",
                        "provinceId": "360200"
                    },
                    {
                        "cityId": "360300",
                        "cityName": "萍乡市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360301",
                        "cityName": "市辖区",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360302",
                        "cityName": "安源区",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360313",
                        "cityName": "湘东区",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360321",
                        "cityName": "莲花县",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360322",
                        "cityName": "上栗县",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360323",
                        "cityName": "芦溪县",
                        "provinceId": "360300"
                    },
                    {
                        "cityId": "360400",
                        "cityName": "九江市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360401",
                        "cityName": "市辖区",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360402",
                        "cityName": "庐山区",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360403",
                        "cityName": "浔阳区",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360421",
                        "cityName": "九江县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360423",
                        "cityName": "武宁县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360424",
                        "cityName": "修水县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360425",
                        "cityName": "永修县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360426",
                        "cityName": "德安县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360427",
                        "cityName": "星子县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360428",
                        "cityName": "都昌县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360429",
                        "cityName": "湖口县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360430",
                        "cityName": "彭泽县",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360481",
                        "cityName": "瑞昌市",
                        "provinceId": "360400"
                    },
                    {
                        "cityId": "360500",
                        "cityName": "新余市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360501",
                        "cityName": "市辖区",
                        "provinceId": "360500"
                    },
                    {
                        "cityId": "360502",
                        "cityName": "渝水区",
                        "provinceId": "360500"
                    },
                    {
                        "cityId": "360521",
                        "cityName": "分宜县",
                        "provinceId": "360500"
                    },
                    {
                        "cityId": "360600",
                        "cityName": "鹰潭市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360601",
                        "cityName": "市辖区",
                        "provinceId": "360600"
                    },
                    {
                        "cityId": "360602",
                        "cityName": "月湖区",
                        "provinceId": "360600"
                    },
                    {
                        "cityId": "360622",
                        "cityName": "余江县",
                        "provinceId": "360600"
                    },
                    {
                        "cityId": "360681",
                        "cityName": "贵溪市",
                        "provinceId": "360600"
                    },
                    {
                        "cityId": "360700",
                        "cityName": "赣州市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360701",
                        "cityName": "市辖区",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360702",
                        "cityName": "章贡区",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360721",
                        "cityName": "赣县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360722",
                        "cityName": "信丰县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360723",
                        "cityName": "大余县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360724",
                        "cityName": "上犹县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360725",
                        "cityName": "崇义县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360726",
                        "cityName": "安远县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360727",
                        "cityName": "龙南县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360728",
                        "cityName": "定南县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360729",
                        "cityName": "全南县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360730",
                        "cityName": "宁都县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360731",
                        "cityName": "于都县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360732",
                        "cityName": "兴国县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360733",
                        "cityName": "会昌县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360734",
                        "cityName": "寻乌县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360735",
                        "cityName": "石城县",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360781",
                        "cityName": "瑞金市",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360782",
                        "cityName": "南康市",
                        "provinceId": "360700"
                    },
                    {
                        "cityId": "360800",
                        "cityName": "吉安市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360801",
                        "cityName": "市辖区",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360802",
                        "cityName": "吉州区",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360803",
                        "cityName": "青原区",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360821",
                        "cityName": "吉安县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360822",
                        "cityName": "吉水县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360823",
                        "cityName": "峡江县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360824",
                        "cityName": "新干县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360825",
                        "cityName": "永丰县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360826",
                        "cityName": "泰和县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360827",
                        "cityName": "遂川县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360828",
                        "cityName": "万安县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360829",
                        "cityName": "安福县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360830",
                        "cityName": "永新县",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360881",
                        "cityName": "井冈山市",
                        "provinceId": "360800"
                    },
                    {
                        "cityId": "360900",
                        "cityName": "宜春市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "360901",
                        "cityName": "市辖区",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360902",
                        "cityName": "袁州区",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360921",
                        "cityName": "奉新县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360922",
                        "cityName": "万载县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360923",
                        "cityName": "上高县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360924",
                        "cityName": "宜丰县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360925",
                        "cityName": "靖安县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360926",
                        "cityName": "铜鼓县",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360981",
                        "cityName": "丰城市",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360982",
                        "cityName": "樟树市",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "360983",
                        "cityName": "高安市",
                        "provinceId": "360900"
                    },
                    {
                        "cityId": "361000",
                        "cityName": "抚州市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "361001",
                        "cityName": "市辖区",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361002",
                        "cityName": "临川区",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361021",
                        "cityName": "南城县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361022",
                        "cityName": "黎川县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361023",
                        "cityName": "南丰县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361024",
                        "cityName": "崇仁县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361025",
                        "cityName": "乐安县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361026",
                        "cityName": "宜黄县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361027",
                        "cityName": "金溪县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361028",
                        "cityName": "资溪县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361029",
                        "cityName": "东乡县",
                        "provinceId": "361000"
                    },
                    {
                        "cityId": "361100",
                        "cityName": "上饶市",
                        "provinceId": "360000"
                    },
                    {
                        "cityId": "370100",
                        "cityName": "济南市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370200",
                        "cityName": "青岛市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370300",
                        "cityName": "淄博市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370400",
                        "cityName": "枣庄市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370500",
                        "cityName": "东营市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370600",
                        "cityName": "烟台市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370700",
                        "cityName": "潍坊市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370800",
                        "cityName": "济宁市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "370900",
                        "cityName": "泰安市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371000",
                        "cityName": "威海市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371100",
                        "cityName": "日照市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371200",
                        "cityName": "莱芜市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371300",
                        "cityName": "临沂市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371400",
                        "cityName": "德州市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371500",
                        "cityName": "聊城市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371600",
                        "cityName": "滨州市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "371700",
                        "cityName": "荷泽市",
                        "provinceId": "370000"
                    },
                    {
                        "cityId": "410100",
                        "cityName": "郑州市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410200",
                        "cityName": "开封市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410300",
                        "cityName": "洛阳市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410400",
                        "cityName": "平顶山市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410500",
                        "cityName": "安阳市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410600",
                        "cityName": "鹤壁市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410700",
                        "cityName": "新乡市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410800",
                        "cityName": "焦作市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "410900",
                        "cityName": "濮阳市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411000",
                        "cityName": "许昌市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411100",
                        "cityName": "漯河市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411200",
                        "cityName": "三门峡市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411300",
                        "cityName": "南阳市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411400",
                        "cityName": "商丘市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411500",
                        "cityName": "信阳市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411600",
                        "cityName": "周口市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "411700",
                        "cityName": "驻马店市",
                        "provinceId": "410000"
                    },
                    {
                        "cityId": "420100",
                        "cityName": "武汉市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420200",
                        "cityName": "黄石市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420300",
                        "cityName": "十堰市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420500",
                        "cityName": "宜昌市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420600",
                        "cityName": "襄樊市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420700",
                        "cityName": "鄂州市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420800",
                        "cityName": "荆门市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "420900",
                        "cityName": "孝感市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "421000",
                        "cityName": "荆州市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "421100",
                        "cityName": "黄冈市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "421200",
                        "cityName": "咸宁市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "421300",
                        "cityName": "随州市",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "422800",
                        "cityName": "恩施土家族苗族自治州",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "429000",
                        "cityName": "省直辖行政单位",
                        "provinceId": "420000"
                    },
                    {
                        "cityId": "430100",
                        "cityName": "长沙市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430200",
                        "cityName": "株洲市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430300",
                        "cityName": "湘潭市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430400",
                        "cityName": "衡阳市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430500",
                        "cityName": "邵阳市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430600",
                        "cityName": "岳阳市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430700",
                        "cityName": "常德市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430800",
                        "cityName": "张家界市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "430900",
                        "cityName": "益阳市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "431000",
                        "cityName": "郴州市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "431100",
                        "cityName": "永州市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "431200",
                        "cityName": "怀化市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "431300",
                        "cityName": "娄底市",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "433100",
                        "cityName": "湘西土家族苗族自治州",
                        "provinceId": "430000"
                    },
                    {
                        "cityId": "440100",
                        "cityName": "广州市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440200",
                        "cityName": "韶关市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440300",
                        "cityName": "深圳市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440400",
                        "cityName": "珠海市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440500",
                        "cityName": "汕头市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440600",
                        "cityName": "佛山市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440700",
                        "cityName": "江门市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440800",
                        "cityName": "湛江市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "440900",
                        "cityName": "茂名市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441200",
                        "cityName": "肇庆市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441300",
                        "cityName": "惠州市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441400",
                        "cityName": "梅州市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441500",
                        "cityName": "汕尾市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441600",
                        "cityName": "河源市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441700",
                        "cityName": "阳江市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441800",
                        "cityName": "清远市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "441900",
                        "cityName": "东莞市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "442000",
                        "cityName": "中山市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "445100",
                        "cityName": "潮州市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "445200",
                        "cityName": "揭阳市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "445300",
                        "cityName": "云浮市",
                        "provinceId": "440000"
                    },
                    {
                        "cityId": "450100",
                        "cityName": "南宁市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450200",
                        "cityName": "柳州市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450300",
                        "cityName": "桂林市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450400",
                        "cityName": "梧州市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450500",
                        "cityName": "北海市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450600",
                        "cityName": "防城港市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450700",
                        "cityName": "钦州市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450800",
                        "cityName": "贵港市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "450900",
                        "cityName": "玉林市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "451000",
                        "cityName": "百色市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "451100",
                        "cityName": "贺州市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "451200",
                        "cityName": "河池市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "451300",
                        "cityName": "来宾市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "451400",
                        "cityName": "崇左市",
                        "provinceId": "450000"
                    },
                    {
                        "cityId": "460100",
                        "cityName": "海口市",
                        "provinceId": "460000"
                    },
                    {
                        "cityId": "460200",
                        "cityName": "三亚市",
                        "provinceId": "460000"
                    },
                    {
                        "cityId": "469000",
                        "cityName": "省直辖县级行政单位",
                        "provinceId": "460000"
                    },
                    {
                        "cityId": "500100",
                        "cityName": "重庆市",
                        "provinceId": "500000"
                    },
                    {
                        "cityId": "510100",
                        "cityName": "成都市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510300",
                        "cityName": "自贡市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510400",
                        "cityName": "攀枝花市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510500",
                        "cityName": "泸州市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510600",
                        "cityName": "德阳市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510700",
                        "cityName": "绵阳市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510800",
                        "cityName": "广元市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "510900",
                        "cityName": "遂宁市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511000",
                        "cityName": "内江市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511100",
                        "cityName": "乐山市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511300",
                        "cityName": "南充市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511400",
                        "cityName": "眉山市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511500",
                        "cityName": "宜宾市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511600",
                        "cityName": "广安市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511700",
                        "cityName": "达州市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511800",
                        "cityName": "雅安市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "511900",
                        "cityName": "巴中市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "512000",
                        "cityName": "资阳市",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "513200",
                        "cityName": "阿坝藏族羌族自治州",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "513300",
                        "cityName": "甘孜藏族自治州",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "513400",
                        "cityName": "凉山彝族自治州",
                        "provinceId": "510000"
                    },
                    {
                        "cityId": "520100",
                        "cityName": "贵阳市",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "520200",
                        "cityName": "六盘水市",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "520300",
                        "cityName": "遵义市",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "520400",
                        "cityName": "安顺市",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "522200",
                        "cityName": "铜仁地区",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "522300",
                        "cityName": "黔西南布依族苗族自治州",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "522400",
                        "cityName": "毕节地区",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "522600",
                        "cityName": "黔东南苗族侗族自治州",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "522700",
                        "cityName": "黔南布依族苗族自治州",
                        "provinceId": "520000"
                    },
                    {
                        "cityId": "530100",
                        "cityName": "昆明市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530300",
                        "cityName": "曲靖市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530400",
                        "cityName": "玉溪市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530500",
                        "cityName": "保山市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530600",
                        "cityName": "昭通市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530700",
                        "cityName": "丽江市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530800",
                        "cityName": "思茅市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "530900",
                        "cityName": "临沧市",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "532300",
                        "cityName": "楚雄彝族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "532500",
                        "cityName": "红河哈尼族彝族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "532600",
                        "cityName": "文山壮族苗族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "532800",
                        "cityName": "西双版纳傣族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "532900",
                        "cityName": "大理白族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "533100",
                        "cityName": "德宏傣族景颇族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "533300",
                        "cityName": "怒江傈僳族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "533400",
                        "cityName": "迪庆藏族自治州",
                        "provinceId": "530000"
                    },
                    {
                        "cityId": "540100",
                        "cityName": "拉萨市",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542100",
                        "cityName": "昌都地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542200",
                        "cityName": "山南地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542300",
                        "cityName": "日喀则地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542400",
                        "cityName": "那曲地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542500",
                        "cityName": "阿里地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "542600",
                        "cityName": "林芝地区",
                        "provinceId": "540000"
                    },
                    {
                        "cityId": "610100",
                        "cityName": "西安市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610200",
                        "cityName": "铜川市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610300",
                        "cityName": "宝鸡市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610400",
                        "cityName": "咸阳市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610500",
                        "cityName": "渭南市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610600",
                        "cityName": "延安市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610700",
                        "cityName": "汉中市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610800",
                        "cityName": "榆林市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "610900",
                        "cityName": "安康市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "611000",
                        "cityName": "商洛市",
                        "provinceId": "610000"
                    },
                    {
                        "cityId": "620100",
                        "cityName": "兰州市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620200",
                        "cityName": "嘉峪关市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620300",
                        "cityName": "金昌市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620400",
                        "cityName": "白银市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620500",
                        "cityName": "天水市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620600",
                        "cityName": "武威市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620700",
                        "cityName": "张掖市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620800",
                        "cityName": "平凉市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "620900",
                        "cityName": "酒泉市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "621000",
                        "cityName": "庆阳市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "621100",
                        "cityName": "定西市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "621200",
                        "cityName": "陇南市",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "622900",
                        "cityName": "临夏回族自治州",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "623000",
                        "cityName": "甘南藏族自治州",
                        "provinceId": "620000"
                    },
                    {
                        "cityId": "630100",
                        "cityName": "西宁市",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632100",
                        "cityName": "海东地区",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632200",
                        "cityName": "海北藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632300",
                        "cityName": "黄南藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632500",
                        "cityName": "海南藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632600",
                        "cityName": "果洛藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632700",
                        "cityName": "玉树藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "632800",
                        "cityName": "海西蒙古族藏族自治州",
                        "provinceId": "630000"
                    },
                    {
                        "cityId": "640100",
                        "cityName": "银川市",
                        "provinceId": "640000"
                    },
                    {
                        "cityId": "640200",
                        "cityName": "石嘴山市",
                        "provinceId": "640000"
                    },
                    {
                        "cityId": "640300",
                        "cityName": "吴忠市",
                        "provinceId": "640000"
                    },
                    {
                        "cityId": "640400",
                        "cityName": "固原市",
                        "provinceId": "640000"
                    },
                    {
                        "cityId": "640500",
                        "cityName": "中卫市",
                        "provinceId": "640000"
                    },
                    {
                        "cityId": "650100",
                        "cityName": "乌鲁木齐市",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "650200",
                        "cityName": "克拉玛依市",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652100",
                        "cityName": "吐鲁番地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652200",
                        "cityName": "哈密地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652300",
                        "cityName": "昌吉回族自治州",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652700",
                        "cityName": "博尔塔拉蒙古自治州",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652800",
                        "cityName": "巴音郭楞蒙古自治州",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "652900",
                        "cityName": "阿克苏地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "653000",
                        "cityName": "克孜勒苏柯尔克孜自治州",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "653100",
                        "cityName": "喀什地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "653200",
                        "cityName": "和田地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "654000",
                        "cityName": "伊犁哈萨克自治州",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "654200",
                        "cityName": "塔城地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "654300",
                        "cityName": "阿勒泰地区",
                        "provinceId": "650000"
                    },
                    {
                        "cityId": "659000",
                        "cityName": "省直辖行政单位",
                        "provinceId": "650000"
                    }
                ],
                provinceOption : {
                    maxY: 0,
                    minY: 0,
                    y : 0,
                    lastY: 0,
                    lastChooseItem : 0,
                    chooseItem: 0
                },
                cityOption : {
                    maxY: 0,
                    minY: 0,
                    y : 0,
                    lastY: 0,
                    lastChooseItem : 0,
                    chooseItem: 0
                }
            }
        },
        ready(){
            this.screenHeight = document.getElementsByClassName("content")[0].offsetHeight;
            this.baseHeight = document.getElementsByClassName("content")[0].firstElementChild.firstElementChild.offsetHeight;
            this.provinceOption.minY = this.screenHeight - this.baseHeight * (this.provinceList.length + 4);
        },
        watch : {
            "provinceOption.chooseItem" : function (){
                var _arr = this.cityList.filter((o)=>{
                    return o.provinceId == this.provinceList[this.provinceOption.chooseItem].provinceId;
                });
                //更新一些数据
                this.cityOption.minY = this.screenHeight - this.baseHeight * (_arr.length + 4);
                this.cityOption.y = 0;
                this.cityOption.lastY = 0;
                this.cityOption.lastChooseItem = 0;
                this.cityOption.chooseItem = 0;
            }
        },
        computed: {
            styleObject : function () {
                var _this = this;
                return {
                    "-webkit-transform": "translate3d(0,"+_this.provinceOption.y+"px, 0)",
                    "transform" : "translate3d(0, "+_this.provinceOption.y+"px, 0)"
                }
            },
            cityStyleObject : function () {
                var _this = this;
                return {
                    "-webkit-transform": "translate3d(0,"+_this.cityOption.y+"px, 0)",
                    "transform" : "translate3d(0, "+_this.cityOption.y+"px, 0)"
                }
            },
            provinceId : function () {
                return this.provinceList[this.provinceOption.chooseItem].provinceId;
            }
        },
        methods: {
            cancel(e){
                this.$dispatch('select.cancel');
            },
            sure(e){
                var _arr = this.cityList.filter((o)=>{
                    return o.provinceId == this.provinceList[this.provinceOption.chooseItem].provinceId;
                });
                this.$dispatch('select.choose', {
                    province : this.provinceList[this.provinceOption.chooseItem],
                    city : _arr[this.cityOption.chooseItem]
                });
            },
            touchstart(e, config){
                if (!e.touches.length) return;
                var touch = e.touches[0];
                touchStartX = touch.pageX;
                touchStartY = touch.pageY;
            },
            touchend(e, config){
                //初始化touch的参数
                touchStartX = 0;
                touchStartY = 0;
                incrementX = 0;
                incrementY = 0;
                //如果移动到某项的上下一半高度内，停止移动后自动选择此项
                config.y =  Math.round(config.y/this.baseHeight)*this.baseHeight;
                //记录上一次的位置
                config.lastY = config.y;
                //更新上一次选中的位置
                config.lastChooseItem = - Math.round(config.y/this.baseHeight);
            },
            touchmove(e, config){
                var _this = this;
                if (!e.touches.length) return;
                var touch = e.touches[0];
                incrementX = touch.pageX - touchStartX;
                incrementY = touch.pageY - touchStartY;
                //这里是为了手指一定是垂直滚动的,原理是计算Y位置的偏移要比X的偏移大
                if (Math.abs(incrementY) > Math.abs(incrementX)) {
                    //移位大于10才算动了
                    if(Math.abs(incrementY) > 10){
                        let _y = config.lastY + incrementY;
                        if(_y >= config.minY && _y <= config.maxY){
                            //计算当前选中的那一项
                            config.chooseItem = config.lastChooseItem - Math.round(incrementY/_this.baseHeight);
                            //设置当前偏移高度
                            config.y = _y;
                        }
                    }
                }
            }
        }
    }
</script>
<style src="./select.scss" lang="scss" scoped></style>
