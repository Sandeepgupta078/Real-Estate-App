import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout, RequireAuth } from './routes/layout/layout';
import HomePage from './routes/homepage/homepage';
import ListPage from './routes/listPage/listPage';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/Login/Login";
import ProfileUpdatePage from "./routes/profileUpdataPage/profileUpdate";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Create a QueryClient instance
// const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader, 
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader, 
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader:profilePageLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/profile/add",
          element: <NewPostPage />,
        },
      ]
    }
  ]);

  return (
    // <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    // </QueryClientProvider>
  );
}

export default App;
