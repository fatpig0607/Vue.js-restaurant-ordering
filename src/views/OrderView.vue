<script setup>
import MenuItemCard from '@/components/MenuItemCard.vue';
import { ref,computed, onMounted } from 'vue';
const isCartOpen=ref(false);
const menuItems = ref([]);

const menuCategories=ref([]);

async function loadCategories(){
  try{
    const response = await fetch("/api/menucategories");
    if(!response.ok){
      throw new Error(`Get MenuCategory http ${response.status}`);
    }
    menuCategories.value=await response.json();
  }catch(err){
    console.error("菜單分類載入失敗",err)
  }
}
async function loadMenu(){
  try{
    const response = await fetch("/api/menu");
    if (!response.ok){
      throw new Error(`Get Menu http ${response.status}`);
    }
    menuItems.value=await response.json();
  }catch(err){
    console.error("菜單載入失敗",err);
  }
}
onMounted(()=>{
  loadCategories();
  loadMenu();
})
const selectedCategory=ref('全部');
const visibleItems=computed(()=>{
  if(selectedCategory.value=="全部"){
    return menuItems.value;
  }
  return menuItems.value.filter(i=>i.category==selectedCategory.value);
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
async function submitOrder(){
  if (cart.value.length==0){
    return;
  }
  if(!confirm("確定要送出訂單嗎?")) return;
  const request = {items:cart.value.map(item=>({
    menu_id:item.id,
    quantity:item.quantity,
  }))}
  try{
    const response = await fetch("/api/order",{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(request)
    })
    console.log(JSON.stringify(request))
    const result = await response.json();
    if(!response.ok||!result.success){
      alert(result.message || "訂單送出失敗，請稍後再試");
      return;
    }
    // console.log(result);
    alert (result.message);
    cart.value=[];
    isCartOpen.value=false;
  }catch(err){
    console.error("訂單傳送失敗",err);
    alert("訂單傳送失敗");
  }

}
function clearCart(){
  if(confirm("確定要清空購物車嗎?")){
    cart.value=[];
  }
}


</script>

<template>
  <main>
    <ul class="nav nav-tabs menu-category-tabs justify-content-center">
      <li class="nav-item">
        <button class="btn nav-link" :class="{active:selectedCategory=='全部'}" type="button" @click="selectedCategory='全部'">全部</button>
      </li>
      <li v-for="category in menuCategories" :key="category.category_id" class="nav-item">
        <button class="btn nav-link" :class="{active:selectedCategory==category.category_name}" @click="selectedCategory=category.category_name">{{ category.category_name }}</button>
      </li>
    </ul>
    <div class="container">
      <div class="row g-3">
        <div v-for="item in visibleItems" :key="item.id" class="col-md-3 col-6">
          <MenuItemCard :item="item" @add="addToCart"></MenuItemCard>
        </div>
      </div>
    </div>
    <div class="cart-drawer" :class="{'is-open':isCartOpen}">
      <button @click="openCart" :class="isCartOpen?'btn btn-danger cart-tab':'btn btn-warning cart-tab'">{{ isCartOpen?"關閉購物車":"開啟購物車" }}</button>
      <section class="cart-panel" :inert="!isCartOpen">
        <h2 class="h5 mb-3">購物車</h2>
        <p v-if="cart.length==0" class="text-muted">目前購物車是空的!</p>
        <ul v-else class="list-unstyled mb-3">
          <li v-for="(item,index) in cart" :key='item.id' class="d-flex flex-wrap align-items-center justify-content-between gap-2 border-bottom py-2">
            <div>
              <div class="fw-semibold">{{ item.name }} {{item.quantity}}份</div>
              <div class="small text-muted">小計 NT${{ item.price*item.quantity }}</div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button @click="decreaseQuantity(item)" class="btn btn-outline-danger btn-sm">-</button>
              <button @click="addToCart(item)" class="btn btn-outline-success btn-sm">+</button>
            </div>
          </li>
        </ul>
        <div>
          <p class="d-flex justify-content-between gap-2 mb-3">
            <span>共 {{ totalQuantity }} 份</span>
            <strong>總計 NT$ {{ totalPrice }}</strong>
          </p>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-warning flex-grow-1" :disabled="cart.length == 0" @click="submitOrder">
              送出訂單
            </button>
            <button type="button" class="btn btn-outline-danger" @click="clearCart" :disabled="cart.length==0">清空</button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.cart-drawer{
  position: fixed;
  top: 1rem;
  right: 0;
  z-index: 10;
  width: min(380px, calc(100% - 3rem));
  transform: translateX(100%);
  transition: transform 0.5s ease;
}
.cart-drawer.is-open {
  transform: translateX(0);
}
.cart-tab {
  position: absolute;
  top: 1rem;
  right: 100%;
  width: 3rem;
  padding: 0.75rem 0.25rem;
  border-radius: 0.5rem 0 0 0.5rem;
  writing-mode: vertical-lr;
  letter-spacing: 3px;
}
.cart-panel {
  max-height: min(380px, calc(100dvh - 2rem));
  padding: 1rem;
  overflow-y: auto;
  background-color: #e9ecef;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem 0 0 0.75rem;
}
.isCartOpen{
  transform:translateX(0);
  visibility: visible;
}
.menu-category-tabs {
  gap: 0.5rem;
  border-bottom: 0;
  margin: 1rem 0;
}

.menu-category-tabs .nav-link {
  padding: 0.6rem 1.2rem;
  color: #475569;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  margin-bottom: 0;
  transition: background-color 0.15s, color 0.15s;
}

.menu-category-tabs .nav-link:hover {
  color: #0d6efd;
  background-color: #e7f1ff;
  border-color: #b6d4fe;
}

.menu-category-tabs .nav-link.active {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
