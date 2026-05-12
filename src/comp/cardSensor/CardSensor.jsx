import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { FORMAT_RGB } from 'antd/es/color-picker/interface';
import { TagIdSensor } from '../tagIdSensor/TagIdSensor';
import { Mapa } from '../mapa/Mapa';
import { db } from '../firebaseConfig/firebaseConfig';
import { collection, query, orderBy, limit, where, onSnapshot } from 'firebase/firestore';
/* import { Cargando } from '../cargando/Cargando.jsx' */
import './cardSensor.css';
import UltimaActualizacion from '../ultimaActualizacion/UltimaActualizacion';

export const CardSensor = ({ idSensor }) => {
    const [ultimoRegistro, setUltimoRegistro] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(idSensor)
    useEffect(() => {
        // Referencia a la colección
        const q = query(
            collection(db, "registrosSensorTemp"),
            where("idDispositivo", "==", idSensor),
            orderBy("timestamp", "desc"),
            limit(1)
        );
        console.log(q.data);
        // Usamos onSnapshot para que la web se actualice sola 
        // cada vez que el ESP32 mande un dato nuevo (tiempo real)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (data.length > 0) {
                setUltimoRegistro(data[0]);
                console.log(data[0]);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Limpieza al desmontar el componente
    }, []);
    return (
        (ultimoRegistro ? (
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
                            <TagIdSensor>{ultimoRegistro.idDispositivo}</TagIdSensor>
                        </div>
                        <h3 style={{
                            color: '#64FFDA',
                            margin: 0, // IMPORTANTE: quitar el margen por defecto del h2
                            fontSize: '1.0  rem' // Ajustamos el tamaño para que no rompa el diseño
                        }}>
                            {ultimoRegistro.dispositivo}
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
                <p><strong>Temperatura:</strong> {ultimoRegistro.temperatura} °C</p>
                <p><strong>Humedad:</strong> {ultimoRegistro.humedad} %</p>
                <UltimaActualizacion ultimoDatoActualizacion={ultimoRegistro.timestamp} />
                {ultimoRegistro.posicion ? (<Mapa posicion={ultimoRegistro} />) : (<p>Ubicación no disponible</p>)}
            </Card>
        ) : (
            <p className='texto'>Cargando...</p>
        )
    ))
}

export default CardSensor