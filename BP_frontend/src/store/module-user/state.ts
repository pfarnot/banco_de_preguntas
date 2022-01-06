

export interface UserStateInterface {
  nombre: string | null;
  usuario: string | null;
  entidad: string | null;
  rol: string | null;
  token: string | null;
}

function state(): UserStateInterface {
    return {
    nombre: null,
    usuario: null,
    entidad: null,
    rol: null,
    token: localStorage.getItem('token')?.slice(9) || null,

  }
};

export default state;
