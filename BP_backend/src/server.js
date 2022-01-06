import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import fileUpload from 'express-fileupload'
import config from './config'

import {isLogged} from './middleware/is_logge'

let app = express()
//app.use(express.static(path.join(__dirname, './img')))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(morgan('dev'))
//app.use(isLogged)


app.use('/cuestionarios',isLogged, require('./router/cuestionarioRoute'))
app.use('/documento', require('./router/documentoRoute'))
app.use('/cuestionario',isLogged, require('./router/registroCuestionarioRoute'))
app.use('/generadorCuestionario',isLogged, require('./router/generadorCuestionarioRoute'))
app.use('/tematica', require('./router/tematicaRoute'))
app.use('/pregunta',isLogged, require('./router/preguntaRoute'))

app.use('/preguntaSimple',isLogged, require('./router/preguntaSimpleRoute'))
app.use('/preguntaFragmentada', isLogged,require('./router/preguntaFragmentadaRoute'))
app.use('/respuesta', isLogged,require('./router/respuestaRoute'))
app.use('/respuestaSimple', isLogged,require('./router/respuestaSimpleRoute'))
app.use('/packRespuesta',isLogged, require('./router/packRespuestaRoute'))
app.use('/fragmento', isLogged,require('./router/fragmentoRoute'))
app.use('/rol', require('./router/rolRoute'))
app.use('/tipoRespuesta', isLogged,require('./router/tipoRespuestaRoute'))
app.use('/registroUsuario',require('./router/registroUsuarioRoute'))
app.use('/entidad', require('./router/entidadRoute'))

app.use('/recursos',express.static(__dirname + '/public'))

//Server is listenend
app.set('port', config.port)
app.listen(app.get('port'), () => {
    console.log(`api banco_pregunta running by PORT ${app.get('port')}...`)
})

export {app} 

