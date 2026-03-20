const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = (req, res, next) => {
    try {
        let token;

        // ✅ 1. Check Authorization Header
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // ✅ 2. Check Cookies (optional)
        if (!token && req.cookies) {
            token = req.cookies.authToken;
        }

        // ❌ No token found
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access!" });
        }

        // ✅ Verify token
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        // Save user info (optional but useful)
        req.user = payload;

        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = jwtAuth;