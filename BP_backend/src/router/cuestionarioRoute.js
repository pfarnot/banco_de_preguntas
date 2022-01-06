import express from 'express'
import { obtener } from '../controller/cuestionarioController'

let route = express.Router()

// route.post('/',crear)
 route.get('/', obtener)
// route.get('/:id', obtenerPorId)
// route.put('/:id',modificar)
// route.delete('/:id',eliminar)

//export default route
 module.exports=route