const { response } = require('express');
const bcrypt = require('bcryptjs'); //for hashing passwords
const express = require('express'); //for creating express application
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const secret = 'a401d85c-58c1-46fd-b063-150790d3f36c'; //secret key for signing JWT
const authController = {
    login: async (request, response) => {
        try {
            const { username, password } = request.body;
            const data = await Users.findOne({ email: username });
            if (!data) {
                return response.status(401).json({ message: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, data.password);
            if (!isMatch) {
                return response.status(401).json({ message: "Invalid credentials" });
            }
            // if (username === 'admin' && password === '1234') {
            //     const userDetails = {
            //         name: 'shekhar',
            //         email: 'shekhar@example.com'
            //     };
            const userDetails = {
                id: data._id,
                name: data.name,
                email: data.email
            };
            //create JWT token with user details and secret key
            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });

            response.cookie('jwttoken', token, {
                httpOnly: true, //to prevent client side script from accessing the cookie
                secure: true, //to ensure the cookie is sent over HTTPS only
                domain: 'localhost', //set the domain to your server's domain
                path: '/', //set the path to the root of your application
            });
            response.json({ message: "User authenticated", userDetails: userDetails });
        }
       
    
        catch(error) {
        console.log(error);
        // Handle any errors that occur during the login process
        response.status(500).json({ error: 'Internal server error' });
    }
},
    logout: (request, response) => {
        response.clearCookie('jwttoken');
response.json({ message: 'User logged out successfully' });
    },
isUserLoggedIn: (request, response) => {
    const token = request.cookies.jwttoken;
    if (!token) {
        return response.status(401).json({ message: 'Unauthorized access' });
    }
    jwt.verify(token, secret, (error, userDetails) => {
        if (error) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }
        else {
            return response.json({ userDetails: userDetails });
        }
    });
},
 

};
module.exports = authController;