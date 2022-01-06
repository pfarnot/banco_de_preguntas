import pool from '../services/connect'

function crear(req, res) {
  console.log(req.body)
  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  let text = 'INSERT INTO negocio.pregunta_fragmentada(tematica,pregunta,fragmentos) VALUES($1,$2,$3) RETURNING *'
  let values = [req.body.tematica, req.body.pregunta, req.body.fragmentos]
  pool
    .query(text, values)
    .then(r => {
      res.send({ cantAñadida: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

  }
function obtener(req, res) {

  let text = "SELECT * FROM negocio.pregunta_fragmentada "
  pool
    .query(text)
    .then(r => {
      console.log(r.rows[0])
      res.json(r.rows)
    }).catch(err => {
      console.log(err)
    })

}



function obtenerFragmentoPF(req, res) {

  let text = "SELECT fragmentos FROM negocio.pregunta_fragmentada"
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
  let text = `DELETE  FROM negocio.pregunta_fragmentada WHERE id=${req.params.id}`
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
  const tematica = req.body.tematica
  const pregunta = req.body.pregunta
  const fragmentos = req.body.fragmentos
  const respuesta = await pool.query(`UPDATE negocio.pregunta_fragmentada SET tematica=$1,pregunta=$2,fragmentos=$3 WHERE id=$4`, [tematica, pregunta, fragmentos, id])
  console.log(respuesta)
  res.send('pregunta_fragmentada actualizado')
}


//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
  obtenerFragmentoPF,
  eliminar,
  modificar,

}