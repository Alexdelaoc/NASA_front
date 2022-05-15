// React
import React, {useState} from "react";
import LandingsList from "./LandingsList/LandingsList";
import useFetch from "../../../hooks/useFetch";

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import * as L from 'leaflet';

// .env
const url = process.env.REACT_APP_LANDINGS_API;

const Landings = () => {

  const [ query, setQuery ] = useState("landings");
  const [ currentResult, setCurrentResult ] = useState([]); // Sets Items from the API per page
  const { loading, result } = useFetch(url + query); // Gets data from the API


  const setChildResult = (data) => {
    setCurrentResult(data) // Passes data from the initial request to the LandingsList child
  };
  
  // Submit handler
  const handleNameSubmit = (e) => {
    e.preventDefault();
    setQuery("landings/name/" + e.target.name.value); // Sets the route of the query to be done.
    setCurrentResult(currentResult) // Updates the currentResult.
  };

  const handleClassSubmit = (e) => {
    e.preventDefault();
    setQuery("landings/class/" + e.target.class.value); // Sets the route of the query to be done.
    setCurrentResult(currentResult) // Updates the currentResult.
  };

  const handleMassSubmit = (e) => {
    e.preventDefault();
    setQuery("landings/mass/" + e.target.mass.value); // Sets the route of the query to be done.
    setCurrentResult(currentResult) // Updates the currentResult.
  };


  // React Leaflet
  const LeafletIcon = L.Icon.extend({
    options: {}
  });

  const meteorIcon = new LeafletIcon({
    iconUrl: require('../../../assets/meteor.png'),
    iconSize: [14, 14]
  });

  // Function for painting a marker in the map for each landing
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
  };

  return(
    <section className="landings">

      <h1>Landings</h1>
      <MapContainer 
      id="map" 
      center={[51.505, -0.09]} 
      zoom={2} 
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

      <h3>Looking for a landing?</h3>
      <form onSubmit={handleNameSubmit}>
        <input type="text" name="name" placeholder="Name of the landing"/> <br />
        <input type="submit" />
      </form>
      <form onSubmit={handleClassSubmit}>
        <input type="text" name="class" placeholder="Class of the landing"/> <br />
        <input type="submit"/>
      </form>
      <form onSubmit={handleMassSubmit}>
        <input type="text" name="mass" placeholder="Mass of the landing"/> <br />
        <input type="submit"/>
      </form>

      <LandingsList data={result} setChildResult={setChildResult}/>

    </section>
  ) 
};

export default Landings;
