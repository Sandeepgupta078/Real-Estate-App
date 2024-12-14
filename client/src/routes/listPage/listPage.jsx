// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import './listPage.scss';
// import Filter from '../../components/Filter/Filter';
// import Card from '../../components/card/card';
// import Map from '../../components/map/map';
// import apiRequest from '../../lib/apiRequest';


// const fetchFilteredPosts = async ({ queryKey }) => {
//     const query = queryKey[1];
//     const endpoint = query ? `/posts?${query}` : '/posts';
//     try {
//         console.log(`Fetching posts from: ${endpoint}`);
//         const response = await apiRequest.get(endpoint);
//         console.log('Fetched Posts:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         throw error;
//     }
// }


// const ListPage = () => {
//     const [filters, setFilters] = useState({});
//     const query = new URLSearchParams(filters).toString();  // Convert filters to query string

//     // console.log('Query:', query); // Debug query string
//     // console.log('API Response:', posts); // Debug fetched data

//     // Use React Query to fetch all posts
//     const { data: posts, isLoading, isError, error } = useQuery({
//         queryKey: ['posts', query],
//         queryFn: fetchFilteredPosts,
//         staleTime: 5000,
//     });

//     const handleFilterChange = (newFilters) => {
//         setFilters(newFilters);
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) {
//         console.error('Fetch Error:', error);
//         return (
//             <div>
//                 <h2>Error Loading Posts</h2>
//                 <p>{error.message || 'Something went wrong.'}</p>
//             </div>
//         );
//     }

//     if (!posts || posts.length === 0) return <div>No posts available.</div>;


//     return (
//         <div className="listPage">
//             <div className="listContainer">
//                 <div className="wrapper">
//                     <Filter onFilterChange={handleFilterChange} />
//                     <div className="postList">
//                         {posts.map((post) => (
//                             <Card key={post.id} item={post} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="mapContainer">
//                 <Map items={posts} />
//             </div>
//         </div>
//     );
// };

// export default ListPage;



import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}>
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;