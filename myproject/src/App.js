import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AppLayout from "./layout/AppLayout";
import Dashboard from './pages/Dashboard';
<<<<<<< HEAD
import UserLayout from "./layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { serverEndpoint } from "./config/config";
import { SET_USER } from "./redux/user/actions";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import ManageUsers from "./pages/users/ManageUsers";
import ProtectedRoute from "./rbac/ProtectedRoute";
import UnauthorizedAccess from "./components/UnauthorizedAccess";
=======

import { useDispatch, useSelector} from "react-redux";
import { serverEndpoint } from "./config";
import {SET_USER}from "./redux/user/actions";
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67

function App() {
  //trcaking uder deatils in app because app is the component which decides
  //where to navigate based on the current route and it needs to know whether the user is logged in or not
  // const [userDetails, setUserDetails] = useState(null);
<<<<<<< HEAD
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
=======
  const userDetails=useSelector((state)=>state.userDetails);
  const dispatch=useDispatch();
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
  //this funxtion takes new value of userdetails and update it using setudersdetails function
  // const updateUserDetails = (updatedData) => {
  //   // setUserDetails(updatedData);
  //   dispatch({
  //     type:'SET_USER',
  //     payload: updatedData
  //   });
  // };
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(`${serverEndpoint}/auth/is-User-Logged-In`, {}, {
        withCredentials: true //to send cookies with the request
      });
      dispatch({
        type: SET_USER,
        payload: response.data.userDetails
      });
    } catch (error) {
      console.log('User is not logged in', error);
    }
    finally {
      setLoading(false);
=======
  const isUserLoggedIn=async()=>{
    try{
      const response=await axios.post(`${serverEndpoint}/auth/is-User-Logged-In`,{},{
        withCredentials: true //to send cookies with the request
      });
      dispatch({
      type:SET_USER,
      payload: response.data.userDetails
    });
    }catch(error){
      console.log('User is not logged in',error);
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
    }
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  if (loading) {
    return <Spinner />;

  }

  return (
    <Routes>
      <Route path="/" element={userDetails ? <UserLayout><Navigate to='/dashboard' /></UserLayout> : <AppLayout><Home /></AppLayout>} />
      {/*we are passing the updateUserDetails function to login beacause thats where we will get user information are authentication*/}
<<<<<<< HEAD
      <Route path="/register" element={userDetails ? <Navigate to='/dashboard' /> : <AppLayout><Register /></AppLayout>} />

      <Route path="/login" element={userDetails ? <Navigate to="/dashboard" /> : <AppLayout><Login /></AppLayout>} />
      <Route path="/dashboard" element={userDetails ? <UserLayout><Dashboard /></UserLayout> : <Navigate to="/login" />} />
      <Route path="/users" element={userDetails ? <ProtectedRoute roles={['admin']}><UserLayout><ManageUsers /></UserLayout></ProtectedRoute> : <Navigate to='/login' />} />
      <Route path="/unauthorized-access" element={userDetails ? <UserLayout><UnauthorizedAccess /></UserLayout> : <Navigate to="/login" />} />
      <Route path="/logout" element={userDetails ? <Logout /> : <Navigate to="/login" />} />
      <Route path="/error" element={userDetails ?<UserLayout> < Error /> </UserLayout > : <AppLayout><Error /></AppLayout>} />
    </Routes >
=======
      <Route path="/login" element={userDetails ? <Navigate to="/dashboard" /> : <AppLayout><Login  /></AppLayout>} />
      <Route path="/dashboard" element={userDetails ? <Dashboard /> : <Navigate to="/login" />} />
    <Route path="/logout" element={userDetails ? <Logout />:<Navigate to="/login" />} />
    <Route path="/error" element={userDetails ? <Error/>:<AppLayout><Error /></AppLayout>} />
    </Routes>
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
  );
}

export default App;
