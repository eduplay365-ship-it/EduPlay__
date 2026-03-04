const fs = require('fs');
const path = require('path');

const raw = `
T
Tipratikan tikuvchi,
Tinmay tikar tunu kun.
Turli tuman buyurtma
Taxlangan tugun tugun.
Tanho tannoz Tovusning
Tayyormas buyurtmasi.
Timsohning terisini 
Tesholmadi ignasi.

U
Uchqur uchuvchi ukki
Uzoq-uzoqqa uchdi.
Uloqcha uchaman deb,
Uzala yerga tushdi.
U yon bu yon boqib soʻng,
Uf tortdi tushib choʻkka:
"Uchqur qanotim boʻlsa,
Uchardim men ham koʻkka".

V
Va'zxonlik qilar Toʻti:
"Vijdonli boʻlish kerak.
Va'da berdingmi, boʻldi,
Vaqtida qilish kerak!"
Toʻgri-yu, aytgan soʻzi, 
Amal qilarmi oʻzi?

X
Xabarchi xoʻroz sahar
"Xushxabar!-- deb qichqirar.
- Xalos boʻldik zulmatdan,
Xatarli tun-kulfatdan.
Xursand boʻling, oshnalar,
Xayrli tong boshlanar!...
Xurrak otib yotmangiz,
Xo'p gʻaflatga botmangiz!"

Y
Yoʻl-yoʻl formali Yoʻlbars ‐---
Yoʻl nazorat xodimi.
Yurgan yoʻlovchilarning
Kuzatar har odimin
Yoʻlchiroqqa qaramay,
Tartib buzsa qay biri,
Yoʻlga solib, ayamay,
Berib qoʻyar tazirin

Z
Zargʻaldoq zargar ekan,
Ziragi gavhar ekan,
Ziyrak turib doimo
Zarlarin asrar ekan.

Oʻ
Oʻqituvchi oʻrdakning
Oʻtgan darsini har kun
Oʻzlashtirib, oʻrganar
Oʻquvchi oʻrdakchalar.
Oʻzlari yosh boʻlsa ham.
Oʻtkir zehnli biram.
Oʻylab topishar darhol,
Oʻnta boʻlsa ham savol.

Gʻ
Gʻazalxon Gʻoz sahnada
Qoʻshiq aytar "gʻoq-gʻoq" deb.
Kekkaymang davralarda,
Kamtar boʻling, oʻrtoq, deb
Qoʻshigʻiku ma'noli,
Gʻalati oʻzi biroq.
Gʻoddayishini tashlasa,
Boʻlarmidi yaxshiroq.

Sh
Shifokor she'r oldiga
Shum tulki shoshib keldi.
"Voy boshim", deb yolgʻondan
Maktabdan qochib keldi.
Sher tekshirdi-yu shartta,
Dedi: "Sogʻsan, darsga bor!"
Shumshayib qaytdi ortga,
Sharmanda boʻlib ayyor.

CH
Chigirtka zo'r cholg'uchi
Chalar kuy charchamasdan
Chiridoqlar jo'r bo'lib
Chirillar har tarafdan
Chir aylanib o'ynaydi
Chiroyli kapalaklar,
Chapak chalib  quvnaydi
Chamandagi chechaklar

Ng
Tayyorga ayyor nahang
Tekinxo'r takasaltang
Qarmoqdagi o'ljaga
Og'iz solgandi qarang
Tumshug'idan ilinib
Tipirchilar, holi tang.
`;

const lines = raw.trim().split('\n');
const poems = [];
let currentLetter = '';
let currentBody = [];

for (const rawLine of lines) {
    let line = rawLine.trim();
    // Headers are either single letter or double letters like Oʻ, Gʻ, Sh, CH, Ng
    if (line.match(/^(T|U|V|X|Y|Z|Oʻ|Gʻ|Sh|CH|Ng)$/i)) {
        if (currentLetter) {
            poems.push({ letter: currentLetter.trim(), body: currentBody.join('<br>') });
        }
        currentLetter = line.trim();
        // Capitalize properly
        if (currentLetter.toLowerCase() === 'ch') currentLetter = 'Ch';
        if (currentLetter.toLowerCase() === 'sh') currentLetter = 'Sh';
        if (currentLetter.toLowerCase() === 'ng') currentLetter = 'Ng';
        if (currentLetter.toLowerCase() === 'oʻ') currentLetter = 'Oʻ';
        if (currentLetter.toLowerCase() === 'gʻ') currentLetter = 'Gʻ';
        if (currentLetter.length === 1) currentLetter = currentLetter.toUpperCase();

        currentBody = [];
    } else if (line.length > 0) {
        currentBody.push(line);
    }
}
if (currentLetter) {
    poems.push({ letter: currentLetter.trim(), body: currentBody.join('<br>') });
}

let cardsHtml = '';
let jsTranslations = {};

const icons = [
    'fa-book', 'fa-star', 'fa-leaf', 'fa-sun', 'fa-music', 'fa-heart', 'fa-feather', 'fa-paw', 'fa-anchor', 'fa-bolt', 'fa-bug', 'fa-cat'
];

poems.forEach((poem, index) => {
    const icon = icons[index % icons.length];

    // Normalize letter to be used in translation keys:
    // Oʻ -> o_
    // Gʻ -> g_
    // Sh -> sh
    // Ch -> ch
    // Ng -> ng
    let keyLetter = poem.letter.toLowerCase().replace(/ʻ/g, '_');

    const titleKey = `poem_alpha_${keyLetter}_title`;
    const subtitleKey = `poem_alpha_${keyLetter}_subtitle`;
    const bodyKey = `poem_alpha_${keyLetter}_body`;

    jsTranslations[titleKey] = `${poem.letter} harfi uchun she'r`;
    jsTranslations[subtitleKey] = `Alifbo she'rlari`;
    jsTranslations[bodyKey] = poem.body;

    cardsHtml += `
                <!-- Poem ${poem.letter} -->
                <div class="card" style="flex: 1; min-width: 350px; max-width: 550px; padding: 2.5rem; position: relative;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <i class="fas ${icon}" style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1rem; display: block;"></i>
                        <h2 style="color: var(--primary-color); font-size: 1.6rem; margin-bottom: 0.5rem;" data-i18n="${titleKey}">${jsTranslations[titleKey]}</h2>
                        <p style="color: var(--text-muted); font-style: italic;" data-i18n="${subtitleKey}">${jsTranslations[subtitleKey]}</p>
                    </div>

                    <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-color); text-align: center; font-family: 'Georgia', serif;" data-i18n="${bodyKey}">
                        ${poem.body}
                    </div>

                    <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                        <button class="btn btn-green like-btn" style="max-width: 200px;">
                            <i class="far fa-thumbs-up"></i> <span data-i18n="liked_question">Yoqdimi?</span>
                        </button>
                    </div>
                </div>`;
});

// Update poems.html
let html = fs.readFileSync(path.join(__dirname, 'poems.html'), 'utf-8');
const endTag = '<!-- Global Back Button -->';

// Find the last </div> before the <!-- Global Back Button -->
const endIndex = html.indexOf(endTag);
const lastDivIndex = html.lastIndexOf('</div>', endIndex);

const newHtml = html.substring(0, lastDivIndex) + '\n' + cardsHtml + '\n            </div>\n\n            ' + html.substring(endIndex);
fs.writeFileSync(path.join(__dirname, 'poems.html'), newHtml);

// Output JS changes for manual/automated replace
let jsTranslationsBlock = "const jsTranslations = {\n";
for (const [k, v] of Object.entries(jsTranslations)) {
    jsTranslationsBlock += `    '${k}': \`${v}\`,\n`;
}
jsTranslationsBlock += "};";
fs.writeFileSync(path.join(__dirname, 'js_edits2.js'), jsTranslationsBlock);
console.log('Processed ' + poems.length + ' poems. wrote to js_edits2.js and poems.html');
