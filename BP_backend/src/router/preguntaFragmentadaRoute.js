import express from 'express'
import { crear, obtener, obtenerFragmentoPF, modificar, eliminar } from '../controller/preguntaFragmentadaController'

let route = express.Router()

route.post('/', crear)
route.get('/', obtener)
route.get('/obtenerFragmentoPF', obtenerFragmentoPF)
route.put('/:id', modificar)
route.delete('/:id', eliminar)

//export default route
module.exports = route