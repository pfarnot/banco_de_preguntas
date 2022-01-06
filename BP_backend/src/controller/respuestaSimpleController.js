import pool from '../services/connect'


function crear(req, res) {
  console.log(req.body)

  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  let text = 'INSERT INTO negocio.respuesta_simple(tipo,respuesta) VALUES($1,$2) RETURNING *'
  let values = [req.body.tipo.id, req.body.respuesta]
  pool
    .query(text, values)
    .then(r =>  {
      res.send({ cantAñadida: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

  }

function obtener(req, res) {

  let text = "SELECT * FROM negocio.respuesta_simple "
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

  let text = "SELECT * FROM negocio.respuesta_simple WHERE id=$1"
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
  let text = `DELETE  FROM negocio.respuesta_simple WHERE id=${req.params.id}`
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
  const tipo = req.body.tipo.id
  const respuesta = req.body.respuesta
  const respues = await pool.query(`UPDATE negocio.respuesta_simple SET tipo=$1,respuesta=$2 WHERE id=$3`, [tipo, respuesta, id])
  console.log(respues)
  res.send('respuesta_simple actualizada')
}

//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
  obtenerPorId,
  eliminar,
  modificar
}