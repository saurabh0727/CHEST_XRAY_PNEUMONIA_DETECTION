import React from 'react'
import Logo from './images/logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const emailAddress = 'saurabhbasediya3@gmail.com';
  return (
    <div className="main-navbar-div">
      <div className="navbar-left-div">
        <img src={Logo} alt="logo" />
      </div>

      <div className='navbar-right-div'>
        <ul>
          <li>About us</li>
          <li><a href={`mailto:${emailAddress}`} style={{color:'inherit',textDecoration:'none'}}>Contact Us</a>
          </li>
          <li><Link to={'https://github.com/saurabh0727/CHEST_XRAY_PNEUMONIA_DETECTION'} target='_blank' style={{color:'inherit',textDecoration:'none'}}>Github Access</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar