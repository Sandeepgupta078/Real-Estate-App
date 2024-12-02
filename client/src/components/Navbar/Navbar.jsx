import React from 'react'
import './Navbar.scss'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  const [open, setopen] = useState(false);

  return (
    <nav>
      <div className='left'>
        <a href='/' className='logo'>
          <img src="/real-estate.png" alt="logo" />
          <span>Gupta RealEstate</span>
        </a>
        <a href="/home">Home</a>
        <a href="/">About</a>
        <a href="/Contact">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className='user'>
            <img
              src={currentUser.avatar || "/no-avatar.jpg"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className='profile'>
            <div className="notifications">5</div>
            <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className='login'>Login</a>
            <a href="/register" className='register'>Sign Up</a>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png"
            alt=""
            onClick={() => setopen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/home">Home</a>
          <a href="/">About</a>
          <a href="/Contact">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Login</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar