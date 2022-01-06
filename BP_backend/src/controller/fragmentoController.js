import pool from '../services/connect'


function crear(req, res) {
  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  console.log(req.body.morfema)
  let text = 'INSERT INTO negocio.fragmento(morfema) VALUES($1) RETURNING *'
  let values = [req.body.morfema]
  pool
    .query(text, values)
    .then(r =>  {
      res.send({ cantAñadida: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

  }

function obtener(req, res) {

  let text = "SELECT * FROM negocio.fragmento "
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

  let text = `SELECT * FROM negocio.fragmento where id = ${[req.params.id]}`
  console.log([req.params.id])
  pool
    .query(text)
    .then(r => {
      console.log(r.rows[0])
      res.json(r.rows)
    }).catch(err => {
      console.log(err)
    })

}

function eliminar(req, res) {
  let text = `DELETE  FROM negocio.fragmento WHERE id=$1`
  let values = [req.body.id]
  pool
    .query(text,values)
    .then(r => {
      res.send({ cantEliminados: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

}

const modificar = async (req, res) => {
  const id = req.params.id
  const morfema = req.body.morfema
  const respuesta = await pool.query(`UPDATE negocio.fragmento SET morfema=$1 WHERE id=$2`, [morfema, id])
  console.log(respuesta)
  res.send('morfema actualizado')
}


//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
  obtenerPorId,
  eliminar,
  modificar
}