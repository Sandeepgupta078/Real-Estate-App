import React from 'react'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import "./map.scss"
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import Pin from '../pin/pin'

const FitBounds = ({ items }) => {
  const map = useMap();

  useEffect(() => {
    if (items.length > 0) {
      const bounds = items.map((item) => [item.latitude, item.longitude]);
      map.fitBounds(bounds); // Adjust map view to include all markers
    }
  }, [items, map]);

  return null;
};

const Map = ({ items }) => {
  return (
    <MapContainer center={[39.5, -98.35]} zoom={5} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map((item) => (
        <Pin key={item.id} item={item} />
    ))}
    <FitBounds items={items} />
  </MapContainer>
  )
}

export default Map