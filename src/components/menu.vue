<template>
<div class="menu-root">
 <mu-drawer  :open="open" :docked="docked" @close="closeMenu()">
  <div  class="menu-top" v-if="logIn" >
  <p class="user-id">{{userId}}</p>
    <img class="user-head center-horizontal" :src="userInfo.userPic">
	  <p class="user-name center-horizontal">{{user}}</p> 
  </div>
  <div class="menu-top" v-else>
    <!-- <img class="user-head center-horizontal" src="http://18-newbee.top/img/head/20170425/10001.jpg"> -->
    <p class="user-name center-horizontal unlog">请登录❤</p> 
  </div>
  <router-link class="login-btn center-horizontal" :to="{path:'/login'}" v-if="!logIn">
 	 <mu-raised-button label="登录/注册" class="demo-raised-button " @click.native="closeMenu()" secondary/>
  </router-link>
      <mu-list @itemClick="docked ? '' : closeMenu()">
        <router-link :to="{path:'/'}">
        	<mu-list-item class="menu-item" title="首页" titleClass="test" @click.native="closeMenu()">
        		 <mu-avatar slot="left" icon="home" :size="36" backgroundColor="purple600"/>
        	</mu-list-item>
        </router-link>
         <mu-divider />
        <router-link :to="{path:'/'}">
          <mu-list-item class="menu-item" title="个人中心" @click.native="closeMenu()">
             <mu-avatar slot="left" icon="person" :size="36" backgroundColor="red600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
        <router-link :to="{path:'/'}">
          <mu-list-item class="menu-item" title="设置"  @click.native="closeMenu()">
             <mu-avatar slot="left" icon="settings" :size="36" backgroundColor="green600"/>
          </mu-list-item>
        </router-link>
         <mu-divider />
         <router-link :to="{path:'/'}">
          <mu-list-item class="menu-item" title="关于"  @click.native="closeMenu()">
             <mu-avatar slot="left" icon="help_outline" :size="36" backgroundColor="blue600"/>
          </mu-list-item>
        </router-link>
         <mu-divider />
        <mu-list-item v-if="docked" @click.native="closeMenu()" title="Close"/>
      </mu-list>
     	 <mu-raised-button v-if="logIn" label="登出" class="demo-raised-button log-out-btn" @click.native="closeMenu(),confirm('您确认要登出吗？','登出','logOut')" /> 
       {{jumpComfirm}}
  </mu-drawer>

</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {
      userInfo:{
        userPic:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
        userNickname:'李旻翰'
      },
      target:{path:'/exam',query:{id:'1'}}
    }
  },
  mounted(){
    //应该每次读取后端的信息 
      eventHub.$on('update',this.getInfo)
      eventHub.$on('updateTestStatus',this.isTested)
    this.isTested()
  },
  computed:mapState({
     open: 'open',
     docked: 'docked',
     user:'user',
     logIn:'logIn',
     dialog:'dialog',
     jumpComfirm:'jumpComfirm',
     userHeadUrl:'userHeadUrl',
     userId:'userId'
  }),
  watch:{
    logIn:function(val,oldVal){ //监视登录态，及时异步请求getinfo
      if(val == true){
        eventHub.$emit('update')
        console.warn('!!!!')
      }else{
         console.warn('???')
      }
    }
  },
  methods: {
    isTested(){
      
    },
    getInfo(){
       
      },
    closeMenu (flag) {
      console.info("close")
      this.$store.commit('toggle',flag)
    },
    confirm(info,title,event){
      this.$store.commit('dialogToggle',{
        info : info,
        title : title,
        event : event
      })
    },
    logOut(){
      this.$store.commit('logOut')

    },
    rndUrl(url){
      return url+'?rnd='+Math.random()
    }
  },
  components:{
    },

}
</script>

<style type="text/css" scoped>	
.menu-root{
}
.menu-top{
  position: relative;
  background-color: #7e57c2;
  height: 150px;
}
.menu-item{
  padding-top: 10px;
  text-align: left;
}

.user-head{
  width: 80px;
  height: 80px;
  top: 60px;
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}
.user-id{
  color: white;
  position: absolute;
  margin:0;
}
.user-name{
	 	text-align: center;
	 	color: #123;
	 	font-size: 20px;
    width: 256px;
    margin: 0 auto;
    color: #fff;
    bottom: -5px;
   /*  line-height: 150px; *//*与父div height保持一致*/
	 }
   .unlog{
    bottom: 30%;
   }
	 .log-out-btn{
	 	position: absolute;
    	bottom: 0%;
    	left: 50%;
    	transform: translate(-50%,-50%);
      background-color: #996eea;
      color: white;
	 }
   .login-btn{
    bottom: 0%;
    display: block;
    text-align: center;

   }
.mu-list{
  position: absolute;
  top: 150px;
  overflow: auto;
   -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
}
.center-horizontal{
  position: absolute;   
      left: 50%;
      transform: translate(-50%,-50%);
}
/* 菜单适配iPhone 4大小 */
@media screen and (max-width: 330px) and (max-height: 500px){ 
   .mu-list{
    height: 285px;
   }
}
</style>

