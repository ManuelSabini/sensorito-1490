import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ¡Crucial!

export const Mapa = ({posicion}) => {
  // Coordenadas iniciales (Latitud, Longitud)
  const position = [posicion.posicion.latitude,posicion.posicion.longitude];
  return (
    <div style={{ height: '250px', width: '100%' }}>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Usamos los tiles gratuitos de OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {posicion.dispositivo}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;