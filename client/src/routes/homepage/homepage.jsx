import React from 'react'
import { useContext } from 'react'
import './homepage.scss'
import '../../components/searchBar/Searchbar'
import Searchbar from '../../components/searchBar/Searchbar'
import { AuthContext } from '../../context/AuthContext'


const homepage = () => {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  return (
    <div className='homepage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>
            Unlock Your Dream Home Today !<br />
            Find Your Perfect Space—Where Life Begins
          </h1>
          <p>
            Search for your dream home in your city or desired location.
            Find the perfect home that suits your lifestyle and budget.
          </p>
          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>15+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>1000+</h1>
              <h2>Happy Customers</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png " alt="" />
      </div>
    </div>
  )
}

export default homepage