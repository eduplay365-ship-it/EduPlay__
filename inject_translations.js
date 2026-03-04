const fs = require('fs');

const editsStr = fs.readFileSync('js_edits.js', 'utf-8');
const linesStr = editsStr.split('\n').slice(1, -1).join('\n'); // drop first and last line

let scriptJs = fs.readFileSync('script.js', 'utf-8');

scriptJs = scriptJs.replace(/('liked_answer': `[^`]+`,)/g, `$1\n${linesStr}`);

fs.writeFileSync('script.js', scriptJs);
console.log('Injected translations into script.js');
