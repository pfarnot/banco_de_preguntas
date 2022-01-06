import express from 'express'
import { crearCuestionario, insertarPyR } from '../controller/generadorCuestionarioController'

let route = express.Router()

route.post('/',crearCuestionario)
route.get('/', insertarPyR)
// route.get('/:id', obtenerPorId)
// route.put('/:id',modificar)
// route.delete('/:id',eliminar)

//export default route
 module.exports=route