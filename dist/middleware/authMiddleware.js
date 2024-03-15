"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const decoded = jwt.verify(token, "my-secret-key");
        req.user = { ID: decoded.userId };
        next();
    }
    catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" });
        }
        else if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }
        return res.status(401).json({ error: "Access Denied because of internal error" });
    }
}
exports.verifyToken = verifyToken;
