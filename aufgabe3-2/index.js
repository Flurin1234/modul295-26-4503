import fs from  "fs"
import express from "express"
const app = express();
const port = 3005;


async function getWeather(zip) {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`;
  try {
        const response = await fetch(url);
        if (response.status !== 200) {
            console.error(response.status);
        }
        else {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}



function locationToZip(location) {
    const filePath = "/workspaces/modul295-26-4503/zip-location.csv";   
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n"); 
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(";"); 
        const ort = cols[0]?.trim();
        const zip = cols[1]?.trim();
        
        if (ort === location) {
            return zip;
        }
    }
    
    throw new Error(`Location "${location}" not found`);
}

app.get('/weather/:location', async (req, response) => {
    try {
        const zip = locationToZip(req.params.location);
        let output = await getWeather(zip);
        response.send(output);
    }
    catch {
        response.send("Error")
    }
    
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});






// Lösung Lehrer
// import express from 'express';
// 
// const app = express();
// const port = 3000;
// 
// // AMTOVZ_CSV_LV95.csv laden und in ein Array umwandeln
// import fs from 'node:fs/promises';
// let places = [];
// fs.readFile('src/aufgabe_3-2/AMTOVZ_CSV_LV95.csv', 'utf-8')
//   .then(data => {
//     const lines = data.split('\n');
//     lines.forEach((line, index) => {
//       if (index === 0) return; // Header überspringen
//       const [place, zip] = line.split(';');
//       places.push({ place, zip });
//     });
//     console.log('Ortschaften geladen:', places.length);
//   })
//   .catch(err => {
//     console.error('Fehler beim Lesen der Datei:', err);
//   });
// 
// 
// app.get('/weather/:location', (request, response) => {
//   const location = request.params.location;
//   console.log(`Anfrage für Wetterdaten von: ${location}`);
//   const place = places.find(o => o.place.toLowerCase() === location.toLowerCase());
//   if (!place) {
//     return response.status(404).send('Ort nicht gefunden');
//   }
// 
//   fetch(`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${place.zip}00`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`Fehler beim Abrufen der Wetterdaten: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then(data => {
//       response.json(data);
//     })
//     .catch(err => {
//       console.error(err);
//       response.status(500).send('Fehler beim Abrufen der Wetterdaten');
//     });
// });
// 
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
// 