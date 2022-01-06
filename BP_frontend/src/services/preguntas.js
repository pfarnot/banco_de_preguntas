import { api } from "src/boot/axios";


export async function obtenerPreguntaExecute() {

    let listFrag = await api.get('/pregunta', {headers:{Authorization:window.localStorage.getItem('token')}})
    let Frag = await api.get('/fragmento', {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []


    for (let { id: identificador, tematica: algo, pregunta: f, fragmentos: frag } of listFrag.data) {

        for (let { id: identificador, morfema: algo, frecuencia: f } of Frag.data) {

            if (frag != null) {
                for (var i = 0; i < frag.length; i++) {
                    if (frag[i] == identificador) {
                        resp.push(algo)
                        frag[i] = algo

                    }

                }
            }
        }

    }

    resp = listFrag.data

    return resp
   
}

export async function obtenerPreguntaPorTematicaExecute(id) {

    let listFrag = await api.get(`/pregunta/${id}`, {headers:{Authorization:window.localStorage.getItem('token')}})
    let Frag = await api.get('/fragmento', {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []


    for (let { id: identificador, tematica: algo, pregunta: f, fragmentos: frag } of listFrag.data) {

        for (let { id: identificador, morfema: algo, frecuencia: f } of Frag.data) {

            if (frag != null) {
                for (var i = 0; i < frag.length; i++) {
                    if (frag[i] == identificador) {
                        resp.push(algo)

                        frag[i] = algo

                    }

                }
            }
        }

    }

    resp = listFrag.data

    return resp
}

export async function obtenerPreguntaSimpleExecute() {
    let resp = await api.get('/preguntaSimple', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}

export async function crearPreguntaSimpleExecute(form) {
    await api.post('/preguntaSimple', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaSimpleExecute()
    return resp
}

export async function eliminarPreguntaSimpleExecute(id) {
    await api.delete(`/preguntaSimple/${id}`, {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaSimpleExecute()
    return resp
}
export async function modificarPreguntaSimpleExecute(id, form) {
    await api.put(`/preguntaSimple/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaSimpleExecute()
    return resp
}
export async function obtenerPreguntaFragmentadaExecute() {

    let listFrag = await api.get('/preguntaFragmentada', {headers:{Authorization:window.localStorage.getItem('token')}})
    let Frag = await api.get('/fragmento', {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []


    for (let { id: identificador, tematica: algo, pregunta: f, fragmentos: frag } of listFrag.data) {


        for (let { id: identificador, morfema: algo, frecuencia: f } of Frag.data) {



            for (var i = 0; i < frag.length; i++) {
                if (frag[i] == identificador) {
                    resp.push(algo)
                    frag[i] = algo


                }
            }


        }

    }

    resp = listFrag.data

    return resp
    // let resp = await api.get('/preguntaFragmentada')
    // return resp.data
}

export async function crearPreguntaFragmentadaExecute(form) {
    await api.post('/preguntaFragmentada', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaFragmentadaExecute()
    return resp
}

export async function eliminarPreguntaFragmentadaExecute(id) {
    await api.delete(`/preguntaFragmentada/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaFragmentadaExecute()
    return resp
}
export async function modificarPreguntaFragmentadaExecute(id, form) {
    await api.put(`/preguntaFragmentada/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPreguntaFragmentadaExecute()
    return resp
}



export async function obtenerfragmentoExecute() {
    let resp = await api.get('/fragmento', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}

export async function crearfragmentoExecute(form) {
    await api.post('/fragmento', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerfragmentoExecute()
    return resp
}

export async function eliminarfragmentoExecute(id) {
    await api.delete(`/fragmento/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerfragmentoExecute()
    return resp
}
export async function modificarfragmentoExecute(id, form) {
    await api.put(`/fragmento/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerfragmentoExecute()
    return resp
}
