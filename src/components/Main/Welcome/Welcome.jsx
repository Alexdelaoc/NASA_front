import React from "react";
import useFetch from "../../../hooks/useFetch";

const apodUrl = process.env.REACT_APP_APOD_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const url = apodUrl + apiKey;

const Welcome = () => {

  const { loading, result } = useFetch(url);
  const picture = result.hdurl;
  const explanation = result.explanation;

  return (
    <div className="welcome">
      <h2 className="">Welcome to the NASA app</h2>
      <h4 className="">Here's the picture of the day</h4>
      <img src={picture} className="welcome__picture" alt="apod"/>
      <p>{explanation}</p>
    </div>
  );
}

export default Welcome;