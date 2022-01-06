import { MutationTree } from 'vuex';
import { EntidadStateInterface } from './state';

const mutation: MutationTree<EntidadStateInterface> = {
  setEntidadMutation(state: EntidadStateInterface, usuario: EntidadStateInterface) {
    state.id = usuario.id
    state.nombre = usuario.nombre
    state.direccion = usuario.direccion
    state.descripcion = usuario.descripcion
    state.token = usuario.token


  }

};

export default mutation;
