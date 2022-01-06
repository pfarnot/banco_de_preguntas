import pool from '../services/connect'


function crear(req, res) {
  //  console.log(req.body.pregunta)
  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  let text = 'INSERT INTO cuestionarios.cuestionario_1(pregunta, respuesta, orden) VALUES($1,$2,$3) RETURNING *'
  let values = [req.body.pregunta, req.body.respuesta, req.body.orden]
  pool
    .query(text, values)
    .then(r => {
      console.log(r.rows[0])
    })
  res.send({ msg: 'creando' })
}

function obtener(req, res) {

  let text = `SELECT * FROM cuestionarios.${req.body.nombre}` 
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
  let text = "DELETE  FROM cuestionarios.cuestionario_1 WHERE morfema=$1"
  let values = [req.body.morfema]
  pool
    .query(text, values)
    .then(r => {
      console.log(r.rows[0])
    })
  res.send({ msg: 'eliminado' })
}

function modificar(req, res) {
  let text = 'UPDATE cuestionarios.cuestionario_1 SET morfema=$2 WHERE id=$1'
  let values = [req.body.id, req.body.morfema]
  pool
    .query(text, values)
    .then(r => {
      console.log(r.rows[0])
    })
  res.send({ msg: 'modificado' })

}

//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
//  obtenerPorId,
  eliminar,
  modificar
}