import pool from '../services/connect'

function obtener(req, res) {
  let text = `SELECT * FROM ONLY negocio.pregunta_simple ps NATURAL 
  FULL JOIN negocio.pregunta_fragmentada pf`
  pool
    .query(text)
    .then(r => {
      res.json(r.rows)
    }).catch(error => {
      res.send(JSON.stringify(error))
    })
}

function obtenerPorTematica(req, res) {
  let text = `SELECT * FROM ONLY negocio.pregunta_simple NATURAL FULL JOIN 
  negocio.pregunta_fragmentada WHERE tematica=$1`
  let values = [req.params.id]
  pool
    .query(text, values)
    .then(r => {
      res.json(r.rows)
    }).catch(err => {
      res.send(JSON.stringify(err))
    })
}


module.exports = {

  obtener,
  obtenerPorTematica,

}
