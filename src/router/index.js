import CreateRequestPage from "@/views/CreateRequestPage.vue";
import RequestDetails from "@/views/RequestDetails.vue";
import RequirementList from "@/views/RequirementList.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RequirementList",
    component: RequirementList,
  },
  {
    path: "/request-details/:id",
    name: "RequestDetails",
    component: RequestDetails,
  },
  {
    path: "/request",
    name: "CreateRequest",
    component: CreateRequestPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
