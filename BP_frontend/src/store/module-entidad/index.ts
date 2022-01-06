import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { EntidadStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const entidadModule: Module<EntidadStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default entidadModule;
