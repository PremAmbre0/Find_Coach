import Vue from "vue";
import Vuex from "vuex";
import coacheslist from "./modules/coachesList.js";
import requestlist from "./modules/requestsList.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    coaches : coacheslist,
    request : requestlist,
  },
});
