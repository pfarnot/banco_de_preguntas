import express from 'express'
import { login, crear, obtener, obtenerPorId, modificar, eliminar,verifyToken,getCredencialsFromEntidad } from '../controller/entidadController'

let route = express.Router()

route.post('/',crear)
route.post('/login',login)
route.get('/', obtener)
route.get('/:id', obtenerPorId)
route.put('/:id',modificar)
route.delete('/:id',eliminar)
route.post('/token/verify', verifyToken)
route.post('/token', getCredencialsFromEntidad)

//export default route
 module.exports=route