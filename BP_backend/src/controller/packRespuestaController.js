import pool from '../services/connect'


function crear(req, res) {
 
  //estas dos constantes son para la consulta de crear, son let xq solo se usaran aki en este
  let text = 'INSERT INTO negocio.pack_respuesta(pack,respuestas,cardinalidad, tipo) VALUES($1,$2,$3,$4) RETURNING *'
  let values = [req.body.pack, req.body.respuestas, req.body.cardinalidad, req.body.tipo.id]

  pool
    .query(text, values)
    .then(r => {
     
      res.send({ cantAñadida: r.rowCount })
    }).catch(error => {
      res.send(JSON.stringify(error))
    })

  }
function obtener(req, res) {

  let text = "SELECT * FROM negocio.pack_respuesta "
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

  let text = "SELECT * FROM negocio.pack_respuesta WHERE id=$1"
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
  let text = `DELETE  FROM negocio.pack_respuesta WHERE id=${req.params.id}`
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
  const pack = req.body.pack
  const cardinalidad = req.body.cardinalidad
  const respuestas = req.body.respuestas
  const respues = await pool.query(`UPDATE negocio.pack_respuesta SET tipo=$1,respuestas=$2,cardinalidad=$3,pack=$4 WHERE id=$5`, [tipo, respuestas, cardinalidad, pack, id])
  console.log(respues)
  res.send('pack_respuesta actualizada')
}


//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  obtener,
  obtenerPorId,
  eliminar,
  modificar
}