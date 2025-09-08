const userAuth = (req,res,next)=>{

    const token = "xyz";
    const isAuthenticated = token === "xyz";

    if (isAuthenticated){
        next();
    }
    else{
        res.status(401).send("Unauthorized user");
    }

}

const adminAuth = (req,res,next)=>{

    const token = "xyz";
    const isAuthenticated = token === "xyz";

    if (isAuthenticated){
        next();
    }
    else{
        res.status(401).send("Unauthorized admin");
    }

}

module.exports = {userAuth, adminAuth};