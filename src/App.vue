<script setup>
import MenuItemCard from './components/MenuItemCard.vue';
import { ref,computed } from 'vue';
const isCartOpen=ref(false);
const menuItems=[{
  id:1,
  category:"主餐",
  name:"香煎肋眼牛排",
  status:1,
  price:680,
  imgurl:"",
},
{
  id:2,
  category:"義大利麵",
  name:"奶油培根義大利麵",
  status:1,
  price:260,
  imgurl:"",
},
{
  id:2,
  category:"義大利麵",
  name:"番茄海鮮義大利麵",
  status:0,
  price:250,
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
  const existingItem=cart.value.find(c=>c.id==item.id);//第一次找不到顯示undefined
  // console.log(existingItem);
  if(existingItem){
    existingItem.quantity+=1;
  }else{
    cart.value.push({...item,quantity:1})
  }
  // cart.value.push(item);
}
let totalPrice=computed(()=>{
  return cart.value.reduce((sum,item)=>sum+=item.price*item.quantity,0);
});
let totalQuantity=computed(()=>{
  return cart.value.reduce((sum,item)=>sum+=item.quantity,0);
})
function decreaseQuantity(item){
  if(item.quantity>1){
    item.quantity-=1;
  }else{
    cart.value = cart.value.filter(c=>c.id!=item.id);
  }
}
function openCart(){
  isCartOpen.value= !isCartOpen.value;
}
function submitOrder(e){
  if (cart.value.length==0){
    return;
  }
  alert (`模擬成功送單，共${totalQuantity.value}份，總價${totalPrice.value}`);
  cart.value=[];
  isCartOpen.value=false;
}
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
    <button @click="openCart" :class="(isCartOpen?'btn btn-danger':'btn btn-warning')">{{ isCartOpen==true?"關閉購物車":"開啟購物車" }}</button>
    <section class="cart-panel" :class="{isCartOpen:isCartOpen}">
      <h2>購物車</h2>
      <p v-if="cart.length==0">目前購物車是空的!</p>
      <ul v-else>
        <li v-for="(item,index) in cart" :key='item.id'>{{ item.name }} {{item.quantity}}份，價格$ {{ item.price*item.quantity }}
            <button @click="decreaseQuantity(item)" class="btn btn-danger">-</button>
            <button @click="addToCart(item)" class="btn btn-success">+</button>
        </li>
      </ul>
      <p>目前總共{{ totalQuantity }}分，總價為{{totalPrice}}</p>
      <button class="btn btn-warning" @click="submitOrder" :disabled="cart.length==0">送出</button>
      <button class="btn btn-danger" @click="openCart">關閉</button>
    </section>
  </main>
</template>

<style scoped>
.cart-panel{
  position: fixed;
  top:0;
  right: 0px;
  bottom: 0;
  z-index: 10;
  width: min(380px,100%);
  transform: translateX(100%);
  height: 380px;
  background-color: #e9ecef;
  border-radius: 3%;
  color: #1f2937;
  border: 1px solid #d1d5db;
  box-shadow: -4px 0 16px rgb(0 0 0 / 15%);
  padding: 1rem;
  overflow-y: auto;
  transition: 0.5s;
  visibility: hidden;
}
.isCartOpen{
  transform:translateX(0);
  visibility: visible;
}
</style>
