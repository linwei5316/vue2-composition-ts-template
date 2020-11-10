import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export interface RootState {
  
}

export interface SomeModuleState {
  //
}

const store: Store<RootState> = new Vuex.Store({
  strict: true,
  modules: {
    
  }
});

export default store
