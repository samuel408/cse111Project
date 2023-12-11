import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);

  const handleRemoveCookies = () => {
    removeCookie('access_token')
    window.location = "/signin"
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <Link class="navbar-brand" to="/">ValleyStealz</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/cart">Cart</Link>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/shipping">Shipping Info</Link>
          </li> */}
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/profile">Profile</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" onClick={handleRemoveCookies}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar