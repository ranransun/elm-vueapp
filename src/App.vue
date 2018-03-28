<template>
  <div>
    <Header v-bind:seller="seller"></Header>
    <div class="nav">
      <div class="nav-item">
        <router-link to='/Goods'>商品</router-link>
      </div>
      <div class="nav-item">
        <router-link to='/Rating'>评价</router-link>
      </div>
      <div class="nav-item">
        <router-link to='/Seller'>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header'

const ERR_OK=0

export default{
  data(){
    return{
      seller:{}
    }
  },
  created(){
    this.$http.get('/api/seller').then((response)=>{
      response=response.body;
      if(response.errno===ERR_OK){
       this.seller=response.data; 
       console.log(this.seller);
      }
    });
  },
  components: {
    Header

  }
}

</script>

<style scoped>
.nav{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f5f5f5;
}
.nav .nav-item{
  flex: 1;
  text-align: center;
}
.nav .nav-item a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.nav .nav-item a.active{
  color: rgb(240,20,20);
}
</style>
