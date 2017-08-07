<template>
<div class="create-root">
 <mu-text-field 
   label="标题" 
   hintText="请简明概要地起个标题" 
   v-model.trim="logTitle" 
   labelFloat 
   fullWidth
   :errorText="inputErrorText"
    @textOverflow="handleInputOverflow" 
    :maxLength="30"
  />
  <mu-text-field 
    label="内容" 
    hintText="请详细描述内容，可以输入多行" 
    v-model="logDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>
  
  <mu-raised-button 
    label="提交" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="check"
    :disabled="disabled"/>
    <br/>
    <br/> 
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
export default {
  data () {
    return {
       value:'1',
       title:'完成任务中 ',
       logTitle:'预留标题XD',
       logDetail:'',
       inputErrorText: '',
       disabled:false,
       open:false,
    }
  },

  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      eventHub.$on('close',this.closeAction)
      this.logDetail = this.logPassDetail
    },
  computed:mapState({
    jumpConfirm:'jumpConfirm',
    logIn:'logIn',
    logPassDetail:'logPassDetail'
  }),
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '超过长度！' : ''
      this.disabled = isOverflow ? true : false
    },
     handleChange (value) {
      this.value = value
    },
    submit(){
       this.$store.commit('loadingToggle')
      this.axios({
              url: '/submit',
              method: 'post',
              withCredentials: true,
              data: {
                missionId:this.$route.query.taskId,
                log:this.logDetail,
              },
            })
            .then(res =>{
               this.$store.commit('loadingToggle')
                  console.log(res)
                  this.$router.push({
                    path:'/detail',
                    query:{
                      taskId:this.$route.query.taskId
                    }
                  })

                })
            .catch(err =>{
               this.$store.commit('loadingToggle')
                  console.warn(err)
              })
    },
    check(){
      if(this.logTitle!=''&&this.logPassDetail!=''){
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
  },
  components:{
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

</style>



