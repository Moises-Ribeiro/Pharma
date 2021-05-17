import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';


Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
    modules: {
      local: {
        actions,
        getters,
        mutations,
        state
      }
    }
  });
