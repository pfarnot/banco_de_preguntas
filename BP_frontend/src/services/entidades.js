import { api } from "src/boot/axios";

export async function loginEntidadExecute({ entidad, clave}) {
    let entidades = await api.post('/entidad/login',{ entidad, clave})
    let resp = entidades.data 
 
    return resp
} 

export async function obtenerEntidadExecute(){
    let resp = await api.get('/entidad', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}
export async function obtenerEntidadNombreExecute(){
    let resp = await api.get('/entidad', {headers:{Authorization:window.localStorage.getItem('token')}})
    let aux =[]
    for(let {id:i, nombre:n} of resp.data){
      aux.push({id:i, nombre:n})
    }
    return aux
}

export async function crearEntidadExecute(form){
    await api.post('/entidad',form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerEntidadExecute()
    return resp
}

export async function eliminarEntidadExecute(id){
    await api.delete(`/entidad/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerEntidadExecute()
    return resp
}
export async function modificarEntidadExecute(id,form){
    await api.put(`/entidad/${id}`,form,{headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerEntidadExecute()
    return resp
}

export async function verifyTokenEExecute(token){
  
    let validado = await api.post(`/entidad/token/verify`, {token},  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = validado.data 
    
    return resp
}
export async function getCredencialsFromEntidadExecute(token) {
    let rol = await api.post('/entidad/token',{token}, {headers:{Authorization:window.localStorage.getItem('token')}})
  
    let resp = rol.data 
    return resp
}