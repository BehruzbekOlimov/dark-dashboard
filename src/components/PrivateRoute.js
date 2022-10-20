import { Navigate } from 'react-router-dom';
import axiosClient from "../utills/axiosClient";
import {LOCAL_STORAGE_NAME} from "../utills/constants";

export { PrivateRoute };

function PrivateRoute({ children, user, setUser }) {

  if (!user) {

      axiosClient.get("/user/get-me").then( res => {
        setUser(res.data)
      }).catch(() => {
        localStorage.removeItem(LOCAL_STORAGE_NAME)
        return <Navigate to="/sign-in"/>
      })
    // not logged in so redirect to login page with the return url
  }

  // authorized so return child components
  return children;
}
