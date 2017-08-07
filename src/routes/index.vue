<template>
<div class="index-root">
  
   <mu-paper class="demo-paper" :zDepth="2" v-if="!logIn">
     <p class="middle hint">请登录后使用！</p>
   </mu-paper>

    <mu-float-button 
      icon="add" 
      secondary 
      to="/create"
      class="demo-float-button create-btn"
      :disabled="btnDisable"/>

  <mu-tabs :value="activeTab" @change="handleTabChange" class="tabs">
    <mu-tab value="tab1" title="手头任务"  :disabled="btnDisable" />
    <mu-tab value="tab2" title="我发布的"  :disabled="btnDisable" @click.once='getPublishedTaskList'/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'&& logIn"  class="container">
    <todo-list :todoTaskList="todoTaskList" :isTodoEmpty="isTodoEmpty"></todo-list>
  </div>
  <div v-if="activeTab === 'tab2' && logIn" class="container" >
    <publish-list :publishedTaskList="publishedTaskList" :isPublishedEmpty="isPublishedEmpty"></publish-list>
  </div>
</div>

</template>

<script>
import todoList from '../components/todoList.vue'
import publishList from '../components/publishList.vue'
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
	export default {
    data () {
      return {
        title:'任务管理小助手',
        activeTab: 'tab1',
       
        isInset:false,
        isInit:true,
        isTodoEmpty:false,
        isPublishedEmpty:false,
        publishedTaskList:[/*{
          id:1,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:1,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:1,
        },{
          id:1,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        }*/],
        todoTaskList:[/*{
          id:1,
          title:"请完成7.26号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。要求完成1000字读书感想，在23点59分前提交完成。要求完成1000字读书感想，在23点59分前提交完成。要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:1,
        },{
          id:2,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:3,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:1,
        },{
          id:4,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:5,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:6,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:7,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:7,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:7,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        },{
          id:7,
          title:"请完成7.23号的工作",
          creator:'MinhanLi',
          preview:'要求完成1000字读书感想，在23点59分前提交完成。',
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          state:0,
        }*/
        ],
        
      }
    },
    computed:{
      filteredData(){

      },
      ...mapState({    
       logIn:'logIn',
       btnDisable:'btnDisable',
       userId:'userId'
      })
    },
     mounted() {
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //尝试加载个人手头任务列表
      this.getTaskList()
      eventHub.$on('refreshTodoTaskList',this.getTaskList)
    },
    beforeDestroy(){
      eventHub.$off('refreshTodoTaskList')//防止重复注册事件
    },
    methods:{
     handleTabChange (val) {
      this.activeTab = val
      },
      getTaskList(){
        if(this.isInit){
          this.$store.commit('loadingToggle')
        }
        this.axios({
              url: '/getMyMissions',
              method: 'post',
              withCredentials: true,
              data: {
                userId:this.userId,
              },
            })
            .then(res =>{
                  console.log(res)
                  this.todoTaskList = res.data.data 
                  if(res.data.success){

                  }else{
                    this.isTodoEmpty = true 
                  }
                  if(this.isInit){
                    this.$store.commit('loadingToggle')
                    this.isInit = false
                  }   
                })
            .catch(err =>{
                  console.warn(err)
              })  
      },
      getPublishedTaskList(){
        this.$store.commit('loadingToggle')
        console.warn('getPublishedTaskList')
         this.axios({
              url: '/getTheirMissions',
              method: 'post',
              withCredentials: true,
              data: {
                userId:this.userId,
              },
            })
            .then(res =>{
                  console.log(res)
                  this.publishedTaskList = res.data.data
                  if(res.data.success){

                  }else{
                    this.isPublishedEmpty = true 
                  }
                  this.$store.commit('loadingToggle')
                })
            .catch(err =>{
                  console.warn(err)
              })  
       
      }
      
    },
    components:{
      'todo-list':todoList,
      'publish-list':publishList
    },
  }
</script>

<style lang="css" scoped>
.index-root{
  position: relative;
  height: 100%;
}

.demo-paper {
  position: relative;
  display: inline-block;
  height: 150px;
  width: 80%;
  margin: 20px;
  text-align: center;
}
.hint{
  font-size: 20px;
  color: gray;
}
.container{
  height: 100%;
}

.btn{
  /* height: 75px; */
    width: 50%;
    position: fixed;
    bottom: 100px;
}
.create-btn{
  position: fixed;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
}
.self-todo-btn{
  right: 0;
}
.self-publish-btn{
  left:0;
}
.tabs{
  position: fixed;
  bottom: 0;
}
.demo-refresh-container{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
  position: relative;
  user-select: none;
}
</style>
