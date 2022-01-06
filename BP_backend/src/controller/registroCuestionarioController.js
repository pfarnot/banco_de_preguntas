import pool from '../services/connect'
import moment from 'moment'
import fs from 'fs'
import path from 'path'
import docx from 'docx'

async function crear(req, res) {
  console.log("Creando Cuestionario")
  let nombre = req.body.nombre
  let activo = req.body.activo ?? false
  let fecha = moment()
  let creado_por = req.body.usuario 
  let tabla = `cuestionario_${creado_por}_${fecha.unix()}`
  let sql_create_table = `CREATE TABLE cuestionarios.${tabla}( pregunta integer, respuesta integer,
     orden serial NOT NULL,
  id serial NOT NULL,
  CONSTRAINT ${tabla}_pkey PRIMARY KEY (id))
WITH ( OIDS=FALSE);
ALTER TABLE cuestionarios.${tabla}
  OWNER TO postgres;
-- Trigger: verificar_pregunta on cuestionarios.${tabla}
-- DROP TRIGGER verificar_pregunta ON cuestionarios.${tabla};
CREATE TRIGGER verificar_pregunta
  BEFORE INSERT OR UPDATE
  ON cuestionarios.${tabla}
  FOR EACH ROW
  EXECUTE PROCEDURE negocio.verificar_pregunta();`
  try {await pool.query(sql_create_table)
    let sql_insert = `INSERT INTO negocio.registro_cuestionario(nombre, tabla, activo, bloqueado, creado_por, fecha_creado) 
  VALUES('${nombre}', '${tabla}', ${activo}, false, '${creado_por}', '${fecha.format('YYYY-MM-DD')}')`
    await pool.query(sql_insert)} catch (error) {
    console.error(error)}
  res.send({ msg: tabla })
}


async function annadirPreguntaConRespuesta(req, res) {
  let cuestionario = req.body.tabla
  let pregunta = req.body.pregunta
  let respuesta = req.body.respuesta
  let orden = req.body.orden
  let sql = `SELECT tabla from negocio.registro_cuestionario WHERE tabla ='${cuestionario}'`
  try {
    let r = await pool.query(sql)
    if (r.rows.length > 0) {
      let sql_insert = `INSERT INTO cuestionarios.${cuestionario}(
        pregunta, respuesta, orden)
        VALUES (${pregunta}, ${respuesta},${orden});
        `
      await pool.query(sql_insert)
      res.status(201).json({ msg: 'insertado correctamente' })
    }
  } catch (error) {

  }
}

function obtener(req, res) {

  let text = "SELECT * FROM negocio.registro_cuestionario "
  pool
    .query(text)
    .then(r => {
      res.json(r.rows)
    }).catch(err => {
      console.log(err)
    })
}

function obtenerPorId(req, res) {
  id = req.params.id
  let text = `SELECT * FROM negocio.registro_cuestionario WHERE id=${id}`
  pool
    .query(text)
    .then(r => {
      res.json(r.rows[0])
    }).catch(err => {
      console.error(err)
    })
}

function eliminar(req, res) {
  id = req.params.id
  let text = `DELETE  FROM negocio.registro_cuestionario WHERE nombre=${id}`
  let values = [req.body.nombre]
  pool
    .query(text, values)
    .then(r => {
      console.log(r.rows[0])
    })
  res.send({ msg: 'eliminado' })
}

function modificar(req, res) {
  id = req.params.id
  let nombre = req.body.nombre
  let activo = req.body.activo
  let bloqueado = req.body.bloqueado

  let sql = `UPDATE negocio.registro_cuestionario 
              SET nombre='${nombre}',activo=${activo},bloqueado=${bloqueado} 
              WHERE id=${id}`
  pool
    .query(sql)
    .then(r => {
      console.log(r.rows[0])
    })
  res.send({ msg: 'modificado' })

}



//esto permite q estos metodos se puedan usar en otros lugares(los 'importa')
module.exports = {
  crear,
  annadirPreguntaConRespuesta,
  obtener,
  obtenerPorId,
  eliminar,
  modificar,

}
