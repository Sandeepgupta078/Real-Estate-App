import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



import { Layout, RequireAuth } from './routes/layout/layout'
import HomePage from './routes/homepage/homepage'
import ListPage from './routes/listPage/listPage'
import SinglePage from './routes/singlePage/singlePage'
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/Login/Login";
import ProfileUpdatePage from "./routes/profileUpdataPage/profileUpdate";
import NewPostPage from "./routes/newPostPage/newPostPage";

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
        },
        {
          path: "/:id",
          element: <SinglePage />,
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
  ]
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App