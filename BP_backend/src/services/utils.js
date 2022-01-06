
import moment from 'moment'

export function generateSQLArrayDate(fechas){
    let resp = `array[`
    let longitud = fechas.length
    fechas.forEach((fecha, pos) => {
        resp += ` date('${fecha}')`
        resp += (pos == longitud-1)?'':',' 
    });
    resp += `]`
    return resp
}

export function dateIsMerge(juego_fecha1, juego_fecha2){
    
    let flag = false
    // formatear fechas para poder comparar
    juego_fecha1.fecha_inicio=moment(juego_fecha1.fecha_inicio)
    juego_fecha1.fecha_fin=moment(juego_fecha1.fecha_fin)
    juego_fecha2.fecha_inicio=moment(juego_fecha2.fecha_inicio)
    juego_fecha2.fecha_fin=moment(juego_fecha2.fecha_fin)
    // comparaciones
    flag = (juego_fecha2.fecha_inicio >= juego_fecha1.fecha_inicio && juego_fecha2.fecha_inicio <= juego_fecha1.fecha_fin) ? true : flag
    flag = (juego_fecha2.fecha_fin >= juego_fecha1.fecha_inicio && juego_fecha2.fecha_fin <= juego_fecha1.fecha_fin) ? true : flag
    flag = (juego_fecha2.fecha_inicio <= juego_fecha1.fecha_inicio && juego_fecha2.fecha_fin >= juego_fecha1.fecha_fin) ? true : flag
    return flag
}

export function dateIsUsed(fechas, fechasDB){
    let flag=false
    fechasDB.forEach(fecha => {
        flag = fechas.includes(moment(fecha).format('YYYY-MM-DD')) ? true : flag
    });
    return flag

}

export function someDateIsInRange(fechas, juego_fecha){
    
    let flag=false
    juego_fecha.fecha_inicio=moment(juego_fecha.fecha_inicio)
    juego_fecha.fecha_fin=moment(juego_fecha.fecha_fin)
    fechas.forEach(fecha => {
         flag = (moment(fecha) >= juego_fecha.fecha_inicio && moment(fecha) <= juego_fecha.fecha_fin) ? true : flag
    });
    return flag
}