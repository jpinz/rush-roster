import Vue from "vue";
import VueRouter from "vue-router";
import Rushees from "../views/Rushees.vue";
import Account from "../views/Account.vue";
import Voting from "../views/Voting.vue";
import Settings from "../views/Settings.vue";
import Users from "../views/Users.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Rushees",
    component: Rushees,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/voting",
    name: "Voting",
    component: Voting,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
