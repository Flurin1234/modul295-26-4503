import express from 'express';
const app = express();
const port = 3009;

// 1
app.get('/now', (request, response) => {
    response.send(new Date().toLocaleString("de-CH"));
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
   const me = {
      vorname: 'Fabian',
      nachname: 'Spiri',
      alter: 17,
      wohnort: 'Zürich',
      augenfarbe: 'Braun'
   };
   response.json(me);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
