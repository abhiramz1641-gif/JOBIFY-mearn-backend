const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: "Invalid Authorization format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.sk);
        req.user = decoded; // attach full decoded token
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = jwtMiddleware;
