import Vue from 'vue'
import App from './App'

import store from './store'
import common from '@/common/common'

const apiurl = 'http://taicangtpst.com';

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.common = common

App.mpType = 'app'

/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */

const ajax = (url,data,fun,fun1) => {
	uni.request({
		url: apiurl + url, 
		data: data,
		success: (res) => {
			if(res.data.Code == '000000'){
				fun(res)
			}else {
				if(fun1){
					fun1(res)
				}
				uni.showToast({
					title: res.data.Msg || '网络错误',
					icon:"none",
					duration: 1000
				});
			}
		},
		fail() {
			uni.showToast({
				title: res.data.Msg || '网络错误',
				icon:"none",
				duration: 1000
			});
		},
		complete() {
			uni.hideLoading()
		}
	});	
}

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	return prePage.$vm;
}
Vue.prototype.$fire = new Vue();
Vue.prototype.$api = {msg,prePage,ajax};
Vue.prototype.$url_api = apiurl;

const app = new Vue({
	store,
	...App
})
app.$mount()
