import React from "react";
import { Link } from "react-router-dom";
import Image from "../imgs/pencil-tip.png"

export default function Navbar() {
  return (
    <nav className="navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src={Image} alt=""  width="50" height="50" className=""/>
          <span className="fs-2 mx-3">Todo App</span>
        </Link>
      </div>
    </nav>
  );
}
