import pool from '../services/connect'


function obtener(req, res) {

  let text = `SELECT * FROM ONLY negocio.respuesta_simple rs NATURAL FULL JOIN negocio.pack_respuesta pr`
  pool
    .query(text)
    .then(r => {
      console.log(r.rows[0])
      res.json(r.rows)
    }).catch(err => {
      console.log(err)
    })

    }


    function obtenerPorTipo(req, res) {
// console.log("Tipo: "+req.params.tipo)
      let text = `SELECT * FROM ONLY negocio.respuesta_simple NATURAL FULL JOIN negocio.pack_respuesta WHERE tipo=$1`
      let values = [req.params.tipo]
      pool
        .query(text,values)
        .then(r => {
          //console.log(r.rows)
          res.json(r.rows)
        }).catch(err => {
          console.log(err)
        })
    
    }



module.exports = {
    obtener,
    obtenerPorTipo,
  
  }
