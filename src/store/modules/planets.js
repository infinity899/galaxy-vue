import { getPlanet } from '@/utils/api';
import {
  PLANETS_REQUEST,
  PLANETS_SUCCESS,
  PLANETS_FAILURE,
} from '../actions';

const state = {
  planets: [],
  status: '',
  errors: '',
};

const getters = {
  planets: (planetsState) => planetsState.planets,
};

const mutations = {
  [PLANETS_SUCCESS]: (planetsState, planet) => {
    planetsState.status = 'success';
    planetsState.planets.push(planet);
  },
  [PLANETS_FAILURE]: (planetsState, err) => {
    planetsState.status = 'error';
    planetsState.errors = err;
  },
  [PLANETS_REQUEST]: (planetsState) => {
    planetsState.status = 'loading';
  },
};

const actions = {
  [PLANETS_REQUEST]: async ({ commit }, data) => {
    commit(PLANETS_REQUEST);
    const resp = await getPlanet(data);
    if (resp.status === 200) {
      const planet = resp.data;
      commit(PLANETS_SUCCESS, planet);
    } else {
      commit(PLANETS_FAILURE, resp.data.message);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
