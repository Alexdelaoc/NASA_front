import React from "react";
import Welcome from "./Welcome/Welcome";
import { Route, Routes } from "react-router-dom";

function Main() {
  return (
    <main>
      <Routes>
        <Route element={<Welcome />} path="/"/>
        <Route/>
        <Route/>
      </Routes>
    </main>

  )
}

export default Main