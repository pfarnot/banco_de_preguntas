import express from 'express'
import { crear, obtener, obtenerPorId, modificar, eliminar } from '../controller/preguntaSimpleController'

let route = express.Router()

route.post('/',crear)
route.get('/', obtener)
route.get('/:id', obtenerPorId)
route.put('/:id',modificar)
route.delete('/:id',eliminar)

//export default route
 module.exports=route