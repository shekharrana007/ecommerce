const { response } = require('express');
const bcrypt = require('bcryptjs'); //for hashing passwords
const express = require('express'); //for creating express application
 const{OAuth2Client} = require('google-auth-library'); //for Google OAuth2 authentication

const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const { validationResult } = require('express-validator'); 
const secret = 'a401d85c-58c1-46fd-b063-150790d3f36c'; //secret key for signing JWT
const authController = {
    login: async (request, response) => {
       const errors= validationResult(request);
       if(!errors.isEmpty()){
           return response.status(401).json({ errors: errors.array() });
         }

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
register:async(request,response)=>{
    try{
        const {name,username,password}=request.body;
        const data=await Users.findOne({ email: username });
        if(data){
            return response.status(401).json({ message: 'User already exists' });
        }
        const encryptedPassword=await bcrypt.hash(password, 10);  
        const user=new Users({
            email:username,
            password:encryptedPassword,
            name:name
        });
        await user.save();
        response.status(200).json({ message: 'User registered successfully' });
    }
    catch(error){
        console.log(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
},
googleAuth:async (request, response) => {
    const{idToken}=request.body;
    if(!idToken){
        return response.status(400).json({ message: 'Invalid request' });
    }
    try{
        const googleClient=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const googleResponse=await googleClient.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
        });
    
    const payload = googleResponse.getPayload();
    const {sub: googleId, email, name} = payload;
    // Check if user already exists in the database
    let data=await Users.findOne({ email: email });
    if(!data){
        data=new Users({
            email: email,
            name: name,
            isGoogleUser: true,
            googleId: googleId
        });
        await data.save();
    }
    const user={
        id: data._id ? data._id : googleId, // Use _id if available, otherwise use googleId
        username:email,
        name:name

    };
    const token = jwt.sign(user, secret, { expiresIn: '1h' });
    response.cookie('jwttoken', token, {
        httpOnly: true, //to prevent client side script from accessing the cookie
        secure: true, //to ensure the cookie is sent over HTTPS only
        domain: 'localhost', //set the domain to your server's domain
        path: '/', //set the path to the root of your application
    });
    response.json({ message: 'User authenticated', userDetails: user });
    }catch (error) {
        console.error( error);
        return response.status(500).json({ message: 'Internal server error' });
    }
},
};
module.exports = authController;