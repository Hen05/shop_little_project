const jwt = require('jsonwebtoken');
const {getAccessToken} = require("../utils/getAccessToken.js");

exports.verifyToken = async (req, res, next) => {
    const token = getAccessToken(req);

    if (!token) {
        return res.status(403).json({ message: 'User is not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('access_token');
            return res.status(403).json({ message: 'Invalid session, please login again' });
        }
        req.userId = decoded.id;

        next();
    });
};