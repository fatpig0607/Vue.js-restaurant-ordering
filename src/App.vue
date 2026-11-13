<script setup>
import { RouterLink,RouterView } from 'vue-router';
</script>

<template>
  <nav class="nav nav-pills justify-content-center gap-2 py-3">
    <RouterLink to="/" class="nav-link" exact-active-class="active">首頁</RouterLink>
    <RouterLink :to="{name:'Order'}" class="nav-link" exact-active-class="active">點餐</RouterLink>
    <RouterLink :to="{name:'About'}" class="nav-link" exact-active-class="active">關於我們</RouterLink>
  </nav>
  <RouterView v-slot="{Component}">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </RouterView>
  
</template>
<style scoped>
</style>