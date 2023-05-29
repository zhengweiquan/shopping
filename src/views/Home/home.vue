<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'
</script>
 
<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <!-- 测试面板组件 -->
  <HomePanel title="新鲜好物" subtitle="新鲜出库 量大价平">
    <div>
      新鲜好物的内容
    </div>
  </HomePanel>
  <HomePanel title="人气推荐" subtitle="大众选择 明智之选">
    <div>
      人气推荐的内容
    </div>
</HomePanel>
</template>