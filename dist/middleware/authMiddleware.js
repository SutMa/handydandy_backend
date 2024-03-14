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
        req.body.userId = decoded.userId;
        next();
    }
    catch (e) {
    }
}
exports.verifyToken = verifyToken;
