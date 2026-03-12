/**
 *Implementieren Sie folgende Endpunkte mit express.js. Beachten Sie dabei die korrekten HTTP Status-Codes und Content-Types in den Header zu definieren.

    1. Einen Endpunkt /now, der die aktuelle Zeit zurück gibt.
    1. Einen Endpunkt /zli, der den Benutzer auf die ZLI Webseite https://www.zli.ch weiterleitet.
    1. Einen Endpunkt /name, der aus einer Liste von mindestens 20 Namen einen auswählt zufällig und zurückgibt.
    1. Einen Endpunkt /html, der statisches HTML aus einer Datei vom Server zurück gibt.
    1. Einen Endpunkt /image, der ein Bild zurückgibt, das im Browser angezeigt wird.
    1. Einen Endpunkt /teapot, der den Status 418 zurück gibt.
    1. Einen Endpunkt /user-agent, der den Browser aus dem Request ausliest und zurück gibt.
    1. Einen Endpunkt /secret, der immer den Status 403 zurück gibt.
    1. Einen Endpunkt /xml, der eine statische XML Datei vom Server zurück gibt.
    1. Einen Endpunkt /me, der ein JSON Objekt zurück gibt mit den Properties Vor- und Nachname, Alter, Wohnort und Augenfarbe.

 */

import express from 'express';

const app = express();
const port = 3000;

// 1. Einen Endpunkt /now, der die aktuelle Zeit zurück gibt.
app.get('/now', (_, response) => {
  const now = new Date().toLocaleTimeString()
  response.send(`Es ist gerade: ${now}`)
});

// 2. Einen Endpunkt /zli, der den Benutzer auf die ZLI Webseite https://www.zli.ch weiterleitet.
app.get('/zli', (_, response) => {
  response.redirect('https://www.zli.ch');
});

// 3. Einen Endpunkt /name, der aus einer Liste von mindestens 20 Namen einen auswählt zufällig und zurückgibt.
const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Karl', 'Leo', 'Mallory', 'Nina', 'Oscar', 'Peggy', 'Quentin', 'Rupert', 'Sybil', 'Trent'];
app.get('/name', (_, response) => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  response.send(`Der zufällig ausgewählte Name ist: ${randomName}`);
});

// 4. Einen Endpunkt /html, der statisches HTML aus einer Datei vom Server zurück gibt.
import fs from 'node:fs/promises';
app.get('/html', async (_, response) => {
  try {
    const htmlContent = await fs.readFile('src/aufgabe_3-3/static.html', 'utf-8');
    response.setHeader('Content-Type', 'text/html');
    response.send(htmlContent);
  } catch (err) {
    console.error('Fehler beim Lesen der HTML-Datei:', err);
    response.status(500).send('Fehler beim Laden der Seite');
  }
});

// 5. Einen Endpunkt /image, der ein Bild zurückgibt, das im Browser angezeigt wird.
app.get('/image', async (_, response) => {
  try {
    const imageContent = await fs.readFile('src/aufgabe_3-3/thumbsup.gif');
    response.setHeader('Content-Type', 'image/gif');
    response.send(imageContent);
  } catch (err) {
    console.error('Fehler beim Lesen der Bild-Datei:', err);
    response.status(500).send('Fehler beim Laden des Bildes');
  }
});

// 6. Einen Endpunkt /teapot, der den Status 418 zurück gibt.
app.get('/teapot', (_, response) => {
  response.status(418).send("I'm a teapot");
});

// 7. Einen Endpunkt /user-agent, der den Browser aus dem Request ausliest und zurück gibt.
app.get('/user-agent', (request, response) => {
  const userAgent = request.headers['user-agent'] || 'Unbekannter Browser';
  response.send(`Ihr Browser ist: ${userAgent}`);
});

// 8. Einen Endpunkt /secret, der immer den Status 403 zurück gibt.
app.get('/secret', (_, response) => {
  response.status(403).send('Zugriff verweigert');
});

// 9. Einen Endpunkt /xml, der eine statische XML Datei vom Server zurück gibt.
app.get('/xml', async (_, response) => {
  try {
    const xmlContent = await fs.readFile('src/aufgabe_3-3/static.xml', 'utf-8');
    response.setHeader('Content-Type', 'application/xml');
    response.send(xmlContent);
  } catch (err) {
    console.error('Fehler beim Lesen der XML-Datei:', err);
    response.status(500).send('Fehler beim Laden der XML-Datei');
  }
});

// 10. Einen Endpunkt /me, der ein JSON Objekt zurück gibt mit den Properties Vor- und Nachname, Alter, Wohnort und Augenfarbe.
app.get('/me', (_, response) => {
  const person = {
    vorname: 'Max',
    nachname: 'Mustermann',
    alter: 19,
    wohnort: 'Männedorf',
    augenfarbe: 'braun'
  };
  response.json(person);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
