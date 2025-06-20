import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ updateUserDetails }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.username.length === 0) {
            isValid = false;
            newErrors.username = "Username is required";
        }
        if (formData.password.length === 0) {
            isValid = false;
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (formData.username === "admin" && formData.password === "1234") {
        //     //user is authenticated Naviagte to his or her dashboard;
        //     navigate('/dashboard');
        //     updateUserDetails({
        //         name: 'shekhar',
        //         email: 'shekhar@example.com'
        //     });

        // }
        // else {
        //     setMessage("Invalid username or password");
        // }
        if (validate()) {
            const body = {
                
                username: formData.username,
                password: formData.password
            };
            const configuration = {
                withCredentials: true
            };
            try{
            const response = await axios.post('http://Localhost:5000/auth/login', body, configuration);
            console.log(response);
        }
        catch (error) {
         
            setMessage("Invalid username or password");
        }

    }
    };
    return (
        <div className="container text-center">
            <h1>Login Page</h1>
            <p>Please enter your credentials to log in.</p>
            {message && (message)}
            {errors.message && (errors.message)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
                    {errors.username && (errors.username)}
                </div>
                <div>
                    <label>Password </label>
                    <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    {errors.password && (errors.password)}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );

};
export default Login;





