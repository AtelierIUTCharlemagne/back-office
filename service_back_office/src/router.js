import { createWebHistory, createRouter } from "vue-router";
import store from "./store";

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
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/UsersList")
  },
  {
    path: "/events",
    name: "events-item",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/EventsList")
  },
  {
    path: "/login",
    name: "login-item",
    component: () => import("./components/LoginItem")
  }
  ,
  {
    path: "/profile",
    name: "profile-item",
    meta: {
      requiresAuth: true
    },
    component: () => import("./components/ProfileItem")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.auth.status.loggedIn) {
      next({ name: 'login-item' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router;