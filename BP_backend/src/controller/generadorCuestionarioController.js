import pool from '../services/connect'


function crearCuestionario(req, res) {
    console.log('Here')
    let crear = `
    CREATE TABLE cuestionarios.${req.body.nombreCuestionario}
    (
        pregunta integer NOT NULL,
        respuesta integer NOT NULL,
        orden integer NOT NULL,
        CONSTRAINT ${req.body.nombreCuestionario}_pkey PRIMARY KEY (orden)
    )
    
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE cuestionarios.${req.body.nombreCuestionario}
        OWNER to postgres;

        

CREATE INDEX fki_pregunta_${req.body.nombreCuestionario}
ON cuestionarios.${req.body.nombreCuestionario} USING btree
(pregunta)
TABLESPACE pg_default;



CREATE INDEX fki_respuesta_${req.body.nombreCuestionario}
ON cuestionarios.${req.body.nombreCuestionario} USING btree
(respuesta)
TABLESPACE pg_default;



CREATE TRIGGER verifica
BEFORE INSERT
ON cuestionarios.${req.body.nombreCuestionario}
FOR EACH ROW
EXECUTE PROCEDURE public.verificarespuesta();



CREATE TRIGGER verificacion
BEFORE INSERT
ON cuestionarios.${req.body.nombreCuestionario}
FOR EACH ROW
EXECUTE PROCEDURE public.verificapregunta(); ;`


    //let values = [req.body.nombreCuestionario]
    pool
        .query(crear)
        .then(res => {
            console.log(res.rows[0])
        })

    res.send({ msg: req.body.nombreCuestionario })

}
function insertarPyR(req, res) {

    let text = `INSERT INTO cuestionarios.${req.body.nombreCuestionario} (pregunta,respuesta,orden) VALUES($1,$2,$3) RETURNING *`
    let values = [req.body.pregunta, req.body.respuesta, req.body.orden]
    pool
        .query(text, values)
        .then(r => {
            console.log(r.rows[0])
        })
    res.send({ msg: 'creando' })

}



module.exports = {
    crearCuestionario,
    insertarPyR
}

// module.exports = {
//     crear,
//     obtener,
//     obtenerPorId,
//     eliminar,
//     modificar
//   }