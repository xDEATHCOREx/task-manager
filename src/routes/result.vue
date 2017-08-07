<template>

<div class="result-root">
<a id="hiddenA" href="#hidden"></a>
 <mu-card>
  <mu-card-title title="Log日志" :subTitle="'提交时间  '+resultDetail.submitTime"/>
   <mu-card-media>
    <img src="http://img1.imgtn.bdimg.com/it/u=3258213409,1470632782&fm=26&gp=0.jpg" />
  </mu-card-media>
  <mu-card-text >
    {{resultDetail.log}}
  </mu-card-text>
  <mu-card-header :title="resultDetail.name" subTitle="个性签名">
    <mu-avatar src="http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg" slot="avatar"/>
  </mu-card-header>
</mu-card>
 <mu-paper class="demo-paper" :zDepth="2" v-if="resultDetail.status==2||isRate" >
    <mu-icon-button icon="star" :iconClass="count[0]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[1]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[2]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[3]" disabled/>
    <mu-icon-button icon="star" :iconClass="count[4]" disabled/>  
  <mu-content-block>
    点评：{{resultDetail.comment}}
  </mu-content-block>
 </mu-paper>
  <mu-raised-button 
    :label="rateLabel" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="rateOpen()"
    :disabled="disabled"/>

    <rate :isOpen="isOpen"></rate>
 
</div>
</template>

<script>
import rate from '../components/rate.vue'
import {eventHub} from '../components/Event-hub.js'
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'任务完成情况',
        disabled:false,
        isOpen:false,
        count:['unstar','unstar','unstar','unstar','unstar'],
        resultDetail:{

        },
        isRate:false,
        comment:''
      }
    },
    mounted(){
       //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      eventHub.$on('close',this.rateClose)
      eventHub.$on('rateStatusChange',this.rateStatusChange)
      this.setTop()
      this.getResult()
    },
    computed:{
      formattedArticleText () { 
        var replaceText = String(this.detail.resource.article).replace(/\n/g,'<br/>')//注意写法！
         return replaceText
       },
       rateLabel(){
        if(this.resultDetail.status==1){
          return 'RATE'
        }else if(this.resultDetail.status==2){
          return 'reRATE'
        }
       },
       ...mapState({
        
      })
    },
    methods:{
      setTop(){
        var hiddenA = document.getElementById("hiddenA")
          hiddenA.scrollIntoView();
          hiddenA = null 
      },
      rateOpen(){
        this.isOpen = true 
        console.warn("open rate")
      },
      rateClose(key){
        this.isOpen = key
      },
      rate(score){
        this.score = score 
        for(var i=score-1;i<=4;i++){

        }
      },
      getResult(){
        this.$store.commit('loadingToggle')
        this.axios({
              url: '/getDetails',
              method: 'post',
              withCredentials: true,
              data: {
                missionId:this.$route.query.taskId,
              },
            })
            .then(res =>{
                  console.log(res)
                  this.$store.commit('loadingToggle')
                  this.resultDetail = res.data.data
                  if(this.resultDetail.status==2){
                    this.rateStatusChange(this.resultDetail.star,this.resultDetail.comment)
                  }
                })
            .catch(err =>{
              this.$store.commit('loadingToggle')
                  console.warn(err)
              })  
      },
      rateStatusChange(score,comment){
        this.isRate = true
        this.count = this.count.map(function(e){
          return 'unstar'
        })
        for(var i = 0;i<= score-1;i++){
          this.count[i] = 'starred'
        }
        this.resultDetail.comment = comment
      }
    },
    components:{
      'rate':rate
    },
  }
</script>

<style lang="css" scoped>
.result-root{
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
.submit-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
#hiddenA{
  visibility: hidden;
}
.demo-paper {
    width: 90%;
    margin: 20px auto;
    text-align: center;
}
</style>
