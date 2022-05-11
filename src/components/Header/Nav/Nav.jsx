import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav__element">Home</Link>
      <Link to="/landings" className="nav__element">Landings</Link>
      <Link to="/neas" className="nav__element">Near Earth Objects</Link>
    </nav>
  )
}

export default Nav