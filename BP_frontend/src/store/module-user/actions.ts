import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { LocalStorage, SessionStorage } from 'quasar'
import {
  loginUsuarioExecute,
  verifyTokenExecute,
  getCredencialsFromUserExecute
} from "../../services/usuarios";


const actions: ActionTree<UserStateInterface, StateInterface> = {

  async getCredencialsFromUserAction({ commit }, args) {
    try {
      let usuario: UserStateInterface = await getCredencialsFromUserExecute(args)
      if (usuario.usuario) {
        //mutear el estado
        commit('setUserMutation', usuario)
      }
      return usuario
    } catch (err) {
      return {}
    }

  },
  async loginAction({ commit }, args) {
    try {

      let usuario: UserStateInterface = await loginUsuarioExecute(args)
      console.log(usuario)
      if (usuario.usuario) {
        //guardar el objeto usuario en localstorage
        // Object.keys(usuario).map(key=>{
        //   LocalStorage.set(key, usuario[key])
        // })
        LocalStorage.set('token', usuario.token)
        //mutear el estado
       
        commit('setUserMutation', usuario)
        return usuario
      }
    } catch (err) {
      return {}
    }

  },
  logoutAction({ commit }) {
    let usuario: UserStateInterface = {
      nombre: null,
      usuario: null,
      entidad: null,
      rol: null,
      token: null
    }

    LocalStorage.getAllKeys().forEach(key => {
      LocalStorage.remove(key)
    });

    //mutear el estado
    commit('setUserMutation', usuario)
    return usuario
  },
  set_user_loggue({ commit },user) {
    let usuario: UserStateInterface = {
      nombre: user.nombre,
      usuario: user.usuario,
      entidad: user.entidad,
      rol: user.rol,
      token: user.token
    }
     //mutear el estado
    commit('setUserMutation', usuario)
    
  },
  async verifyTokenAction({ commit }, args) {
    try {
      let status: boolean = await verifyTokenExecute(args)
      return status
    } catch (err) {
      return false
    }
  }
};

export default actions;
