import Vue from 'vue';
import router from "./router";
import store from "./store";
import VueCompositionAPI from '@vue/composition-api';

import vuetify from "./vueUseLibrary/vuetify";

import createMockServer from "@/mocks/server";

Vue.use(VueCompositionAPI);

import "./vueUseLibrary/globalComponent";

if (process.env.MOCK === "true") {
  const mockServer = createMockServer();
}

const app = new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  template: "<router-view />"
});
