// React
import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import * as L from 'leaflet';

// React Paginator
import Paginator from "react-hooks-paginator";

// .env
const landingsUrl = process.env.REACT_APP_LANDINGS_API;


const Landings = () => {

  // HTTP request to the API
  const {loading, result} = useFetch(landingsUrl); // Petición de todos los datos de la API

  // Paginator
  const pageLimit = 20; // Límite de items por página

  const [offset, setOffset] = useState(0);
  const [currentResult, setCurrentResult] = useState([]); // Datos de la API por página en la lista
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentResult(result.slice(offset, offset + pageLimit));
  }, [offset, result]);

  // React Leaflet
  const LeafletIcon = L.Icon.extend({
    options: {}
  });

  const meteorIcon = new LeafletIcon({
    iconUrl: require('../../../assets/meteor.png'),
    iconSize: [14, 14]
  });

  const paintMarkers = () => {
    return currentResult.map(
      (item, i) => (
        item.reclat
        ? <Marker 
        icon={meteorIcon}
        position={[parseInt(item.reclat), parseInt(item.reclong)]} 
        key={i}>
        <Popup>{item.name}</Popup>
      </Marker>
        : []
      )
    )
  }
  
  const paintLandings = () => {
    return currentResult.map(
      (landing, i) => (
        <div key={i}>
          <p>Name: {landing.name}</p>
          <p>Class: {landing.recclass}</p>
        </div>
        
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
          id="mapbox/satellite-v9"
        />
        { loading
        ? <Marker position={[51.505, -0.09]}>
        </Marker>
        : paintMarkers() }
      </MapContainer>

      <section className="landings__list">
        {paintLandings()}
      </section>
      <Paginator
          totalRecords={result.length}
          pageLimit={pageLimit}
          pageNeighbours={4}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </div>
  ) 
};

export default Landings;
