const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.json({message: "Invalid Token"});
        }
        next();
    });
}

module.exports = auth;