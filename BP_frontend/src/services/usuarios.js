import { api } from "src/boot/axios";


export async function obtenerUsuarioExecute() {
    let usuarios = await api.get('/registroUsuario',  {headers:{Authorization:window.localStorage.getItem('token')}})
    let entidades = await api.get('/entidad',  {headers:{Authorization:window.localStorage.getItem('token')}})
    let roles = await api.get('/rol',  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []

    for (let { nombre: n, usuario:u,entidad: e, rol: r } of usuarios.data) {
        for (let { id: i, nombre: n } of entidades.data) {
            if (e == i) {
                e = n
            }
        } 
        for (let { id: id, rol: rl } of roles.data) {
            if (r == id) {
                r = rl
            }
        }
       resp.push({nombre: n, usuario:u,entidad: e, rol: r})
    }
   
    return resp
}


export async function loginUsuarioExecute({usuario, clave, entidad}) {
    let usuarios = await api.post('/registroUsuario/login',{usuario, clave, entidad},  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = usuarios.data 
    return resp
}
export async function getCredencialsFromUserExecute(token) {
    let rol = await api.post('/registroUsuario/token',{token},  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = rol.data 
    return resp
}

export async function verifyTokenExecute(token){
   
    let validado = await api.post(`/registroUsuario/token/verify`, {token},  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = validado.data 
  
    return resp
}


export async function crearUsuarioExecute(form) {
    await api.post('/registroUsuario', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerTematicasExecute()
    return resp
}

export async function eliminarUsuarioExecute(id) {
    await api.delete(`/registroUsuario/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerUsuarioExecute()
    return resp
}
export async function modificarUsuarioExecute(id, form) {
    await api.put(`/registroUsuario/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerUsuarioExecute()
    return resp
}