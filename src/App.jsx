import React, { useEffect, useState } from 'react';
import { db } from './comp/firebaseConfig/firebaseConfig';
import { CardSensor } from './comp/cardSensor/CardSensor.jsx';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import './App.css';

function App() {
  const [sensoresDisponibles, setSensoresDisponibles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referencia a la colección
    const q = query(
      collection(db, "sensores"),
/*       limit(1) */
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
        setSensoresDisponibles(data);
        console.log(data);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  if (loading) return <p className='texto'>Cargando datos del sensor...</p>;

  return (
    <div className='conteiner-monitor'>
      <h1 style={{fontFamily: 'sans-serif',
    color: '#E0F2F1'}}>Monitoreo</h1>
    {
      sensoresDisponibles ? (
        sensoresDisponibles.map((sensor) => (
          <CardSensor key={sensor.id} idSensor={sensor.idDispositivo}/>
        ))
        
        
    ): (
          <p className='texto'>No hay datos disponibles.</p>
    )
}
</div>
  );
}

export default App;