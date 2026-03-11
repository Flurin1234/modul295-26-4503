const fs = require('fs')

const file = process.argv[1];

content = fs.readFileSync(file).toString();

lines = content.split('\n').length -1;
console.log(lines); 

/* Lösung Learnyounode
const fs = require('fs')
    
    const contents = fs.readFileSync(process.argv[2])
    const lines = contents.toString().split('\n').length - 1
    console.log(lines)
*/
