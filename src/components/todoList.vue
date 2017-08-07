<template>
<div class="container">
 <!--  <mu-dropDown-menu :value="value" @change="handleChange">
     <mu-menu-item value="2" title="全部"/>
     <mu-menu-item value="1" title="已完成"/>
     <mu-menu-item value="0" title="未完成"/>
   </mu-dropDown-menu> -->

     <mu-refresh-control 
      :refreshing="refreshing" 
      :trigger="trigger" 
      @refresh="refresh"/>
    <p v-if="isTodoEmpty">你现在还有收到任务喔</p>
    <mu-list>
    <div v-for="(item,index) in todoTaskList" class="item-wrapper" >
      <p class="date-time sub-info">{{item.releaseTime}}</p>

      <router-link class="link" :to="{path:'/detail',query:{taskId:item.id}}">

      <mu-badge :content="stateWord(item.status)" class="demo-icon-badge" :color="stateColor(item.status)"/>

        <mu-list-item :title="item.title" >
          <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>

          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">{{item.name}} -</span> {{item.content}}
          </span>
          <!-- <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="回复" />
            <mu-menu-item title="标记" />
            <mu-menu-item title="删除" />
          </mu-icon-menu> -->
        </mu-list-item>
      </router-link >
      <mu-divider inset/>
    </div>
  </mu-list>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
  export default {
    data () {
      return {
        value:'2',
        refreshing: false,
        trigger: null,
      }
    },
    mounted(){
      console.log(this.$el)
      this.trigger = this.$el
    },
    props:['todoTaskList','isTodoEmpty'],
    computed:{
     
      
      ...mapState({    
     
      })
    },
    methods:{
      handleChange (value) {
        this.value = value
      },
      refresh () {
        this.refreshing = true
        eventHub.$emit('refreshTodoTaskList')
        console.warn("refreshing")
        setTimeout(() => {
          this.refreshing = false
        }, 1000)
      },
      stateWord(key){
         return key?'已完成':'未完成'
      },
      stateColor(key){
        return key?'green':'red'
      },
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.container{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
  position: relative;
  user-select: none;
  /* height: 100%; */
 /*  margin-bottom: 36px; */
}
.demo-icon-badge{
  position: absolute;
  right: 18px;
  top: 15px;
}
.item-wrapper{
  position: relative;
  text-align: left;
}
.sub-info{
  position: absolute;
  right: 10px;
  bottom: 0px;
  margin: 0;
  font-size: 12px;
  color: grey;
  display: inline-block;
  -webkit-transform : scale(0.84,0.84) ;/*试用*/
  -ms-transform: scale(0.84,0.84) ;
  -moz-transform: scale(0.84,0.84) ;
  -o-transform: scale(0.84,0.84) ;
  transform: scale(0.84,0.84) ;
}
</style>
