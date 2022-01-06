import { api } from "src/boot/axios";


export async function obtenerTematicasExecute(){
    let resp = await api.get('/tematica', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}

export async function crearTematicaExecute(form){
    await api.post('/tematica',form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerTematicasExecute()
    return resp
}

export async function eliminarTematicaExecute(id){
    await api.delete(`/tematica/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerTematicasExecute()
    return resp
}
export async function modificarTematicaExecute(id,form){
    await api.put(`/tematica/${id}`,form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp =await obtenerTematicasExecute()
    return resp
}