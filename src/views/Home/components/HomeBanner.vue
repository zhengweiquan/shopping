<script setup>
 import {getBanneeerAPI} from '@/apis/home.js'  //导入处理接口数据获取数据
 import {ref,onMounted} from 'vue' 
 const bannerList = ref([])   
 const BanneeerAPI = async()=> {    
  const res =  await getBanneeerAPI()
  bannerList.value = res.data.result
 }
 const loading = ref(true)

 onMounted(() => {
  BanneeerAPI()
  if(bannerList.value) {
    loading.value = false
  }else {
    loading.value = true
  }
 })

</script>
 
  
 
<template>
  <div class="home-banner" v-loading="loading">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a href="#"><img :src="item.imgUrl" alt=""></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
 
 
 
<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
 
  img {
    width: 100%;
    height: 500px;
  }
}
</style>