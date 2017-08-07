<template>
  <div id="app">
  <top-header></top-header>
  <popup></popup>
  <confirm></confirm>
  <loading></loading>
    <transition name="router-view" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
  </div>
</template>

<script>
import header from './components/header.vue'
import popup from './components/popup.vue'
import confirm from './components/confirm.vue'
import loading from './components/loading.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   components:{
      'top-header': header,//顶部条
      'popup': popup,//顶部提示条
      'confirm': confirm,//确认对话框
      'loading': loading,//加载转圈
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.router-view-enter-active, .router-view-leave-active {
  transition: opacity .15s ease;
}
.router-view-enter, .router-view-leave-active {
  opacity: 0;
}
</style>
