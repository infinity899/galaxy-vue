import Vue from 'vue';
import Vuex from 'vuex';
import people from './modules/people';
import planets from './modules/planets';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    people,
    planets,
  },
});
