// React
import React from "react";
import { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";

const LandingsList = (props) => {

  // Paginator
  const pageLimit = 10; // Límite de items por página

  const [offset, setOffset] = useState(0);
  const [currentResult, setCurrentResult] = useState([]); // Items de la API por página en la lista
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentResult(props.data.slice(offset, offset + pageLimit));
  }, [offset, props.data]); // Slices the total array in segments (pages)

  useEffect(() => {
    props.setChildResult(currentResult)
  }) // Listens to every change in the app, so it updates the state.

  // Function for painting the cards in the list
  const paintLandings = () => {
    return currentResult.map(
      (landing, i) => (
        <div key={i}>
          <p>Name: {landing.name}</p>
          <p>Date: {landing.year}</p>
          <p>Mass: {landing.mass}</p>
        </div>
      )
    )
  };

  return (
    <div>
      <article className="landings__list">
        {paintLandings()}
      </article>

      <Paginator
        totalRecords={props.data.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
};

export default LandingsList;
