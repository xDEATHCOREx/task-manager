<template>
<div>
  <div class="pick-up-dialog">
   <mu-dialog :open="open" title="选择任务对象" scrollable >
     <mu-list>  

      <div v-for="(item,index) in userInfo" class="item-wrapper" >
        <mu-list-item   disableRipple :title="item.name" @click.stop="handleToggle(index)" >
          <mu-avatar :src="item.head" slot="leftAvatar"/>
          <mu-checkbox v-model="item.selected" slot="right" :disabled="isCheckboxDisable(index)"/>
        </mu-list-item>
        <!-- {{item.selected}},{{index}} -->
        <mu-divider/>
    </div>
  </mu-list>
  <!-- {{selectedUserInfo}} -->
      <mu-flat-button label="取消" slot="actions" primary @click="close(false)"/>
      <mu-flat-button label="确认" slot="actions" primary @click="comfirm()"/>
    </mu-dialog>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
	export default {
    data () {
      return {

        userInfo:[{
          id:13802885493,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'李旻翰',
          selected:false,
        },{
          id:13802885134,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'李文灿',
          selected:false,
        },{
          id:13802885425,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'李杰',
          selected:false,
        },{
          id:13802885304,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'李武刚',
          selected:false,
        },{
          id:13802885053,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'张旭熳',
          selected:false,
        },{
          id:13802882186,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'邱阳',
          selected:false,
        },{
          id:13802885143,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'欧康贵',
          selected:false,
        },{
          id:13802885224,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'王宝辉',
          selected:false,
        },{
          id:13802885249,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'温海欣',
          selected:false,
        },{
          id:13802885443,
          head:'http://img5.imgtn.bdimg.com/it/u=1741313526,3649346787&fm=26&gp=0.jpg',
          name:'翁江鹏',
          selected:false,
        },],
     
      }
    },
    props:['open'],
    mounted(){
    },
    computed:{
      selectedUserInfo(){
        return this.userInfo.filter(function(item) {
          return item.selected == true
        })
      },
      ...mapState({    
        userId:'userId',
      })
    },
    methods:{
      close (key) {
        eventHub.$emit('close',key)
      },
      comfirm(){
       eventHub.$emit('updateSelected',this.selectedUserInfo)
       eventHub.$emit('close',false)
      },
      handleToggle (key) {
        console.log(key)
        this.userInfo[key].selected = !this.userInfo[key].selected
      },
      isCheckboxDisable(index){
        if(this.userId == this.userInfo[index].id){
          return true
        }else{
          return false
        }
      }
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>

</style>
