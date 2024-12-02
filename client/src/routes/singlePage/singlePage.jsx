import React from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import { singlePostData, userData } from '../../lib/data'
import Map from '../../components/map/map'

const SinglePage = () => {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">
                  ${singlePostData.price}
                </div>
              </div>
              <div className="user">
                <img src={userData.image} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">
              {singlePostData.description}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utility</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets are allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>must have 3x in the total household income</p>
              </div>
            </div>
          </div>

          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>100 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 Beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Location</p>
          <div className="listHorizontal">
  
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>500m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>200m away</p>
              </div>
            </div>
          
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Places
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage