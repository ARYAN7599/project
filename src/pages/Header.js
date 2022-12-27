import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <React.Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" to="/">
            <NavLink className="navbar bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  <img src="https://fufiscan.com/images/header-86e65b17f2f9ee878d311347c527d28f.svg?vsn=d" alt="Logo"
                    style={{ width: "40", height: "80" }} className="d-inline-block align-text-top" />
                </a>
              </div>
            </NavLink>
          </a>
        </div>
      </nav>
    </React.Fragment>
  )
}
