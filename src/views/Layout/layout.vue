<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import layoutNav from '../Layout/components/LayoutNav.vue'
import layoutHeader from '../Layout/components/LayoutHeader.vue'
import layoutFooter from '../Layout/components/LayoutFooter.vue'
import LayoutFixed from '../Layout/components/LayoutFixed.vue'

</script>
<template>
  <div>
    <LayoutFixed></LayoutFixed>
    <layoutNav></layoutNav>
    <layoutHeader></layoutHeader>
    <!-- 二级路由出口 -->
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
    <layoutFooter></layoutFooter>

  </div>
</template>