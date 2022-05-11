// React
import React from "react";
import useFetch from "../../../hooks/useFetch";

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

// .env
const landingsUrl = process.env.REACT_APP_LANDINGS_API;



const Landings = () => {

  const {loading, result} = useFetch(landingsUrl)
  
  const paintLandings = () => {
    return result.map(
      (landing, i) => (
        <div key={i}>
          <p>Name: {landing.name}</p>
          <p>Class: {landing.recclass}</p>
        </div>
        
      )
    )
  }

  const paintMarkers = () => {
    return result.map(
      (item, i) => (
        item.reclat
        ? <Marker position={[parseInt(item.reclat), parseInt(item.reclong)]} key={i}>
        <Popup>{item.name}</Popup>
      </Marker>
        : []
      )
    )
  }

  return(
    <div className="landings">
      <h1>Landings</h1>
      <MapContainer 
      id="map" 
      center={[51.505, -0.09]} 
      zoom={3} 
      scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { loading
        ? <Marker position={[51.505, -0.09]}>
        </Marker>
        : paintMarkers() }
          
      </MapContainer>
      <div className="landings__list">{paintLandings()}</div>
    </div>
  ) 
};

export default Landings;
