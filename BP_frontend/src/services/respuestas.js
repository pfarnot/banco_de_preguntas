import { api } from "src/boot/axios";


export async function obtenerTipoRespuestaExecute() {
    let resp = await api.get('/tipoRespuesta', {headers:{Authorization:window.localStorage.getItem('token')}})
    return resp.data
}

export async function crearTipoRespuestaExecute(form) {
    await api.post('/tipoRespuesta', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerTipoRespuestaExecute()
    return resp
}

export async function eliminarTipoRespuestaExecute(id) {
    await api.delete(`/tipoRespuesta/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerTipoRespuestaExecute()
    return resp
}
export async function modificarTipoRespuestaExecute(id, form) {
    await api.put(`/tipoRespuesta/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerTipoRespuestaExecute()
    return resp
}

// export async function obtenerRespuestaExecute(){
//     let resp = await api.get('/respuestaSimple')
//     return resp.data
// }

export async function crearRespuestaExecute(form) {
    await api.post('/respuestaSimple', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerRespuestaExecute()
    return resp
}

export async function eliminarRespuestaExecute(id) {
    await api.delete(`/respuestaSimple/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerRespuestaExecute()
    return resp
}
export async function modificarRespuestaExecute(id, form) {
    await api.put(`/respuestaSimple/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerRespuestaExecute()
    return resp
}

export async function obtenerPackRespuestaExecute() {
    let packR = await api.get('/packRespuesta', {headers:{Authorization:window.localStorage.getItem('token')}})
    let tipoRespuesta = await api.get('/tipoRespuesta', {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []

    for (let { id: i, tipo: t, pack: r, cardinalidad: f } of packR.data) {

        for (let { id: it, tipo: tt } of tipoRespuesta.data) {
            if (t == it) {
                t = tt
            }
        }

        resp.push({ id: i, tipo: t, pack: r, cardinalidad: f })

    }

    return resp
}

export async function obtenerRespuestaSPExecute() {
    let packR = await api.get('/respuesta', {headers:{Authorization:window.localStorage.getItem('token')}})
    let myrespuesta = await api.get('/respuestaSimple', {headers:{Authorization:window.localStorage.getItem('token')}})

    let resp = []

    for (let { id: i, tipo: t, pack: pr, respuestas: f, respuesta: rt } of packR.data) {

        for (let { id: it, respuesta: r } of myrespuesta.data) {
            if (f != null) {
                for (var c = 0; c < f.length; c++) {

                    if (f[c] == it) {
                        f[c] = r

                    }

                }
            }

        }
        resp.push({ id: i, tipo: t, pack: pr, respuestas: f, respuesta: rt })
    }


    return resp
}


export async function obtenerRespuestaSPporTipoExecute(tipo) {
    let resp = []
    try {
        let packR = await api.get(`/respuesta/${tipo}`, {headers:{Authorization:window.localStorage.getItem('token')}})
        let myrespuesta = await api.get('/respuestaSimple', {headers:{Authorization:window.localStorage.getItem('token')}})
        for (let { id: i, tipo: t, pack: pr, respuestas: f, respuesta: rt } of packR.data) {

            for (let { id: it, respuesta: r } of myrespuesta.data) {
                if (f != null) {
                    for (var c = 0; c < f.length; c++) {
    
                        if (f[c] == it) {
                            f[c] = r
    
                        }
    
                    }
                }
    
            }
            resp.push({ id: i, tipo: t, pack: pr, respuestas: f, respuesta: rt })
        }



    } catch (error) {
    }
    
    

    return resp
}


export async function crearPackRespuestaExecute(form) {
    await api.post('/packRespuesta', form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPackRespuestaExecute()
    return resp
}

export async function eliminarPackRespuestaExecute(id) {
    await api.delete(`/packRespuesta/${id}`,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPackRespuestaExecute()
    return resp
}
export async function modificarPackRespuestaExecute(id, form) {
    await api.put(`/packRespuesta/${id}`, form,  {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = await obtenerPackRespuestaExecute()
    return resp
}


export async function obtenerRespuestaExecute() {

    let tipoRespuesta = await api.get('/tipoRespuesta', {headers:{Authorization:window.localStorage.getItem('token')}})
    let respuesta = await api.get('/respuestaSimple', {headers:{Authorization:window.localStorage.getItem('token')}})
    let resp = []

    for (let { id: i, tipo: t, fresuancia: f, respuesta: r } of respuesta.data) {

        for (let { id: it, tipo: tt } of tipoRespuesta.data) {
            if (t == it) {
                t = tt
            }
        }

        resp.push({ id: i, tipo: t, respuesta: r })

    }

    return resp
    // let resp = await api.get('/preguntaFragmentada')
    // return resp.data
}
export async function obtenerRespuesta2Execute() {


    let resp = await api.get('/respuestaSimple', {headers:{Authorization:window.localStorage.getItem('token')}})

    return resp.data
    // let resp = await api.get('/preguntaFragmentada')
    // return resp.data
}