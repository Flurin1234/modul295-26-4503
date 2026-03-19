import express from 'express';
const app = express();
const port = 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let names = ['Julian Schwab', 'Joel Nigg', 'Lennis Küng', 'Tobias Steinlin'];
let me = {
   vorname: 'Fabian',
   nachname: 'Spiri',
   alter: 17,
   wohnort: 'Zürich',
   augenfarbe: 'Braun'
};




app.get('/now', (request, response) => {
    const tz = request.query.tz || 'Europe/Zurich';
    const time = new Date().toLocaleTimeString('de-CH', { timeZone: tz });
    response.send(time);
});

// 2
app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch');
});

// 3
app.get('/name', (request, response) => {
    const names = [
        'Julian Schwab', 'Joel Nigg', 'Lennis Küng', 'Tobias Steinlin', 'Fabian Spiri', 'Luisa Spiri', 'Julia Spiri', 'Hund vom Fabian'
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    response.send(names[randomIndex]);
});

// 4
app.get('/html', (request, response) => {
   response.sendFile("/workspaces/modul295-26-4503/aufgabe3-3/index.html")
});

// 5
app.get('/image', (request, response) => {
   response.sendFile("/workspaces/modul295-26-4503/aufgabe3-3/leaf.png");
});

// 6
app.get('/teapot', (request, response) => {
   response.sendStatus(418);
});

// 7
app.get('/user-agent', (request, response) => {
   response.send(request.headers['user-agent']);
});

// 8
app.get('/secret', (request, response) => {
   response.sendStatus(403);
});

// 9
app.get('/xml', (request, response) => {
   response.sendFile("/workspaces/modul295-26-4503/aufgabe3-3/index.xml");
});

// 10
app.get('/me', (request, response) => {
   response.json(me);
});




app.post('/names', (request, response) => {
   const name = request.body.name;
   if (!name) {
      response.status(400).send('Name ist erforderlich');
      return;
   }
   names.push(name);
   response.status(201).json({ message: 'Name hinzugefügt', names: names });
});


app.delete('/names', (request, response) => {
   const name = request.query.name;
   if (!name) {
      response.status(400).send('Query parameter ?name= ist erforderlich');
      return;
   }
   names = names.filter(n => n !== name);
   response.sendStatus(204); 
});


app.get('/secret2', (request, response) => {
   const auth = request.headers.authorization;
   if (auth === 'Basic aGFja2VyOjEyMzQ=') {
      response.status(200).json({ message: 'Authorized!' });
   } else {
      response.sendStatus(401); 
   }
});


app.get('/chuck', async (request, response) => {
   const name = request.query.name || 'Chuck Norris';
   try {
      const fetch_response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await fetch_response.json();
      const joke = data.value.replace(/Chuck Norris/g, name);
      response.json({ joke: joke });
   } catch (error) {
      response.status(500).json({ error: 'Fehler beim Abrufen des Witzes' });
   }
});


app.patch('/me', (request, response) => {
   Object.assign(me, request.body);
   response.json(me);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



// // Lösungen Lehrer
// 
// import express from 'express';
// 
// const app = express();
// const port = 3000;
// 
// // 1. Einen Endpunkt GET /now, der die aktuelle Zeit zurÃ¼ck gibt. Per Query Parameter ?tz= kann die Zeitzone ausgewÃ¤hlt werden (z. B. â€œEurope/Zurichâ€).
// app.get('/now', (request, response) => {
//   const tz = request.query.tz || 'UTC';
//   const now = new Date().toLocaleTimeString('de-CH', { timeZone: tz });
//   response.send(`Es ist gerade: ${now} (${tz})`);
// });
// 
// // 2. Einen Endpunkt POST /names, welcher der Namensliste einen Eintrag hinzufÃ¼gt. Der Name wird per Form mitgegeben
// app.use(express.urlencoded({ extended: true }));
// let names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Karl', 'Leo', 'Mallory', 'Nina', 'Oscar', 'Peggy', 'Quentin', 'Rupert', 'Sybil', 'Trent'];
// app.post('/names', (request, response) => {
//   const name = request.body.name;
//   if (name) {
//     names = [...names, name];
//     response.status(201).send(`Name ${name} hinzugefÃ¼gt`);
//   } else {
//     response.status(400).send('Name ist erforderlich');
//   }
//   console.log('Aktuelle Namensliste:', names);
// });
// 
// /**
// curl --request POST \
// --url http://localhost:3000/names \
// --header 'content-type: application/x-www-form-urlencoded' \
// --data name=Hans
// */
// 
// // 3. Einen Endpunkt DELETE /names, der den Eintrag aus der Namensliste entfernt und dann 204 zurÃ¼ck gibt. Der Name wird per Query mitgegeben
// app.delete('/names', (request, response) => {
//   const name = request.query.name;
//   const index = names.indexOf(name);
//   if (index !== -1) {
//     names = names.filter(n => n !== name);
//     response.status(204).send();
//   } else {
//     response.status(404).send('Name nicht gefunden');
//   }
//   console.log('Aktuelle Namensliste:', names);
// });
// 
// // 4. Einen Endpunkt GET /secret2, der den Header â€œAuthorizationâ€ ausliest und 200 zurÃ¼ck gibt, wenn im Header Basic aGFja2VyOjEyMzQ= steht und ansonsten 401 zurÃ¼ck gibt
// app.get('/secret2', (request, response) => {
//   const authHeader = request.headers['authorization'];
//   if (authHeader === 'Basic aGFja2VyOjEyMzQ=') {
//     response.status(200).send('Zugriff gewÃ¤hrt');
//   } else {
//     response.status(401).send('Unauthorized');
//   }
// });
// 
// // 5. Einen Endpunkt GET /chuck, welcher einen zufÃ¤lligen Witz von der Chuck Norris API abfragt. Im Text soll â€œChuck Norrisâ€ dann durch den Wert ersetzt werden, der per Query Paramter ?name= mitgegeben wurde
// app.get('/chuck', (request, response) => {
//   const name = request.query.name || 'Chuck Norris';
//   fetch('https://api.chucknorris.io/jokes/random')
//     .then(res => res.json())
//     .then(data => {
//       const joke = data.value.replace(/Chuck Norris/g, name);
//       response.send(joke);
//     })
//     .catch(err => {
//       console.error('Fehler beim Abrufen des Witzes:', err);
//       response.status(500).send('Fehler beim Abrufen des Witzes');
//     });
// });
// 
// // 6. Einen Endpunkt PATCH /me, der ein JSON Objekt entgegennimmt und die Werte, die mitgegeben wurden, im bisherigen me-Objekt Ã¼berschreiben
// app.use(express.json());
// let me = {
//   firstName: 'Max',
//   lastName: 'Mustermann',
//   age: 30,
//   city: 'ZÃ¼rich',
//   eyeColor: 'braun'
// };
// app.patch('/me', (request, response) => {
//   const updates = request.body;
//   me = { ...me, ...updates };
//   response.json(me);
// });
// 
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
// 