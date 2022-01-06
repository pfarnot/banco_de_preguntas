import express from 'express'
import {obtener,obtenerPorTematica} from '../controller/preguntaController'

let route = express.Router()


route.get('/', obtener)
route.get('/:id', obtenerPorTematica)

//export default route
 module.exports=route