import moment from "moment";
import pool from './connect'

export async function validate( date = moment() ){
    let respuesta={
        input_need_observation : false,
        output_need_observation : false
    }
    let fecha = date.format('DD-MM-YYYY')
    let dia = date.locale('es').format('dddd')
    let hora = date.format('HH:mm:ss')
console.log(dia)
    let sql_regla=`SELECT * FROM public.regla WHERE dia='${dia}'`
    try {
        let regla = await pool.query(sql_regla)
        if(regla.rows.length > 0){
            let reg=regla.rows[0]
            if(reg.activo){
                if(reg.entrada < hora)  respuesta.input_need_observation = true
                if(reg.salida > hora)  respuesta.output_need_observation = true
            }
        }
        
        return respuesta
    } catch (error) {
        console.error(error)
    }
    

}