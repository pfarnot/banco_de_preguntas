import express from 'express'
import { verifyToken,getCredencialsFromUser,login, crear, obtener, modificar, eliminar } from '../controller/registroUsuarioController'

let route = express.Router()

route.post('/', crear)
route.post('/login', login)
route.get('/', obtener)
route.post('/token', getCredencialsFromUser)
route.post('/token/verify', verifyToken)
route.put('/:id', modificar)
route.delete('/:id', eliminar)

//export default route
module.exports = route