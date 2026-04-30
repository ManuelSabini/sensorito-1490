import React from 'react';
import { Card } from 'antd';
import { FORMAT_RGB } from 'antd/es/color-picker/interface';
import { TagIdSensor } from '../tagIdSensor/TagIdSensor';
import { Mapa } from '../mapa/Mapa';
import './cardSensor.css';
import UltimaActualizacion from '../ultimaActualizacion/UltimaActualizacion';

export const CardSensor = ({ ultimoDato }) => {
    return (
        <Card size='small' 
        title={
            <>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', // Separa el título del tag
                    gap: '10px' // Espacio entre el texto y el tag
                }}>
                    <h2 style={{ 
                        color: '#64FFDA', 
                        margin: 0, // IMPORTANTE: quitar el margen por defecto del h2
                        fontSize: '1.2rem' // Ajustamos el tamaño para que no rompa el diseño
                    }}>
                        Ubicación: 
                    </h2>
                    <TagIdSensor>{ultimoDato.idDispositivo}</TagIdSensor>
                </div>
                    <h3 style={{ 
                        color: '#64FFDA', 
                        margin: 0, // IMPORTANTE: quitar el margen por defecto del h2
                        fontSize: '1.0  rem' // Ajustamos el tamaño para que no rompa el diseño
                    }}>
                        {ultimoDato.dispositivo}
                    </h3>
                    </>    
                }
            variant="outlined" style={{
                border: '2px solid #4B7B7B',
                padding: '15px',
                borderRadius: '8px',
                maxWidth: '450px',
                width: '95%',
                backgroundColor: '#16211F',
                color: '#E0F2F1'
            }}>
            <p><strong>Temperatura:</strong> {ultimoDato.temperatura} °C</p>
            <p><strong>Humedad:</strong> {ultimoDato.humedad} %</p>
            <UltimaActualizacion ultimoDatoActualizacion = {ultimoDato.timestamp}/>
            {ultimoDato.posicion ? (<Mapa posicion={ultimoDato}/>) : (<p>Ubicación no disponible</p>)}
        </Card>
    )
}

export default CardSensor