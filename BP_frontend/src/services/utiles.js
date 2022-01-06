import { api } from "src/boot/axios";


export async function listarFragmentById() {
    let listFrag = await api.get('/preguntaFragmentada')
    let Frag = await api.get('/fragmento')
    let resp = []


    for (let { id: identificador, tematica: algo, lexema: f, fragmentos: frag } of listFrag.data) {

        for (let { id: identificador, morfema: algo, frecuencia: f } of Frag.data) {

            for (var i = 0; i < frag.length; i++) {
                if (frag[i] == identificador) {
                    resp.push(algo)
                    frag[i] = algo
                }

            }

        }
    }

    
    return listFrag.data
}

