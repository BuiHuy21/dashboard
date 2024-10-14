import HomePage from "@/views/HomePage.vue";
import RequestDetails from "@/views/RequestDetails.vue";
import RequirementList from "@/views/RequirementList.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/requirement-list",
    name: "RequirementList",
    component: RequirementList,
  },
  {
    path: "/request-details",
    name: "RequestDetails",
    component: RequestDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
