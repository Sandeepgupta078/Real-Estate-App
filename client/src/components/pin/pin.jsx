import React from 'react'
import './pin.scss'
import { Marker, Popup } from 'react-leaflet'
import { Link, useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import '../../lib/data'


const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
            <img src={item.img} alt="" />
            <div className="textContainer">
                <Link to={`/${item.id}`} className="title">{item.title}</Link>
                <span>{item.bedRooms} bedRooms</span>
                <b>${item.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Pin