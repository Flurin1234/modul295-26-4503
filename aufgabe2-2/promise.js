import fs from 'node:fs/promises';

function readFileContent(filepath) {
return fs.readFile(filepath, 'utf8');
}

readFileContent('promise.js')
  .then(content => {
    console.log('Die Länge des Dateiinhalts beträgt:', content.length);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
  });