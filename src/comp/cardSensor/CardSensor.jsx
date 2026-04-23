import React from 'react';
import { Card } from 'antd';
import { FORMAT_RGB } from 'antd/es/color-picker/interface';

export const CardSensor = ({ ultimoDato }) => {
    return (
        <Card title={
            <span style={{ color: '#64FFDA' }}>
                Ubicación: {ultimoDato.dispositivo}
            </span>
        } variant="outlined" style={{
            border: '2px solid #4B7B7B',
            padding: '15px',
            borderRadius: '8px',
            width: '400px',
            backgroundColor: '#16211F',
            color: '#E0F2F1'
        }}>
            <p><strong>Temperatura:</strong> {ultimoDato.temperatura} °C</p>
            <p><strong>Humedad:</strong> {ultimoDato.humedad} %</p>
            <p><strong>Última actualización:</strong> {ultimoDato.timestamp?.toDate().toLocaleString()}</p>
        </Card>
    )
}

export default CardSensor