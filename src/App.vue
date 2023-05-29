<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 一级路由出口 -->
  <RouterView />
  <div class="yanse">颜色</div>
</template>

<style scoped lang="scss">
.yanse {
  color: $sucColor;
}
</style>
