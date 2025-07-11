const permissions = require("../constants/permissions");

const authorize=(requiredPermission)=>{
    //we are returning a middleware function from this function
    return(request,response,next)=>{
        const user=request.user; //authMiddleware will run before this Middleware
        if(!user){
            return response.status(401).json({meassage:"Unauthorized"});
        }
        const userPermission=permissions[user.role]||[];
        // console.log(userPermission);
        // console.log(user.role);
        // console.log(requiredPermission);
        if(!userPermission.includes(requiredPermission)){
            return response.status(403).json({meassage:"Forbidden: Insufficient Permission"});
        }
        next();
    };
};
module.exports=authorize;