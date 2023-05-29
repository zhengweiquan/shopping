<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import layoutNav from '@/views/Layout/components/layoutNav.vue'
import layoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import layoutFooter from '@/views/Layout/components/layoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'

</script>
<template>
  <div>
    <LayoutFixed></LayoutFixed>
    <layoutNav></layoutNav>
    <layoutHeader></layoutHeader>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <layoutFooter></layoutFooter>

  </div>
</template>