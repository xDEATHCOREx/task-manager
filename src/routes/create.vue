<template>
<div class="create-root">
 <mu-text-field 
   label="标题" 
   hintText="请简明概要地给任务起个标题" 
   v-model.trim="taskTitle" 
   labelFloat 
   fullWidth
   :errorText="inputErrorText"
    @textOverflow="handleInputOverflow" 
    :maxLength="30"
  />
  <mu-text-field 
    label="内容" 
    hintText="请详细描述任务的内容，可以输入多行" 
    v-model="taskDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>
  <mu-raised-button 
    label="请选择任务发布的对象" 
    fullWidth
    @click.native="pickUp"/>
  <mu-raised-button 
    label="发布" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="check"
    :disabled="disabledStatus"/>
    <br/>
    <br/> 
  <pick-up :open="open" ></pick-up>
  <div v-for="(item,index) in selectedUser" class="selectedUsers">
    <mu-chip class="demo-chip" >
      <mu-avatar :size="32" :src="item.head"/> {{item.name}}
    </mu-chip>
  </div>
  <!-- {{selectedUser}} -->
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
import pickup from '../components/userPickUp.vue'
export default {
  data () {
    return {
       value:'1',
       title:'创建任务',
       taskTitle:'',
       taskDetail:'',
       inputErrorText: '',
       //disabled:true,
       open:false,
       selectedUser:'',
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      eventHub.$on('close',this.closeAction)
      eventHub.$on('updateSelected',this.updateSelected)
    },
  computed:{
      disabledStatus () { 
         return this.selectedUser!=''?false:true
       },
       ...mapState({
        jumpConfirm:'jumpConfirm',
        logIn:'logIn',
        userId:'userId',
      })
    },
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '超过长度！' : ''
      this.disabled = isOverflow ? true : false
    },
     handleChange (value) {
      this.value = value
    },
    submit(){
      this.axios({
              url: '/releaseMission',
              method: 'post',
              withCredentials: true,
              data: {
                from:this.userId,
                to:this.selectedUser[0].id,
                title:this.taskTitle,
                content:this.taskDetail,
              },
            })
            .then(res =>{
                  console.log(res)
                  this.$store.commit('topPopupToggle',"发布成功！")
                  this.$router.push({
                    path:'/'
                  })

                })
            .catch(err =>{
              this.$store.commit('topPopupToggle',"发布失败！")
                  console.warn(err)
              })  
    },
    check(){
      if(this.taskTitle!=''&&this.taskDetail!=''){
        this.submit()
      }else{
        this.$store.commit('topPopupToggle',"请填写标题和内容！")
      }
    },
    pickUp(){
      this.open = true
    },
    closeAction(key){
        this.open = key
      },
    updateSelected(info){
      this.selectedUser = info
    }
  },
  components:{
      'pick-up':pickup
    },
  beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
      //之后可能还要加个提交态，判断是提交后跳转还是非提交跳转
        if(this.logIn == true){//已登录
          console.warn("leaving to:",to.fullPath)
          this.$store.commit('dialogToggle',{
          info : '确认到'+to.name+'中?',
          title : '确认',
          event : 'jump',
          jumpTo : to.fullPath
          })
          if(this.jumpConfirm){
             next()
          }
        }else{//若在此路由点击了menu的登出按钮改变了登录态直接不执行确认逻辑
          next()
        }
    },
}
</script>

<style type="text/css" scoped>  

.create-root{
  padding: 20px 20px 36px 20px;
  text-align: center;
  overflow: auto;
}
.submit-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
.selectedUsers{
  display: inline-block;
}
</style>



