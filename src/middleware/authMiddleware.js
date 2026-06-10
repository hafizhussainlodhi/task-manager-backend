// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).json({ error: "Token nahi mila, access denied!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token se user ki ID mil gayi (req.user.id)
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token!" });
    }
};