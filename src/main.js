import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(SuiVue);

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});
