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
  <article class="card shadow-sm">
    <img :src="item.imgurl || '/NoUploadImage.svg'" :alt="item.name" class="card-img-top food-photo">
    <div class="card-body d-flex flex-column gap-2 align-items-center">
      <h4 class="card-title mb-0 text-nowrap">{{ item.name }}</h4>
      <p class="fw-semibold mb-0">NT${{ item.price }}</p>
      <button class="btn btn-warning" @click="emit('add',item)" :disabled="item.status!=1">{{ item.status==1?"加入購物車":"暫不提供" }}</button>
    </div>
    </article>
</template>

<style scoped>
.food-photo{
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: contain;
}
</style>
