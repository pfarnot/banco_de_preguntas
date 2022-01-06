import express from 'express'
import {  obtener, obtenerPorTipo, } from '../controller/respuestaController'

let route = express.Router()


route.get('/', obtener)
route.get('/:tipo', obtenerPorTipo)


//export default route
 module.exports=route