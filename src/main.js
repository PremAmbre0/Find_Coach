import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import CustomCard from "./components/CustomComponnets/CustomCard.vue";
import CustomButton from "./components/CustomComponnets/CustomButton.vue";
import CustomBadge from "./components/CustomComponnets/CustomBadge.vue";
import CustomSpinner from "./components/CustomComponnets/CustomSpinner.vue";
import CustomDialog from "./components/CustomComponnets/CustomDialog.vue";


Vue.config.productionTip = false;
Vue.component('custom-card',CustomCard)
Vue.component('custom-button',CustomButton)
Vue.component('custom-badge',CustomBadge)
Vue.component('custom-spinner',CustomSpinner)
Vue.component('custom-dialog',CustomDialog)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
