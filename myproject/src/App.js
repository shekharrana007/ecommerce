import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AppLayout from "./layout/AppLayout";
import Dashboard from './pages/Dashboard';
import { useState } from "react";

function App() {
  //trcaking uder deatils in app because app is the component which decides
  //where to navigate based on the current route and it needs to know whether the user is logged in or not
  const [userDetails, setUserDetails] = useState(null);
  //this funxtion takes new value of userdetails and update it using setudersdetails function
  const updateUserDetails = (updatedData) => {
    setUserDetails(updatedData);
  };
  const isUserLoggedIn=async()=>{
    try{
      const response=await axios.post('http://localhost:5000/auth/is-User-Logged-In',{},{
        withCredentials: true //to send cookies with the request
      });
      updateUserDetails(response.data.userDetails);
    }catch(error){
      console.log('User is not logged in',error);
    }
  };
  useEffect(()=>{
    isUserLoggedIn();
  },[]);

  return (
    <Routes>
      <Route path="/" element={userDetails ? <Navigate to="/dashboard" /> : <AppLayout><Home /></AppLayout>} />
      {/*we are passing the updateUserDetails function to login beacause thats where we will get user information are authentication*/}
      <Route path="/login" element={userDetails ? <Navigate to="/dashboard" /> : <AppLayout><Login updateUserDetails={updateUserDetails} /></AppLayout>} />
      <Route path="/dashboard" element={userDetails ? <Dashboard /> : <Navigate to="/login" />} />
    <Route path="/logout" element={userDetails ? <Logout updateUserDetails={updateUserDetails}/>:<Navigate to="/login" />} />
    <Route path="/error" element={userDetails ? <Error/>:<AppLayout><Error /></AppLayout>} />
    </Routes>
  );
}

export default App;
