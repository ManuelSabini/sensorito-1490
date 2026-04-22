import React, { useEffect, useState } from 'react';
import { db } from './comp/firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

function App() {
  const [ultimoDato, setUltimoDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referencia a la colección
    const q = query(
      collection(db, "registrosSensorTemp"), 
      orderBy("timestamp", "desc"), 
      limit(1)
    );

    // Usamos onSnapshot para que la web se actualice sola 
    // cada vez que el ESP32 mande un dato nuevo (tiempo real)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (data.length > 0) {
        setUltimoDato(data[0]);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  if (loading) return <p>Cargando datos del sensor...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Monitoreo de Temperatura</h1>
      {ultimoDato ? (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Ubicación: {ultimoDato.dispositivo}</h3>
          <p><strong>Temperatura:</strong> {ultimoDato.temperatura} °C</p>
          <p><strong>Humedad:</strong> {ultimoDato.humedad} %</p>
          <p><strong>Última actualización:</strong> {ultimoDato.timestamp?.toDate().toLocaleString()}</p>
        </div>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
}

export default App;