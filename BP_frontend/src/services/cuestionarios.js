import { api } from "src/boot/axios";


export async function crearCuestionarioExecute(form){
   let resp = await api.post('/cuestionario/',form,  {headers:{Authorization:window.localStorage.getItem('token')}})
 console.log(resp)
   return resp
}

export async function guardarCuestionarioExecute(form){
    let resp = await api.post('/cuestionario/add',form,  {headers:{Authorization:window.localStorage.getItem('token')}})
 
     return resp
 }


 export async function descargarCuestionarioExecute(cuestionario){
    let resp = await api.post('/documento/',cuestionario,  {headers:{Authorization:window.localStorage.getItem('token')}})
 
    let a = document.createElement("a")
    a.setAttribute('href',`http://localhost:3001/recursos/${resp.data.ruta}`)
    document.body.appendChild(a);
    a.click()
  
    setTimeout(function(){ let borrar = api.delete(`/documento/${resp.data.ruta}`,  {headers:{Authorization:window.localStorage.getItem('token')}}) }, 5000);
  
  //   let borrar = api.delete(`/documento/${resp.data.ruta}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
  
  }