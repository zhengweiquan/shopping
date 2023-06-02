<script setup>
import { ref, onMounted } from 'vue'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
// 获取面包屑二级数据
const route = useRoute()  //这个可以获得当前的id参数
const CategoryFilterList = ref({})
const CategoryFilterAPI = async () => {
  const res = await getCategoryFilterAPI(route.params.id.slice(1))
  CategoryFilterList.value = res.data.result
}
onMounted(() => {
  CategoryFilterAPI()
})

// 获取基础列表数据
const data = ref(
  {
    categoryId: route.params.id.slice(1),
    page: 1,
    pageSize: 20,
    // sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
    sortField: 'publishTime'
  }
)
const SubCategoryList = ref([])
const getSubCategor = async () => {
  const res = await getSubCategoryAPI(data.value)
  SubCategoryList.value = res.data.result.items
}
onMounted(() => {
  getSubCategor()
})
// tab切换回调
const count = ref(2)
const tabChange = ()=> {
  if(count.value < 5) {
    data.value.page++
    count.value++
  }else{
    count.value = 2
    data.value.page = 1

  }
  getSubCategor()
}
//加载更多无限滚动
const disabled = ref(false)
const load = async () => {
  data.value.page++
  const ress = await getSubCategoryAPI(data.value)
  SubCategoryList.value =  [...SubCategoryList.value,...ress.data.result.items]  //数组拼接
  // 加载完毕停止更新
  if(ress.data.result.items.length === 0) {
    disabled.value = true
    console.log('加载完毕')
  }
}
</script>
 
<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${CategoryFilterList.parentId}` }">{{ CategoryFilterList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ CategoryFilterList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="data.sortField" @tab-change="tabChange">  <!--动态绑定 如果下面的name激活了就会将相应的值绑定到里面-->
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in SubCategoryList" :good="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>
 
 
 
<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>