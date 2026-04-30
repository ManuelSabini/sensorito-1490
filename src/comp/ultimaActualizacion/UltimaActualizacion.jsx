import React from 'react'
import './ultimaActualizacion.css'

export const UltimaActualizacion = ({ ultimoDatoActualizacion }) => {
    const ahora = Math.floor(Date.now() / 1000)
    const diferencia = ahora - ultimoDatoActualizacion.seconds;
    if (diferencia < 3600) {
        return (<p><strong>Última actualización: </strong><strong className='verde'> {ultimoDatoActualizacion?.toDate().toLocaleString()}</strong></p>);
    } else if (diferencia < 14400) {
        return (<p><strong>Última actualización: </strong><strong className='amarillo'>{ultimoDatoActualizacion?.toDate().toLocaleString()}</strong></p>);
    } else {
        return (<p><strong>Última actualización: </strong><strong className='rojo' >{ultimoDatoActualizacion?.toDate().toLocaleString()}</strong></p>);
    }
}

export default UltimaActualizacion