import pool from '../services/connect'
import jwt from 'jwt-simple'
import { compareEncrypted, encrypt } from '../services/encrypt'
import { crearToken, decodeToken  } from '../services/services_token_api'


function crear(req, res) {
    //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
    let text = 'INSERT INTO negocio.entidad(nombre, direccion, descripcion, contrasenna) VALUES($1, $2, $3, $4) RETURNING *'
    let values = [req.body.nombre, req.body.direccion, req.body.descripcion, encrypt(req.body.contrasenna)]
    pool
        .query(text, values)
        .then(res => {
            console.log(res.rows[0])
        })

    res.send({ msg: 'creando' })
}

function obtener(req, res) {

    let text = "SELECT * FROM negocio.entidad "
    pool
        .query(text)
        .then(r => {
            res.json(r.rows)
        }).catch(err => {
            console.log(err)
        })

}


async function verifyToken(req, res) {
    console.log("verifivando token entidad")
    let token = req.body.token
    let user = null
    try {
        console.log("user")
        user = await decodeToken(token)
        console.log("user")
        
        let text = "SELECT nombre FROM negocio.entidad WHERE token=$1"
        let values = [token]
        pool
            .query(text, values)
            .then(r => {
                console.log()
                if (r.rows[0]!=null) {

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


function obtenerPorId(req, res) {
    let text = "SELECT * FROM negocio.entidad WHERE id=$1"
    let values = [req.body.id]
    pool
        .query(text, values)
        .then(r => {
            console.log(r.rows[0])
            res.json(r.rows)
        }).catch(err => {
            console.log(err)
        })

}

function eliminar(req, res) {
    let text = `DELETE  FROM negocio.entidad WHERE id=${req.params.id}`
    // let values = [req.body.id]
    pool
        .query(text)
        .then(r => {
            res.send({ cantEliminados: r.rowCount })
        }).catch(error => {
            res.send(JSON.stringify(error))
        })
}

function getCredencialsFromEntidad(req, res) {
    let token = req.body.token
    console.log(token)

    let text = "SELECT id,nombre,direccion,descripcion,token FROM negocio.entidad WHERE token=$1"
    let values = [token]
    pool
        .query(text, values)
        .then(r => {

            res.json(r.rows[0])
        }).catch(err => {
            console.log(err)
        })
}

const modificar = async (req, res) => {
    const id = req.params.id
    const nombre = req.body.nombre
    const direccion = req.body.direccion
    const descripcion = req.body.descripcion

    const respues = await pool.query(`UPDATE negocio.entidad SET nombre=$1,direccion=$2,descripcion=$3 WHERE id=$4`, [nombre, direccion, descripcion, id])
    console.log(respues)
    res.send('usuario actualizado')
}

function login(req, res) {
    //salvo el usuario y la contrasenna en variables 
    console.log(req.body)
    let password = req.body.clave
    let entidad = req.body.entidad

    //verifico si existe el usuario y coincide con la contraseña
    let sql = `SELECT * FROM negocio.entidad WHERE id='${entidad}'`

    // OJO res y resp son variables distintas, no son lo mismo
    pool
        // ejecuto la consulta
        .query(sql)
        //guardo la respuesta de mi consulta en resp
        .then(resp => {
            console.log(resp.rows[0])
            if (resp.rows.length == 0) res.send({ mess: 'No existe esa entidad' })
            // si resp es 1 es que el usuario esta registrado en la base de datos
            console.log(password)
            if (resp.rows.length == 1 && compareEncrypted(password, resp.rows[0].contrasenna)) {
                // salvo a el usuario en userBin
                let userBind = resp.rows[0]

                //para generar el token 
                var payload = { sub: userBind.usuario };
                let token = crearToken(userBind)

                // actualizar el token del usuario en la base de datos
                let sql_update = `UPDATE negocio.entidad set token='${token}' where id='${userBind.id}'`
                pool.query(sql_update).then(r => {
                    //tengo q devolver el archivo json para q la api sepa q está logeado
                    res.json({ nombre: userBind.nombre, direccion: userBind.direccion, descripcion: userBind.descripcion, token })
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
    obtenerPorId,
    eliminar,
    modificar,
    verifyToken,
    getCredencialsFromEntidad,
    login
}