"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTradesmanToken = void 0;
const jwt = require('jsonwebtoken');
function verifyTradesmanToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const decoded = jwt.verify(token, "my-secret-key");
        console.log(decoded);
        req.user = { ID: decoded.tradesmanId };
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
exports.verifyTradesmanToken = verifyTradesmanToken;
