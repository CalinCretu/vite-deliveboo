import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import RestaurantPage from "./pages/RestaurantPage.vue";
import NotFound from "./pages/404.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from) {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurant",
      name: "restaurant.show",
      props: true,
      component: RestaurantPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };
