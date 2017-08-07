<template>
  <div>
    <mu-dialog :open="isOpen" title="评价任务完成情况">  
    <mu-icon-button icon="star" :iconClass="count[0]" @click.native="rate(1)"/>
 <mu-icon-button icon="star" :iconClass="count[1]" @click.native="rate(2)"/>
 <mu-icon-button icon="star" :iconClass="count[2]" @click.native="rate(3)"/>
 <mu-icon-button icon="star" :iconClass="count[3]" @click.native="rate(4)"/>
 <mu-icon-button icon="star" :iconClass="count[4]" @click.native="rate(5)"/>  

      <mu-text-field 
        label="评价" 
        hintText="对该同学完成情况的评价" 
        v-model="rateDetail"
        labelFloat 
       fullWidth
        multiLine 
        :rows="3" 
        :rowsMax="15"/>
      <mu-flat-button label="取消" slot="actions" primary @click="close(false)"/>
      <mu-flat-button label="确认" slot="actions" primary @click="comfirm(false)" :disabled="disabled"/>
    </mu-dialog>
  </div>
</template>

<script>
import {eventHub} from './Event-hub.js'
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        rateDetail:'',
        score:0,
        count:['unstar','unstar','unstar','unstar ','unstar'],
        disabled:false,
      }
    },
    mounted(){
    },
    props:['isOpen'],
    computed:mapState({
     isLoading:'isLoading', 
    }),
    methods:{
      close (key) {   
       eventHub.$emit('close',key)
      },
      comfirm(key){
        this.disabled = true
        setTimeout(()=>{ //短期禁用按钮，防刷
          this.disabled = false
        },2000)
        if(this.rateDetail!=''){
           eventHub.$emit('close',key)
           this.submit()
        }else{
          this.$store.commit('topPopupToggle',"请输入评价内容！")
        }
      },
      rate(score){
        this.count = this.count.map(function(e){
          return 'unstar'
        })
        for(var i = 0;i<= score-1;i++){
          this.count[i] = 'starred'
        }
        this.score = score
      },
      submit(){
        this.axios({
              url: '/remark',
              method: 'post',
              withCredentials: true,
              data: {
                missionId:this.$route.query.taskId,
                comment:this.rateDetail,
                star:this.score,
              },
            })
            .then(res =>{
                  console.log(res)
                  eventHub.$emit('rateStatusChange',this.score,this.rateDetail)

                })
            .catch(err =>{
                  console.warn(err)
              })
      }
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>

</style>
