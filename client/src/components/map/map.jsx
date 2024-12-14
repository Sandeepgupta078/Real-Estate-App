import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Pin from '../pin/pin';

// Helper function to validate coordinates
const isValidCoordinate = (latitude, longitude) => {
  return (
    latitude !== undefined &&
    longitude !== undefined &&
    !isNaN(latitude) &&
    !isNaN(longitude)
  );
};

const FitBounds = ({ items }) => {
  const map = useMap();

  useEffect(() => {
    if (items.length > 0) {
      const validBounds = items
        .filter((item) => isValidCoordinate(item.latitude, item.longitude)) // Filter valid items
        .map((item) => [item.latitude, item.longitude]);

      if (validBounds.length > 0) {
        map.fitBounds(validBounds); // Adjust map view to include all markers
      }
    }
  }, [items, map]);

  return null;
};

const Map = ({ items }) => {
  // Filter only items with valid coordinates
  const validItems = items.filter((item) =>
    isValidCoordinate(item.latitude, item.longitude)
  );

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center
      zoom={5} // Default zoom
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validItems.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
      <FitBounds items={validItems} />
    </MapContainer>
  );
};

export default Map;
