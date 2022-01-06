import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { EntidadStateInterface } from './state';

const getters: GetterTree< EntidadStateInterface, StateInterface> = {
  getEntidad(state) {
    return state
  }
};

export default getters;
