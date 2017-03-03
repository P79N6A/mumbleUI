/*!
 * Ui.webank v1.0.0
 * (c) 2016 harrywan
 * Released under the MIT License.
 */
require("./styles/index.scss") ;

import WbButton from './components/button';
import Banner from './components/banner';
import { DataTable, SortTable, TreeTable, TableColumn} from './components/dataTable';
import DatePicker from './components/datePicker';
import Loading from './components/loading';
import Message from './components/message';
import Modal from './components/modal';
import Switch from './components/switch';
import Toast from './components/toast';
import Tree from './components/tree';
import Upload from './components/upload';
import Zoom from './components/zoom';
import {Steps, Step} from './components/step';
import Tooltip from './components/tooltip';
import {Tabs, Tab} from './components/tab';
import Pagination from './components/pagination';
import { Row, Cell} from './components/layout';
import Icon from './components/icon';
import WbInput from './components/input';
import {WbSelect, WbOption, OptionGroup} from './components/select';
import {Radio, RadioGroup} from './components/radio';
import {Checkbox, CheckboxGroup} from './components/checkbox';
import {WbForm, FormItem} from './components/form';
import * as Util from './utils/util.js';


const UiWebank = {
    WbButton,
    Banner,
    DataTable,
    SortTable,
    TreeTable,
    TableColumn,
    DatePicker,
    Loading,
    Modal,
    Switch,
    Tree,
    Zoom,
    Steps,
    Step,
    Tooltip,
    Tabs,
    Tab,
    Pagination,
    Row,
    Cell,
    Icon,
    WbInput,
    WbSelect,
    WbOption,
    OptionGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    WbForm,
    FormItem
};

const install = function (Vue) {
    Object.keys(UiWebank).forEach((key) => {
        Vue.component(key, UiWebank[key])
    });
    Vue.directive("DatePicker", DatePicker._directive);
    Vue.directive("Zoom", Zoom._directive);
    Vue.directive("Tooltip", Tooltip._directive);
    Vue.directive("Upload", Upload._directive);
    Vue.prototype.$Message = window.Message = Message;
    Vue.prototype.$Toast = window.Toast = Toast;
    Vue.prototype.$Util = window.Util = Util;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(UiWebank, {install});
