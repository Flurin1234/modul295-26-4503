import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { isbn: '978-3-16-148410-0', title: 'Der Alchimist', year: 1988, author: 'Paulo Coelho' },
  { isbn: '978-0-7432-7356-5', title: 'Die Verwandlung', year: 1915, author: 'Franz Kafka' },
  { isbn: '978-1-56619-909-4', title: 'Der Herr der Ringe', year: 1954, author: 'J.R.R. Tolkien' }
];

app.get('/books', (_, response) => {
  response.json(books);
});

app.get('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    response.json(book);
  } else {
    response.status(404).send('Buch nicht gefunden');
  }
});

app.post('/books', (request, response) => {
  const newBook = request.body;
  if (!newBook.isbn || !newBook.title || !newBook.year || !newBook.author) {
    return response.status(422).send('Alle Attribute müssen ausgefüllt sein');
  }
  books = [...books, newBook];
  response.status(201).json(newBook);
});

app.put('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  const updatedBook = request.body;
  if (!updatedBook.isbn || !updatedBook.title || !updatedBook.year || !updatedBook.author) {
    return response.status(422).send('Alle Attribute müssen ausgefüllt sein');
  }
  const index = books.findIndex(b => b.isbn === isbn);
  if (index !== -1) {
    books = books.map(b => b.isbn === isbn ? updatedBook : b);
    response.json(updatedBook);
  } else {
    response.status(404).send('Buch nicht gefunden');
  }
});

app.delete('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  const index = books.findIndex(b => b.isbn === isbn);
  if (index !== -1) {
    books = books.filter(b => b.isbn !== isbn);
    response.status(204).send();
  } else {
    response.status(404).send('Buch nicht gefunden');
  }
});

app.patch('/books/:isbn', (request, response) => {
  const isbn = request.params.isbn;
  const updates = request.body;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    if (updates.isbn === '' || updates.title === '' || updates.year === '' || updates.author === '') {
      return response.status(422).send('Alle Attribute müssen ausgefüllt sein');
    }
    const updatedBook = { ...book, ...updates };
    books = books.map(b => b.isbn === isbn ? updatedBook : b);
    response.json(updatedBook);
  } else {
    response.status(404).send('Buch nicht gefunden');
  }
});

app.listen(port, () => {
  console.log(`Bibliotheks-API läuft auf http://localhost:${port}`);
});