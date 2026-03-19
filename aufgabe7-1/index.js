const express = require("express");
const app = express();

const USERNAME = "admin";
const PASSWORD = "password123";

const basicAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username === USERNAME && password === PASSWORD) {
        return next();
    }

    return res.status(401).json({ message: "Invalid credentials" });
};

app.get("/protected", basicAuth, (req, res) => {
    res.json({ message: "Access granted to protected resource" });
});