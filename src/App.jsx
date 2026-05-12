import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './comp/firebaseConfig/firebaseConfig';
import { CardSensor } from './comp/cardSensor/CardSensor.jsx';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Header } from './comp/header/Header.jsx';
import { Footer } from './comp/footer/Footer.jsx';

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
    <>
      <Header/>
      <div className='container-monitor'>
        {
          sensoresDisponibles ? (
            sensoresDisponibles.map((sensor) => (
              <CardSensor key={sensor.id} idSensor={sensor.idDispositivo} />
            ))
          ) : (
            <p className='texto'>No hay datos disponibles.</p>
          )
        }
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default App;