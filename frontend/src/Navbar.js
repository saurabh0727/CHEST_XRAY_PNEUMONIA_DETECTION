import React from 'react'
import Logo from './images/logo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="main-navbar-div">
        <div className="navbar-left-div">
            <img src={Logo} alt="logo"/>
        </div>

        <div className='navbar-right-div'>
            <ul>
                <li>About us</li>
                <li>Contact us</li>
                <li>Github Access</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar