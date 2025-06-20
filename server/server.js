const express = require('express'); //express module included
const cookieParser = require('cookie-parser'); //cookie-parser module included
const cors=require('cors');  //CORS module included to handle cross-origin requests
const authRoutes = require('./src/routes/authRoutes'); //importing authRoutes
const app=express(); //instance of express application
app.use(express.json()); //Middleware
app.use(cookieParser()); //Middleware to parse cookies
const corsOptions={
    origin: 'http://localhost:3000', //Allow requests from this origin
    credentials: true, //Allow cookies to be sent with requests
    
}
app.use(cors(corsOptions)); //Using CORS middleware with specified options
app.use('/auth', authRoutes); //Mounting authRoutes on /auth path
const PORT=5000;
app.listen(PORT,(error)=>{
    if(error){
        console.log("Error in starting server",error);
       
    }
    else{
    console.log("Server is running on port 5000");
    }
})