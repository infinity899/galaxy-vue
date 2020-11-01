import { getPeople } from '@/utils/api';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_FAILURE,
  PEOPLE_MATCH_PLANET,
} from '../actions';

const state = {
  people: [],
  status: '',
  errors: '',
};

const getters = {
  people: (peopleState) => peopleState.people,
};

const mutations = {
  [PEOPLE_SUCCESS]: (peopleState, people) => {
    peopleState.status = 'success';
    peopleState.people = people;
  },
  [PEOPLE_FAILURE]: (peopleState, err) => {
    peopleState.status = 'error';
    peopleState.errors = err;
  },
  [PEOPLE_REQUEST]: (peopleState) => {
    peopleState.status = 'loading';
  },
  [PEOPLE_MATCH_PLANET]: (peopleState) => {
    peopleState.status = 'success';
  },
};

const actions = {
  [PEOPLE_REQUEST]: async ({ commit }) => {
    commit(PEOPLE_REQUEST);
    const resp = await getPeople();
    if (resp.status === 200) {
      const people = resp.data.results;
      commit(PEOPLE_SUCCESS, people);
    } else {
      commit(PEOPLE_FAILURE, resp.data.message);
    }
  },
  // eslint-disable-next-line no-shadow
  [PEOPLE_MATCH_PLANET]: async ({ commit, getters }) => {
    try {
      getters.people.forEach((person) => {
        getters.planets.forEach((planet) => {
          // eslint-disable-next-line no-unused-expressions
          person.homeworld === planet.url ? person.planet = planet : '';
        });
      });
      commit(PEOPLE_MATCH_PLANET);
    } catch (e) {
      commit(PEOPLE_FAILURE, e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
