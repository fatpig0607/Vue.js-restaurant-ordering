<script setup>
import MenuItemCard from './components/MenuItemCard.vue';
import { ref,computed } from 'vue';

const menuItems=[{
  id:1,
  category:"主餐",
  name:"香煎肋眼牛排",
  price:680,
  imgurl:"",
},
{
  id:2,
  category:"義大利麵",
  name:"奶油培根義大利麵",
  price:260,
  imgurl:"",
}]
const selectedCategory=ref('全部');
const visibleItems=computed(()=>{
  if(selectedCategory.value=="全部"){
    return menuItems;
  }
  return menuItems.filter(i=>i.category==selectedCategory.value);
})
let cart=ref([]);
function addToCart(item){
  const existingItem=cart.value.find(i=>i.name==item.name);
  console.log(existingItem);
  if(existingItem){
    existingItem.quantity+=1;
  }else{
    cart.value.push({...item,quantity:1})
  }
  // cart.value.push(item);
}
let totalPrice=computed(()=>{
  return cart.value.reduce((sum,item)=>sum+item.price*item.quantity,0);
});
let totalQuantity=computed(()=>{
  return cart.value.reduce((sum,item)=>sum+=item.quantity,0);
})
</script>

<template>
  <main>
    <ul class="nav nav-pills nav-fill">
      <li>
        <button class="btn nav-link" :class="{active:selectedCategory=='全部'}" type="button" @click="selectedCategory='全部'">全部</button>
      </li>
      <li>
        <button class="btn nav-link" :class="{active:selectedCategory=='主餐'}" type="button" @click="selectedCategory='主餐'">主餐</button>
      </li>
      <li>
        <button class="btn nav-link" :class="{active:selectedCategory=='義大利麵'}" type="button" @click="selectedCategory='義大利麵'">義大利麵</button>
      </li>
    </ul>
    <MenuItemCard v-for="item in visibleItems" :item="item" :key="item.id" @add="addToCart"></MenuItemCard>
    <section>
      <h2>購物車</h2>
      <p v-if="cart.length==0">目前購物車是空的!</p>
      <ul v-else="cart.length!=0">
        <li v-for="(item,index) in cart" :key='index'>{{ item.name }} {{item.quantity}}份，價格$ {{ item.price }}</li>
      </ul>
      <p>目前總共{{ totalQuantity }}分，總價為{{totalPrice}}</p>
    </section>
  </main>
</template>

<style scoped></style>
