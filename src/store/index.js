import Vue from "vue";
import Vuex from "vuex";
import { textApi } from "../api/fetch";

Vue.use(Vuex);

let options = {
  state: {
    data: "",
  },
  getters: {},
  mutations: {
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    text(context, path) {
      textApi().then((res) => {
        context.commit("setData", { res: res, path: path });
      });
    },
  },
  modules: {},
};

export default function createStore() {
  const store = new Vuex.Store(options);
  return store;
}
