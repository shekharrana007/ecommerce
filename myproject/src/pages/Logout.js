import {  useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import updateUserDetails from the appropriate path if needed
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { serverEndpoint } from "../config/config"; 
=======
import { serverEndpoint } from "../config"; 
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
import{CLEAR_USER} from "../redux/user/actions";
function Logout() {
        const dispatch = useDispatch();
        
    const navigate = useNavigate();
        const handleLogout = async () => {
            try {
                await
                 axios.post(`${serverEndpoint}/auth/logout`, {}, {
                    withCredentials: true // to send cookies with the request
                });
                dispatch({
                    type: CLEAR_USER,
                });
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