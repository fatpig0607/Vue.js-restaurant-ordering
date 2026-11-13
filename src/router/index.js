import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import OrderView from "@/views/OrderView.vue";
import { createRouter,createWebHistory } from "vue-router";

const router=createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:"/",
      component:HomeView,
      name:"Home"
    },
    {
      path:"/order",
      component:OrderView,
      name:"Order"
    },
    {
      path:"/about",
      component:AboutView,
      name:"About"
    }
  ]
})
export default router