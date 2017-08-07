<template>
<div>
  <p v-if="isPublishedEmpty">你现在还没有发布任务噢</p>
  <mu-list>
    <div v-for="(item,index) in publishedTaskList" class="published-item-wrapper" >
      <p class="date-time sub-info">{{item.releaseTime}}</p>
      <router-link class="link" :to="{path:'/inspection',query:{taskId:item.id}}">
        <mu-list-item >
          <p class="title">{{item.title}}</p>
        </mu-list-item>
      </router-link >
      <mu-divider />
    </div>
  </mu-list>
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
      }
    },
    mounted(){
    },
    props:['publishedTaskList','isPublishedEmpty'],
    computed:mapState({
     isLoading:'isLoading', 
    }),
    methods:{
      
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.published-item-wrapper{
  position: relative;
  text-align: left;
}
.title  {
  position: relative;
  /* left: -50px; */
  margin: 0;
  color: grey;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
