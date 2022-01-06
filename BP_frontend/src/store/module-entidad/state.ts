

export interface EntidadStateInterface {
  id: number|null;
  nombre: string | null;
  direccion: string | null;
  descripcion: string | null;
  token: string | null;
}

function state(): EntidadStateInterface {
  return {
    id:null,
    nombre: null,
    direccion: null,
    descripcion: null,
    token: localStorage.getItem('token')?.slice(9) || null,

  }
};

export default state;
