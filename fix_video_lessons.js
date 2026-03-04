const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f === 'script.js');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
        .replace(/video_games/g, 'video_lessons')
        .replace(/video-games\.html/g, 'video-lessons.html')
        .replace(/Video Games/g, 'Video Lessons');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log('Updated ' + file);
    }
});
