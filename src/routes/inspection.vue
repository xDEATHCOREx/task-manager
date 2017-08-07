<template>
<div class="detail-root">
 <mu-card>
  <mu-card-title :title="taskDetail.title" :subTitle="taskDetail.releaseTime"/>
   <!-- <mu-card-media >
    <img src="http://img1.imgtn.bdimg.com/it/u=3258213409,1470632782&fm=26&gp=0.jpg" />
     </mu-card-media> -->
  <mu-card-text >
   {{taskDetail.content}}
  </mu-card-text>
  <mu-card-header title="Myron Avatar" subTitle="sub title">
    <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="avatar"/>
  </mu-card-header>
</mu-card>

<mu-list>
    <mu-sub-header>完成情况</mu-sub-header>

      <mu-list-item :title="taskDetail.name" @click="jumpTo(taskDetail.to)" :disabled="stateDisable(taskDetail.status)">
        <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>
        <mu-badge :content="stateWord(taskDetail.status)" :color="stateColor(taskDetail.status)" slot="after"/>
        <mu-icon slot="right" value="keyboard_arrow_right"/>
      </mu-list-item>

    <mu-list-item title="Maco Mai">
      <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>
      <mu-badge content="未完成" color="red"slot="after"/>
      <mu-icon slot="right" value="keyboard_arrow_right"/>
    </mu-list-item>
    <mu-list-item title="Alex Qin">
      <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>
      <mu-badge content="未完成" color="red"slot="after"/>
      <mu-icon slot="right" value="keyboard_arrow_right"/>
    </mu-list-item>
    <mu-list-item title="Allen Qun">
      <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>
      <mu-badge content="已完成" color="green"slot="after"/>
      <mu-icon slot="right" value="keyboard_arrow_right"/>
    </mu-list-item>
    <mu-list-item title="Myron Liu">
      <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="leftAvatar"/>
      <mu-badge content="已完成" color="green"slot="after"/>
      <mu-icon slot="right" value="keyboard_arrow_right"/>
    </mu-list-item>
  </mu-list>

<router-link class="link" :to="{path:'/todo'}">
 <mu-raised-button label="修改任务" class="demo-raised-button todo-btn" fullWidth secondary/>
 </router-link>
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'视察',
        taskDetail:{},
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
       ...mapState({
        
      })
    },
    methods:{
      jumpTo(userId){
        this.$router.push({
          path:'/result',
          query:{
            taskId:this.$route.query.taskId,
            userId:userId
          },
        })
      },
      stateWord(key){
         return key?'已完成':'未完成'
      },
      stateColor(key){
        return key?'green':'red'
      },
      stateDisable(key){
        return key?false:true
      },
      getTaskDetail(){
        this.$store.commit('loadingToggle')
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
                   this.$store.commit('loadingToggle')
                  this.taskDetail = res.data.data
                })
            .catch(err =>{
                   this.$store.commit('loadingToggle')
                  console.warn(err)
              })  
      },
    },
    components:{
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
</style>
