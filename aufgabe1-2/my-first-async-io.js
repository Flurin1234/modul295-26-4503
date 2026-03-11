const fs = require('fs')

const file = process.argv[1];

content = fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.log("Error")
    }
   
});