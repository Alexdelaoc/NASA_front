import React from "react";
import Welcome from "./Welcome/Welcome";
import Landings from "./Landings/Landings";
import { Route, Routes } from "react-router-dom";

function Main() {
  return (
    <main>
      <Routes>
        <Route element={<Welcome />} path="/"/>
        <Route element={<Landings />} path="/landings"/>
        <Route/>
      </Routes>
    </main>

  )
}

export default Main