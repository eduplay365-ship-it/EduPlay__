const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let changedFiles = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/>\?\?\?\?\?\?\?</g, ">Русский<");
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log('Fixed Russian encoding in ' + file);
        changedFiles++;
    }
});
console.log(`Fixed encoding in ${changedFiles} files.`);
