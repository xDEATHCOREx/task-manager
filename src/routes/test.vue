<template>
<div id="example">
<div>djlakjdlkajflkd
kdjfalkdjf
daksl</div>
 <button v-on:click='greet()'>greet</button>
</div>
</template>

<script>
import Vue from 'vue'
 const example2 = new Vue({
  el:'#app',
  data:{
    name:'vue'
  },
  methods:{
    greet(){
      alert("hello"+this.name)
    }
  }
 })
 export default example2
</script>

<style lang="css" scoped>
.mu-circular-progress{
     position: fixed;
     top: 50%;
    left: 50%;
    transform: translate(-50%,-50%); 
  }
</style>
