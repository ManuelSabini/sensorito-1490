import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './comp/firebaseConfig/firebaseConfig';
import { CardSensor } from './comp/cardSensor/CardSensor.jsx';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

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
    console.log(q.data);

    // Usamos onSnapshot para que la web se actualice sola 
    // cada vez que el ESP32 mande un dato nuevo (tiempo real)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (data.length > 0) {
        setUltimoDato(data[0]);
        console.log(data[0]);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  if (loading) return <p>Cargando datos del sensor...</p>;

  return (
    <div className='conteiner-monitor'>
      <h1 style={{fontFamily: 'sans-serif',
    color: '#E0F2F1'}}>Monitoreo de Temperatura</h1>
    {
      ultimoDato ? (
      <CardSensor ultimoDato={ultimoDato} />
    ): (
          <p>No hay datos disponibles.</p>
    )
}
</div>
  );
}

export default App;