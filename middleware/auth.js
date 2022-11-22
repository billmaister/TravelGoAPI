const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: `Invalid credentials to access this route.`
            })
        }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const { userID, firstname } = decodedToken;
        req.user = { userID, firstname };
        next();
    } catch  {
        return res.status(401).json({ msg: `Token invalid or expired`})
    }
}

module.exports = authenticationMiddleware;