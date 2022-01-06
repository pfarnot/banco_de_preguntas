'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config'

export function crearToken(user) {
    let payload = {
        sub: user.usuario,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

export function decodeToken(token) {
    let decoded = new Promise((resolve, reject) => {
        try {
            try {
                let payload = jwt.decode(token, config.SECRET_TOKEN)

                console.log({payload})

                resolve(payload.sub)
            } catch (error) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })

            }
   } catch (error) {
            reject({
                status: 500,
                message: 'token invalido'
            })
        }
    })
    return decoded
}


