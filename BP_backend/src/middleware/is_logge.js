import { decodeToken } from '../services/services_token_api'

export async function isLogged(req, res, next){
    let token = req.headers.authorization || null 
    console.log(token)
    if(token != null && token != 'null'){
        // quasar le añade una cascarilla al token (en la proxima linea se limpia)
        token=token.split('|')[1]
        try {
            let payload = await decodeToken(token)
            req.user = payload.sub
            req.isLogger=true
        } catch (error) {
            console.log(error.message)
        }
        next()
    }else{
        console.log('bloqueado por no mandar el token')
    }
    
}