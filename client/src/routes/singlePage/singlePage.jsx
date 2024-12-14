import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate,useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  console.log(post);
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
  //   // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
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
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


// import React from 'react'
// import './singlePage.scss'
// import Slider from '../../components/slider/Slider'
// import Map from '../../components/map/Map'
// import DOMPurify from 'dompurify'
// import { useParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import apiRequest from '../../lib/apiRequest'

// // Fetch post by ID
// const fetchPostById = async ({ queryKey }) => {
//   const id = queryKey[1]; // Extract the ID from queryKey
//   const response = await apiRequest.get(`/posts/${id}`);
//   return response.data;
// };

// const SinglePage = () => {
  
//   const { id } = useParams(); // Get post ID from URL

//   const { data: post, isLoading, isError, error } = useQuery({
//     queryKey: ['post', id], // Unique key with post ID
//     queryFn: fetchPostById, // Fetching function
//     staleTime: 5000, // Cache data for 5 seconds
//   });

//   // Debugging
//   console.log({ post, isError, error });

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (isError) {
//     return (
//       <div>
//         <h2>Error Loading Post</h2>
//         <p>{error.message || 'Something went wrong.'}</p>
//       </div>
//     );
//   }

//   // Ensure `post` is valid
//   if (!post) {
//     return <div>No post data available.</div>;
//   }


//   return (
//     <div className="singlePage">
//       <div className="details">
//         <div className="wrapper">
//           <Slider images={post.images} />
//           <div className="info">
//             <div className="top">
//               <div className="post">
//                 <h1>{post.title}</h1>
//                 <div className="address">
//                   <img src="/pin.png" alt="" />
//                   <span>{post.address}</span>
//                 </div>
//                 <div className="price">
//                   ${post.price}
//                 </div>
//               </div>
//               <div className="user">
//                 <img src={post.user.avatar} alt="" />
//                 <span>{post.user.username}</span>
//               </div>
//             </div>
//             <div className="bottom" 
//             dangerouslySetInnerHTML={{
//               __html: DOMPurify.sanitize(post.postDetail.desc)
//             }}></div>
//           </div>
//         </div>
//       </div>
//       <div className="features">
//         <div className="wrapper">
//           <p className="title">General</p>
//           <div className="listVertical">
//             <div className="feature">
//               <img src="/utility.png" alt="" />
//               <div className="featureText">
//                 <span>Utility</span>
//                 {
//                   post.postDetail.utilities === 'owner' ? (
//                     <p>Owner is Responsible</p>
//                   ) : (
//                     <p>Tenant is Responsible</p>
//                   )
//                 }
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>Pet Policy</span>
//                 {
//                   post.postDetail.pet === 'allowed' ? (
//                     <p>Pets are allowed</p>
//                   ) : (
//                     <p>Pets are not allowed</p>
//                   )
//                 }
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Property Fees</span>
//                 <p>{post.postDetail.income}</p>
//               </div>
//             </div>
//           </div>

//           <p className="title">Room Sizes</p>
//           <div className="sizes">
//             <div className="size">
//               <img src="/size.png" alt="" />
//               <span>{post.postDetail.size} sqft</span>
//             </div>
//             <div className="size">
//               <img src="/bed.png" alt="" />
//               <span>{post.bedroom} bedrooms</span>
//             </div>
//             <div className="size">
//               <img src="/bath.png" alt="" />
//               <span>{post.bathroom} bathrooms</span>
//             </div>
//           </div>

//           <p className="title">Nearby Location</p>
//           <div className="listHorizontal">

//             <div className="feature">
//               <img src="/school.png" alt="" />
//               <div className="featureText">
//                 <span>School</span>
//                 <p>{post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/restaurant.png" alt="" />
//               <div className="featureText">
//                 <span>Restaurant</span>
//                 <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant / 1000 + "km" : post.postDetail.restaurant + "m"} away</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/bus.png" alt="" />
//               <div className="featureText">
//                 <span>Bus Stop</span>
//                 <p>{post.postDetail.bus > 999 ? post.postDetail.bus / 1000 + "km" : post.postDetail.bus + "m"} away</p>
//               </div>
//             </div>

//           </div>
//           <p className="title">Location</p>
//           <div className="mapContainer">
//             <Map items={[post]} />
//           </div>
//           <div className="buttons">
//             <button>
//               <img src="/chat.png" alt="" />
//               Send a message
//             </button>
//             <button>
//               <img src="/save.png" alt="" />
//               Save the Places
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SinglePage
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
