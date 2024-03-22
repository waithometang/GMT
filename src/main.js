// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import VueScroller from 'vue-scroller'
import { _RichTextDispose } from '@/js/RichTextDispose'
import { CheckForm } from '@/js/checkForm'

Vue.config.productionTip = false
Vue.use(VueScroller)
import '@/style/config.scss';
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import Axios from '@/api/axios'

Vue.use(Mint);

// 全局引用滑动组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css'


// 移动端点击事件延迟300毫秒
import fastClick from 'fastClick'
fastClick.attach(document.body)

// 全局挂载富文本处理，(表格大小， 图片大小)图片查看 仅适用于可分享发布类型详情页
Vue.prototype.RichTextDispose = _RichTextDispose

Vue.prototype.$post = (url, data) => Axios({
    url,
    data
})
Vue.prototype.$get = (url, data) => Axios({
    url,
    data,
    config: { method: 'get' }
})


// 显示确认选择框
Vue.prototype.showConfirm = function (setting) {
    this.$store.dispatch('alertConfirm', setting)
}

// 全局注册列表组件
import publicListTab from '@/components/publicListTab'
Vue.use(publicListTab)

Vue.prototype.MessageBox = function (setting) {
    this.$store.dispatch('GmtMessageBox', setting)
}

Vue.prototype.checkForm = function (setting) {
    return CheckForm(setting)
}

// 组件库
import 'vant/lib/index.css';
import { Popup, Area, Picker, ActionSheet, List, PullRefresh, Dialog, Lazyload, Form, Field, Button, Tab, Tabs, Toast, Checkbox, Skeleton, Col, Row, Icon, Cell, CellGroup, Search, Overlay, Uploader, Tag, Swipe, SwipeItem, Grid, GridItem, Image as VanImage, ImagePreview, RadioGroup, Radio, CheckboxGroup, DropdownMenu, DropdownItem, NoticeBar } from 'vant';
// import { Popup, Area, Picker, ActionSheet, List, PullRefresh, Dialog, Lazyload, Form, Field, Button, Tab, Tabs, Toast, Checkbox, Skeleton, Col, Row, Icon, Cell, CellGroup, Tag ,Search, Overlay } from 'vant';
Vue.use(Popup)
Vue.use(Area)
Vue.use(Picker)
Vue.use(ActionSheet)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(Skeleton)
Vue.use(Col)
Vue.use(Row)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Search)
Vue.use(Overlay)
Vue.use(Uploader)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(ImagePreview)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(NoticeBar)
Vue.use(Lazyload, {
    lazyComponent: true,
});

Vue.prototype.$toast = Toast

Vue.prototype.$alert = (message, title) => {
    Dialog.alert({ title, message })
}


// type: success: 成功, warning: 警告, error: 错误
Vue.prototype.changtoast = function (title, type) { // changtoast 调用函数名
    // type = type || "success"
    if (type == 'error') {
        Toast({
            message: title,
            icon: 'cross',
        });
    } else if (type == 'warning') {
        Toast.fail(title)
    } else {
        Toast.success(title)
    }
    // Message({
    //   message: title,
    //   center: true,
    //   type,
    //   duration: 2500
    // });
}


// // 全局注册列表组件
// import publicListTab from '@/components/publicListTab'
// Vue.use(publicListTab)

//必须关注组件
import SubscribeCom from "@/components/SubscribeCom/index.js";
Vue.prototype.$showSubscribe = SubscribeCom.install

import vantselector from '@/components/vantSelector/index.js'
Vue.use(vantselector)

/* eslint-disable no-new */
let Vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

export default Vm