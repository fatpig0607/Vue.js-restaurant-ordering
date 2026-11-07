<script setup>
defineProps({
  item:{
    type:Object,
    required:true,
  },
})
const emit = defineEmits(['add']);
</script>

<template>
  <article>
    <div><img v-if="item.imgurl" :src="item.imgurl" :alt="item.name"></div>
    <h4>{{ item.name }}</h4>
    <p>NT${{ item.price }}</p>
    <button @click="emit('add',item)">加入購物車</button>
  </article>
</template>

<style scoped>

</style>
