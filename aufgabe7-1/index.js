import express from "express";
const app = express();

const USERNAME = "zli";
const PASSWORD = "zli1234";

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

app.get("/public", (req, res) => {
    res.send("Erfolg");
});

app.get("/private", basicAuth, (req, res) => {
    res.send("Erfolg");
});


app.listen(3000, () => {
    console.log("It runs");
});





// Lösung Lehrer 


import express from 'express';


// 1. Endpunkt GET /public, der ohne Login zugÃ¤nglich ist.
app.get('/public', (_, response) => {
  response.send('Dieser Endpunkt ist Ã¶ffentlich zugÃ¤nglich');
});

// 2. Endpunkt GET /private, der nur nach Eingabe von Benutzername zli und Passwort zli1234 zugÃ¤nglich ist und sonst einen passenden HTTP Status Code zurÃ¼ck gibt.
app.get('/private', (request, response) => {
  const authHeader = request.headers['authorization'];
  const challenge = 'Basic realm="Private Bereich", charset="UTF-8"';

  if (!authHeader) {
    response.set('WWW-Authenticate', challenge);
    return response.status(401).send('Authentication required');
  }

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Basic' || !credentials) {
    response.set('WWW-Authenticate', challenge);
    return response.status(401).send('Authentication required');
  }

  const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
  const [username, password] = decodedCredentials.split(':');

  if (username === 'zli' && password === 'zli1234') {
    response.send('Willkommen im privaten Bereich!');
  } else {
    response.set('WWW-Authenticate', challenge);
    response.status(401).send('Authentication required');
  }
});

app.listen(port, () => {
  console.log(`Server lÃ¤uft auf http://localhost:${port}`);
});