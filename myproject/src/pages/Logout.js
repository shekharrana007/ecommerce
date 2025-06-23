import {  useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import updateUserDetails from the appropriate path if needed

function Logout({ updateUserDetails }) {
    const navigate = useNavigate();
        const handleLogout = async () => {
            try {
                await
                 axios.post('http://localhost:5000/auth/logout', {}, {
                    withCredentials: true // to send cookies with the request
                });
                updateUserDetails(null); // Clear user details on logout
            } catch (error) {
                console.log( error);
                navigate('/error');
            }
        };
      useEffect(() => {
            handleLogout();
    }, []);
    return null;
}
export default Logout;