import pool from '../services/connect'
import jwt from 'jwt-simple'
import { compareEncrypted, encrypt } from '../services/encrypt'
import { crearToken, decodeToken } from '../services/services_token_api'

function crear(req, res) {
    //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
    let text = 'INSERT INTO negocio.usuario(nombre, usuario, contrasenna, rol, entidad) VALUES($1, $2, $3, $4, $5) RETURNING *'
    let values = [req.body.nombre, req.body.usuario, encrypt(req.body.contrasenna), req.body.rol, req.body.entidad]
    pool
        .query(text, values)
        .then(res => {
            console.log(res.rows[0])
        })

    res.send({ msg: 'creando' })
}

function obtener(req, res) {

    let text = "SELECT * FROM negocio.usuario "
    pool
        .query(text)
        .then(r => {
            console.log(r.rows[0])
            res.json(r.rows)
        }).catch(err => {
            console.log(err)
        })

}

function getCredencialsFromUser(req, res) {
    let token = req.body.token
    console.log(token)

    let text = "SELECT nombre, usuario, entidad, rol, token FROM negocio.usuario WHERE token=$1"
    let values = [token]
    pool
        .query(text, values)
        .then(r => {
            
           res.json(  r.rows[0] )
        }).catch(err => {
            console.log(err)
        })

}


async function verifyToken(req, res) {
console.log(req.body.token)
    let token = req.body.token
    let user = null
    try {
        user = await decodeToken(token)
        let text = "SELECT usuario FROM negocio.usuario WHERE token=$1"
        let values = [token]
        pool
            .query(text, values)
            .then(r => {
                if (r.rows.length > 0) {
              
                   // res.json(r.rows[0].usuario == user)
                   res.json(true)
                }
                else {
                    res.json(false)
                }
    })
    } catch (err) {
        res.json(false)
        
    }



}

function eliminar(req, res) {
    console.log(req.params.id)
    let text = `DELETE  FROM negocio.usuario WHERE usuario='${req.params.id}'`
    // let values = [req.body.id]
    pool
        .query(text)
        .then(r => {
            res.send({ cantEliminados: r.rowCount })
            res.send(JSON.stringify(r))
        }).catch(error => {
            res.send(JSON.stringify(error))
        })

}

const modificar = async (req, res) => {
    const id = req.params.id
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const contrasenna = req.body.contrasenna
    const rol = req.body.rol
    const respues = await pool.query(`UPDATE negocio.usuario SET nombre=$1,usuario=$2,contrasenna=$3,rol=$4 WHERE id=$5`, [nombre, usuario, contrasenna, rol, id])
    console.log(respues)
    res.send('usuario actualizado')
}


function login(req, res) {
    //salvo el usuario y la contrasenna en variables 
    let user = req.body.usuario
    let password = req.body.clave
    let entidad = req.body.entidad

    //verifico si existe el usuario y coincide con la contraseña
    let sql = `SELECT * FROM negocio.usuario WHERE usuario='${user}' AND entidad = ${entidad}`

    // OJO res y resp son variables distintas, no son lo mismo
    pool
        // ejecuto la consulta
        .query(sql)
        //guardo la respuesta de mi consulta en resp
        .then(resp => {
            if (resp.rows.length == 0) res.send({ mess: 'No existe ese usuario' })
            // si resp es 1 es que el usuario esta registrado en la base de datos
            if (resp.rows.length == 1 && compareEncrypted(password, resp.rows[0].contrasenna)) {
                // salvo a el usuario en userBin
                let userBind = resp.rows[0]
                //para generar el token 
                var payload = { sub: userBind.usuario };
                let token = crearToken(payload)


                // actualizar el token del usuario en la base de datos
                let sql_update = `UPDATE negocio.usuario set token='${token}' where usuario='${userBind.usuario}'`
                pool.query(sql_update).then(r => {
                    //tengo q devolver el archivo json para q la api sepa q está logeado
                    res.json({ nombre: userBind.nombre, usuario: userBind.usuario, rol: userBind.rol, entidad: userBind.entidad, token })
                }).catch(err => console.log(err))

            }
            else {
                console.log("contraseña incorrecta")
                res.json({ msj: 'datos incorrectos' })

            }
        })
}


//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
    crear,
    obtener,
    eliminar,
    modificar,
    login,
    getCredencialsFromUser,
    verifyToken

}

// module.exports = {
//     crear,
//     obtener,
//     obtenerPorId,
//     eliminar,
//     modificar
//   }