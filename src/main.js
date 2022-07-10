import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import CustomCard from "./components/CustomComponnets/CustomCard.vue";
import CustomButton from "./components/CustomComponnets/CustomButton.vue";
import CustomBadge from "./components/CustomComponnets/CustomBadge.vue";


Vue.config.productionTip = false;
Vue.component('custom-card',CustomCard)
Vue.component('custom-button',CustomButton)
Vue.component('custom-badge',CustomBadge)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
