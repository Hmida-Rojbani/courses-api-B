
const jwt = require('jsonwebtoken')


module.exports = function (req,res,next) {
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send('Access denied. No token provided');
    try{
    var decoded_payload = jwt.verify(token.substring(7),"secret");
    req.user_token=decoded_payload;
    next();
    }catch(err){
        return res.status(400).send('Invalid Token')
    }
}