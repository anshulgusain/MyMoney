const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message:"Authheader not present"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
         
        req.userId = decoded.userId;
        // console.log(decoded.userId)

        next();
    } catch (err) {
        return res.status(403).json({message:"Wrong Token"});
    }
};

module.exports = {
    authMiddleware
}