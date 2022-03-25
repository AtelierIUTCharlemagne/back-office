import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/home",
    name: "HelloWorld",
    component: () => import("./components/HelloWorld")
  },
  {
    path: "/users",
    alias: "/users",
    name: "users",
    component: () => import("./components/UsersList")
  },
  {
    path: "/events",
    name: "events",
    component: () => import("./components/EventsList")
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;