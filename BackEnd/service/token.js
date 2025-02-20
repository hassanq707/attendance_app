const jwt = require("jsonwebtoken")
const secret_key = process.env.JWT_SECRET_KEY;


function setUser(user){
    return jwt.sign({
        fullname : user.fullname,
        role : user.role,
        _id : user._id
    },secret_key)
}


function getUser(token) {
    try {
        return jwt.verify(token, secret_key);
    } catch (err) {
        console.log("Invalid token", err);
        return null;
    }
}


module.exports = {
    setUser,
    getUser
}