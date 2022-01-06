import { api } from "src/boot/axios";


export async function obtenerRolExecute(){
    let resp = await api.get('/rol', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}

export async function crearRolExecute(form){
    await api.post('/rol',form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerRolExecute()
    return resp
}

export async function eliminarRolExecute(id){
    await api.delete(`/rol/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerRolExecute()
    return resp
}
export async function modificarRolExecute(id,form){
    await api.put(`/rol/${id}`,form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerRolExecute()
    return resp
}