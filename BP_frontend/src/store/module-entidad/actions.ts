import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { EntidadStateInterface } from './state';
import { LocalStorage, SessionStorage } from 'quasar'
import {
  loginEntidadExecute,
  verifyTokenEExecute,
  getCredencialsFromEntidadExecute
} from "../../services/entidades";


const actions: ActionTree<EntidadStateInterface, StateInterface> = {

  async getCredencialsFromEntidadAction({ commit }, args) {
    try {
      let entidad: EntidadStateInterface = await getCredencialsFromEntidadExecute(args)
      if (entidad.nombre) {
        //mutear el estado
        commit('setUserMutation', entidad)
      }
      return entidad
    } catch (err) {
      return {}
    }

  },
  async loginAction({ commit }, args) {
    try {

      let entidad: EntidadStateInterface = await loginEntidadExecute(args)
      console.log(entidad)
      if (entidad.nombre) {
        //guardar el objeto usuario en localstorage
        // Object.keys(usuario).map(key=>{
        //   LocalStorage.set(key, usuario[key])
        // })
        LocalStorage.set('token', entidad.token)
        //mutear el estado

        commit('setEntidadMutation', entidad)
        return entidad
      }
    } catch (err) {
      return {}
    }

  },
  logoutAction({ commit }) {
    let entidad: EntidadStateInterface = {
      id: null,
      nombre: null,
      direccion: null,
      descripcion: null,
      token: null
    }

    LocalStorage.getAllKeys().forEach(key => {
      LocalStorage.remove(key)
    });

    //mutear el estado
    commit('setEntidadMutation', entidad)
    return entidad
  },

  set_entidad_loggue({ commit }, entidad) {
    let entidadd: EntidadStateInterface = {
      id: entidad.id,
      nombre: entidad.nombre,
      direccion: entidad.direccion,
      descripcion: entidad.descripcion,
      token: entidad.token
    }
    //mutear el estado
    commit('setEntidadMutation', entidadd)

  },
  async verifyTokenAction({ commit }, args) {
    try {
      let status: boolean = await verifyTokenEExecute(args)
      return status
    } catch (err) {
      return false
    }
  }
};

export default actions;
