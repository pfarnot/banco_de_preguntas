import express from 'express'
import { index, destroy} from '../controller/ducumentoController'

let route = express.Router()

route.post('/',index)
route.delete('/:recurso',destroy)

//export default route
 module.exports = route