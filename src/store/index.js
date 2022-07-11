import Vue from "vue";
import Vuex from "vuex";
import coacheslist from "./modules/coachesList.js";
import requestlist from "./modules/requestsList.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId:'c4'
  },
  getters:{
    userId(state){
      return state.userId
    }
  },
  mutations: {},
  actions: {},
  modules: {
    coaches : coacheslist,
    requests : requestlist,
  },
});
