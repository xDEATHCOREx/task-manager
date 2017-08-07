<template>
<div class="detail-root">
 <mu-card>
 
  <mu-card-title :title="taskDetail.title" :subTitle="taskDetail.releaseTime"/>
  <mu-badge :content="stateWord(taskDetail.status)" class="demo-icon-badge" :color="stateColor(taskDetail.status)"/>
   <mu-card-media >
    <img src="http://img1.imgtn.bdimg.com/it/u=3258213409,1470632782&fm=26&gp=0.jpg" />
  </mu-card-media>
  <mu-card-text >
    {{taskDetail.content}}
  </mu-card-text>
  <mu-card-header :title="taskDetail.name" subTitle="sub title">
    <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="avatar"/>
   
  </mu-card-header>
</mu-card>

<mu-card v-if="taskDetail.status==1||taskDetail.status==2">
  <mu-card-title 
    title="我的完成情况" 
    titleClass="finished-detail-title"
    subTitle="2017-07-23 22:24:23"
    subTitleClass="finished-detail-subtitle"/>
   
  <mu-card-text >
   {{taskDetail.log}}
  </mu-card-text>
  <mu-card-header title="Myron Avatar" subTitle="sub title">
    <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="avatar"/>
    <mu-icon-menu   
        class='extra-options'  
        icon="more_vert"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
        <mu-menu-item title="删除" @click=""/>
        <mu-menu-item title="修改" />
    </mu-icon-menu>
  </mu-card-header>
</mu-card>
 
<mu-paper class="demo-paper" :zDepth="2" v-if="taskDetail.status==2" >
    <mu-icon-button icon="star" :iconClass="count[0]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[1]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[2]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[3]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[4]" disabled/>  
  <mu-content-block>
   {{taskDetail.name}} 点评：{{taskDetail.comment}}
  </mu-content-block>
 </mu-paper>

 <mu-raised-button :label="labelWord" class="demo-raised-button todo-btn" fullWidth secondary @click="jumpTo"/>


</div>
</template>

<script>
import backTop from '../components/backTop.vue'
import {eventHub} from '../components/Event-hub.js'
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'任务内容',
        rightBottom: {horizontal: 'right', vertical: 'bottom'}, 
        taskDetail:{

        },
        count:['unstar','unstar','unstar','unstar','unstar'],
      }
    },
    mounted(){
       //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.getTaskDetail()
    },
    computed:{
      formattedArticleText () { 
        var replaceText = String(this.detail.resource.article).replace(/\n/g,'<br/>')//注意写法！
         return replaceText
       },
        isSelf(){
         if(this.userId == this.taskDetail.to){
          return true
         }else{
          return false
         }
       },
       labelWord(){
        if(this.taskDetail.status==1||this.taskDetail.status==2){
          return '修改log'
        }else{
          return '去完成'
        }
       },
       ...mapState({
        userId:'userId',
      })
    },
    methods:{
      jumpTo(){
       this.$store.commit('passLog',this.taskDetail.log) 
        this.$router.push({
          path:'/todo',
          query:{
            taskId:this.$route.query.taskId
          },
        })
      },
      getTaskDetail(){
        this.axios({
              url: '/getDetails',
              method: 'post',
              withCredentials: true,
              data: {
                missionId:this.$route.query.taskId,
                userId:this.userId
              },
            })
            .then(res =>{
                  console.log(res)
                  this.taskDetail = res.data.data
                  if(this.taskDetail.status==2){
                    this.starChange(this.taskDetail.star)
                  }
                })
            .catch(err =>{
                  console.warn(err)
              })  
      },
      stateWord(key){
         return key?'已完成':'未完成'
      },
      stateColor(key){
        return key?'green':'red'
      },
      starChange(score){
        for(var i = 0;i<= score-1;i++){
          this.count[i] = 'starred'
        }
      }
     
    },
    components:{
      'back-top':backTop
    },
  }
</script>

<style lang="css" scoped>
.detail-root{
  /*暂时不用overflow: auto; */
   -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;/* 这里btn和root是同一个层级，不然会发生btn被遮盖的情况 */
      position: relative;
    /*   height: 100%; */
      z-index: 10;
      text-align: -webkit-auto;
}
.todo-btn{
  position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
}
.extra-options{
  position: absolute;
  right: 10px;
}
.demo-icon-badge{
  position: absolute;
  right: 10px;
  top: 50px;
}
.demo-paper {
    width: 90%;
    margin: 20px auto;
    text-align: center;
}
</style>
