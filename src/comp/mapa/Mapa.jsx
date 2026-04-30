import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ¡Crucial!

import L from 'leaflet';

// Importamos las imágenes directamente para que Vite las procese
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Borramos la configuración interna que causa el 404
delete L.Icon.Default.prototype._getIconUrl;

// Aplicamos nuestra nueva configuración
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

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