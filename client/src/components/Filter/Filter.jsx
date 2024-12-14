// import React from 'react'
// import './Filter.scss'
// import { useState } from 'react'

// const Filter = ( {onFilterChange} ) => {

//   const [localFilters, setLocalFilters] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLocalFilters((prev) => ({ ...prev, [name]: value }));
// };

// const applyFilters = () => {
//     onFilterChange(localFilters); // Send updated filters to the parent
// };

//   return (
//     <div className='filter'>
//       <h1>Search City for</h1>
//       <div className="top">
//         <div className="item">
//           <label htmlFor="city">City</label>
//           <input 
//           type="text" 
//           id='city' 
//           name='city' 
//           placeholder='City Location'
//           onChange={handleChange} 
//           />
//         </div>
//       </div>

//       <div className="bottom">
//         <div className="item">
//           <label htmlFor="type">Type</label>
//           <select name="type" id="type" onChange={handleChange}>
//             <option value="any">any</option>
//             <option value="Buy">Buy</option>
//             <option value="Rent">Rent</option>
//           </select>
//         </div>
//         <div className="item">
//           <label htmlFor="Property">Property</label>
//           <select name="Property" id="Property" onChange={handleChange}>
//             <option value="any">any</option>
//             <option value="Apartment">Apartment</option>
//             <option value="House">House</option>
//             <option value="Office">Office</option>
//             <option value="Villa">Villa</option>
//             <option value="Land">Land</option>
//           </select>
//         </div>
//         <div className="item">
//           <label htmlFor="minPrice">Min Price</label>
//           <input type="number" id='minPrice' name='minPrice' placeholder='any' min={0} onChange={handleChange}/>
//         </div>
//         <div className="item">
//           <label htmlFor="maxPrice">Max Price</label>
//           <input type="number" id='maxPrice' name='maxPrice' placeholder='any' min={0} onChange={handleChange}/>
//         </div>
//         <div className="item">
//           <label htmlFor="bedroom">Bedroom</label>
//           <input type="text" id='bedroom' name='bedroom' placeholder='any' onChange={handleChange}/>
//         </div>
//         <div>
//           <button onClick={applyFilters}>
//             <img src="/search.png" alt="" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Filter



import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  // Update local state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters by updating query params or calling the parent callback
  const handleFilter = () => {
    setSearchParams(query); // Update URL query params
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city") || "all locations"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={query.type}
          >
            <option value="any">any</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="Property">Property</label>
          <select
            name="Property"
            id="Property"
            onChange={handleChange}
            value={query.property}
          >
            <option value="any">any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Office">Office</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            value={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
