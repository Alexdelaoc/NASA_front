// React
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import NeasList from "./NeasList/NeasList";

// Material UI
import {Typography } from "@mui/material";

// .env
const url = process.env.REACT_APP_API;

const Neas = () => {

  const [query, setQuery] = useState("neas");
  const { loading, result } = useFetch(url + query); // Gets data from the API
  
  return(
    <section className="neas">
      <Typography variant="h5">Near Earth Objects</Typography>
      <NeasList data={result}/>
    </section>
  )
};

export default Neas;
