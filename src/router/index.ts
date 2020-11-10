import Vue from "vue";
import Router from "vue-router";
import App from "@/App.vue";
import Dashboard from "@/components/layout/Dashboard.vue";
import Error from "@/pages/Error.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "",
          component: Dashboard,
          children: [
            // all child routes
          ],
        },
        {
          path: "error",
          component: Error,
        },
        {
          path: "*",
          redirect: "/error",
        }
      ]
    },
  ],
})

export default router;
