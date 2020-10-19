import { getPeople } from '@/utils/api';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_FAILURE,
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
    peopleState.error = err;
  },
  [PEOPLE_REQUEST]: (peopleState) => {
    peopleState.status = 'loading';
  },
};

const actions = {
  [PEOPLE_REQUEST]: async ({ commit }) => {
    commit(PEOPLE_REQUEST);
    const resp = await getPeople();
    console.log(resp);
    if (resp.status === 200) {
      const people = resp.data.results;
      commit(PEOPLE_SUCCESS, people);
    } else {
      commit(PEOPLE_FAILURE, resp.data.message);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
