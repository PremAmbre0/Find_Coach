import Vue from "vue";
import Vuex from "vuex";
import coacheslist from "./modules/coachesList.js";
import requestlist from "./modules/requestsList.js";
import auth from "./modules/auth.js"; 
Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    coaches : coacheslist,
    requests : requestlist,
    auth : auth
  },
});
