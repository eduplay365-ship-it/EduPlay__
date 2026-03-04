const fs = require('fs');

let html = fs.readFileSync('poems.html', 'utf8');

// Poem 1 Title
html = html.replace(
    /<h2 style="color: var\(--primary-color\); font-size: 1\.6rem; margin-bottom: 0\.5rem;">Onaxonim\s*ko'zlari<\/h2>/,
    '<h2 style="color: var(--primary-color); font-size: 1.6rem; margin-bottom: 0.5rem;" data-i18n="poem1_title">Onaxonim ko\'zlari</h2>'
);

// Poem 1 Subtitle
html = html.replace(
    /<p style="color: var\(--text-muted\); font-style: italic;">Ta'sirli she'r<\/p>/,
    '<p style="color: var(--text-muted); font-style: italic;" data-i18n="poem1_subtitle">Ta\'sirli she\'r</p>'
);

// Poem 1 Body
// We can find it by the first few words or the opening div. The div has a specific style string.
html = html.replace(
    /<div\s*style="font-size: 1\.05rem; line-height: 1\.8; color: var\(--text-color\); text-align: center; font-family: 'Georgia', serif;">/,
    '<div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-color); text-align: center; font-family: \'Georgia\', serif;" data-i18n="poem1_body">'
);
// Wait, both bodies have the exact same style tag!
// Let's replace the first one with poem1_body and the second with poem2_body.
let parts = html.split('<div\n                        style="font-size: 1.05rem; line-height: 1.8; color: var(--text-color); text-align: center; font-family: \'Georgia\', serif;">');
if (parts.length < 3) {
    // try removing the newline
    parts = html.split(/<div\s*style="font-size: 1\.05rem; line-height: 1\.8; color: var\(--text-color\); text-align: center; font-family: 'Georgia', serif;">/);
}

if (parts.length === 3) {
    html = parts[0] + '<div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-color); text-align: center; font-family: \'Georgia\', serif;" data-i18n="poem1_body">' + parts[1] + '<div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-color); text-align: center; font-family: \'Georgia\', serif;" data-i18n="poem2_body">' + parts[2];
} else {
    console.error("Failed to inject body tags");
}

// Poem 2 Title
html = html.replace(
    /<h2 style="color: var\(--primary-color\); font-size: 1\.6rem; margin-bottom: 0\.5rem;">O‘zbekiston,(\s*)Vatanim manim<\/h2>/g,
    '<h2 style="color: var(--primary-color); font-size: 1.6rem; margin-bottom: 0.5rem;" data-i18n="poem2_title">O‘zbekiston, Vatanim manim</h2>'
);

// Poem 2 Subtitle
html = html.replace(
    /<p style="color: var\(--text-muted\); font-style: italic;">Abdulla Oripov<\/p>/,
    '<p style="color: var(--text-muted); font-style: italic;" data-i18n="poem2_subtitle">Abdulla Oripov</p>'
);

// Yoqdimi Button text
html = html.replace(
    /<span>Yoqdimi\?<\/span>/g,
    '<span data-i18n="liked_question">Yoqdimi?</span>'
);

// Update Like Button JS
let oldScript = `
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const icon = this.querySelector('i');
                const span = this.querySelector('span');

                if (icon.classList.contains('far')) {
                    icon.classList.replace('far', 'fas');
                    span.textContent = 'Yoqdi!';
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => this.style.transform = 'scale(1)', 200);
                } else {
                    icon.classList.replace('fas', 'far');
                    span.textContent = 'Yoqdimi?';
                }
            });
        });
`;

let newScript = `
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const icon = this.querySelector('i');
                const span = this.querySelector('span');

                if (icon.classList.contains('far')) {
                    icon.classList.replace('far', 'fas');
                    span.setAttribute('data-i18n', 'liked_answer');
                    if (typeof updateLanguage === 'function' && window.currentLang) {
                        updateLanguage(window.currentLang);
                    } else {
                        span.textContent = 'Yoqdi!';
                    }
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => this.style.transform = 'scale(1)', 200);
                } else {
                    icon.classList.replace('fas', 'far');
                    span.setAttribute('data-i18n', 'liked_question');
                    if (typeof updateLanguage === 'function' && window.currentLang) {
                        updateLanguage(window.currentLang);
                    } else {
                        span.textContent = 'Yoqdimi?';
                    }
                }
            });
        });
`;
// Because tabs and white space never match perfectly, let's use a regex
html = html.replace(/document\.querySelectorAll\('\.like-btn'\)[\s\S]*?\}\);[\s\S]*?\}\);/g, newScript.trim());

fs.writeFileSync('poems.html', html);
console.log('poems.html patched');
