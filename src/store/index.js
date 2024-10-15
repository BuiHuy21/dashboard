import Vue from "vue";
import Vuex from "vuex";
import { dataTable } from "@/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    colums: dataTable.colums,
    dataColumns: dataTable.dataColumns,
  },
  mutations: {},
  actions: {},
  getters: {
    colums: (state) => state.colums,
    dataColumns: (state) => state.dataColumns,
  },
});
