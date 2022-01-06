import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  setUserMutation(state: UserStateInterface, usuario: UserStateInterface) {
    state.nombre = usuario.nombre
    state.usuario = usuario.usuario
    state.entidad = usuario.entidad
    state.rol = usuario.rol
    state.token = usuario.token


  }
  
};

export default mutation;
