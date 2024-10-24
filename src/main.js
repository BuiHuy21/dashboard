import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import "./style/custom-theme.css";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
