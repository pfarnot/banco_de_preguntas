import express from 'express'
import { crear, obtener, obtenerPorId, modificar, eliminar ,annadirPreguntaConRespuesta} from '../controller/registroCuestionarioController'

let route = express.Router()

route.post('/',crear)
route.post('/add',annadirPreguntaConRespuesta)
route.get('/', obtener)
route.get('/:id', obtenerPorId)
route.put('/:id',modificar)
route.delete('/:id',eliminar)

//export default route
 module.exports = route