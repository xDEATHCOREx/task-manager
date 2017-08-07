import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import index from './routes/index.vue'
import login from './routes/login.vue'
import regist from './routes/regist.vue'
import create from './routes/create.vue'
import detail from './routes/detail.vue'
import todo from './routes/todo.vue'
import inspection from './routes/inspection.vue'
import result from './routes/result.vue'
import test from './routes/test.vue'

import store from './store/store'
Vue.use(VueRouter)

const routes = [
	{
		path:'/login',
		name:'login',
		component:login
	},
	{
		path:'/regist',
		name:'regist',
		component:regist
	},
	{
		path:'/test',
		name:'test',
		component:test
	},
	{
		path:'/create',
		name:'create',
		component:create,
		meta:{
			requireAuth:true,
		}	

	},
	{
		path:'/todo',
		name:'todo',
		component:todo,
		meta:{
			requireAuth:true,
		}	

	},
	{
		path:'/detail',
		name:'detail',
		component:detail,
		meta:{
			requireAuth:true,
		}	

	},
	{
		path:'/inspection',
		name:'inspection',
		component:inspection,
		meta:{
			requireAuth:true,
		}	

	},
	{
		path:'/result',
		name:'result',
		component:result,
		meta:{
			requireAuth:true,
		}	

	},
	{
		path:'/',
		name:'index',
		component:index,
		meta:{
			requireAuth:true,
		}	
	},
]

var user = '',userId = ''
user = localStorage.getItem('user') //每次刷新时检测LS中相关值以自动登录
userId = localStorage.getItem('userId') 
if(user!=''&&user!=null){
	
	console.info("user existed,automatic logging in...")
	store.commit('logIn',user)
	store.commit('recordUserId',userId)
}

const router = new VueRouter({
	mode: 'history',//这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
	//base: '/vue2-study-platform',
	routes,
	scrollBehavior (to, from, savedPosition) {
	 if (to.hash) { //如果有锚点#xxx则滚动到制定元素位置，配合a标签暗锚
    	return {
     	 selector: to.hash,
    	}
 	 }
    return { x: 0, y: 0 }//对于所有路由导航，简单地让页面滚动到顶部。
  }
	
})

router.beforeEach((to,from,next)=>{
	//window.scrollTo(0,0)//替代上面history模式+scrollBehavior的解决方案？
	console.warn(to)
	if(to.matched.some(r=>r.meta.requireAuth)){
		if(store.state.user){//已登录
			//需要跳转确认的页面都是在已登录的前提下
			next();
		}else{//未登录
			next({
				path:'/login',
				query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由，如/login?redirect=%2Frepository
			})
		}
	}
	else {
		
		next()
	}
});

export default router