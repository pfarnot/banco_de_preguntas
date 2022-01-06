import pool from '../services/connect'


function crear(req, res) {
  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  let text = 'INSERT INTO negocio.tipo_respuesta(tipo) VALUES($1) RETURNING *'
  let values = [req.body.tipo]
  pool
    .query(text, values)
    .then(r => {
      res.send({ cantAñadida: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

  }

function obtener(req, res) {

  let text = "SELECT * FROM negocio.tipo_respuesta "
  pool
    .query(text)
    .then(r => {
      console.log(r.rows[0])
      res.json(r.rows)
    }).catch(err => {
      console.log(err)
    })

}

function obtenerPorId(req, res) {

  let text = "SELECT * FROM negocio.tipo_respuesta WHERE id=$1"
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
  let text = `DELETE  FROM negocio.tipo_respuesta WHERE id=${req.params.id}`
  // let values = [req.body.id]
  pool
    .query(text)
    .then(r => {
      res.send({ cantEliminados: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

}

const modificar = async (req, res) => {
  const id = req.params.id
  const tipo = req.body.tipo
  const respuesta = await pool.query(`UPDATE negocio.tipo_respuesta SET tipo=$1 WHERE id=$2`, [tipo, id])
  console.log(respuesta)
  res.send('Tematica actualizada')
}

//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
  obtenerPorId,
  eliminar,
  modificar
}