const fs = require('fs');
const path = require('path');

const raw = `
A
Ahil asalarilar
Azonlab tushar ishga
Atrof dala, bogʻlardan
Asal yigʻishar qishga
Ayiq boʻlsa, meshqorin
Asallarni yer, borin.
Arilar xafa gʻoyat,
Axir' bormi adolat?!

B
Baliq boyvuchcha, desam,
Bekor gap, dema hecham.
Boq oʻzing, ana oʻrtoq,
Badani xoʻp yaltiroq.
Boshdan-oyoq tanga u,
Bas, boyvuchcha yanga u.

D
Delfin mohir dengizchi,
Dono, aqlli biram
Dengizda choʻksa birov
Darrov beradi yordam.

E 
Etikdoʻz Echki eski
Etiklarni rostladi.
Eplab, qolipga tortib,
Eshakvoyga mosladi.

F
Farrosh Fill xola, qarang,
Tozalabdi har yoqni.
Topmaysiz hech yerda chang,
Artib kiring oyoqni.
Fayzli, fusunkor boʻlib,
Yashnab turar hamma yoq.
Farroshlar mehnatini
Qadrlang siz ey oʻrtoq!

G
Gimnastikachi--
Gavdali, durkun
Gardani yoʻgʻon
Gorilla maymun.
Gap yoʻq mashqiga,
Bajarar chaqqon,
Olqishlar olib,
Hammaga yoqqan.

H
Hakka harbiy xizmatda,
Himoyachi zoʻr posbon!
Havodan oʻtmas pashsha,
Hatlolmas yerdan sichqon.

I
It ishonchli izquvar,
Ishini yaxshi bilar.
Ishkal qilsa kim-birov,
Izini olib darrov,
Izlab-izlab topadi,
Irillaydi qopadi!

J
Jarroh Jayra
Ja zoʻr-da.
Kasallarga 
Gʻamxoʻrda
Sekin tiqar ninasin.
Ishonmagan sinasin.

K
Kalamushvoy kemirar,
Kundan-kunga semirar.
Boshqa kasb kori yoʻq,
Andishasi ori yo'q.

L
Lofchi laylak lof urar,
Laqma, laqqa baqaga.
Soʻng cho'qib shartta yutar,
Dars bu bola-chaqaga.

M
Maymun bilan Mosh mitti
Masxaraboz oʻyinchi.
Maydonda mashq qilmoqda,
Mana, siz ham koʻring-chi:
Maymunni mashinaday
Minib, haydamoqchi Mosh.
"Mashina"-chi, miq etmas,
Tormozda-da, na iloj...

N
Ninachixon raqqosa
Nozik, navnihol rosa.
Nazar soling, naqadar
Nafis raqsga tushar.

O
Ot kasbi -ishchi,
Omborchi, yukchi,
Ortib don-dunni,
Oppoq tuz, unni,
Olib yeladi, olib keladi.

P
Pingvin xola pazanda,
Piyoz sabzi qozonda.
Peshin palov pishsin deb
Ish boshlagan azonda

Q
Qaldirgʻochga qoyil-a,
Qarang, qanday quruvchi.
Quribdi loydan uya,
Qotiribdi, koʻring-chi.
Qiyin ishmi shuyam deb,
Qora qargʻa gap qotar.
Oʻzi qurgan in esa,
Shamolda qulab yotar.

R
Rassom Buzoq
Rasm solar.
Quyon qoʻrqib
Razm solar.
Rasmlarning 
zo'ri-da u,
Rosa katta 
Boʻrida u!

S
Sa'vaxon-suxandon,
Soʻzlari biyron-biyron.
Soling quloq, qanday soz,
Sehrli, sohir ovoz!
`;

const lines = raw.trim().split('\n');
const poems = [];
let currentLetter = '';
let currentBody = [];

for (const rawLine of lines) {
    let line = rawLine.trim();
    if (line.length === 1 && line.match(/[A-Z]/i)) {
        if (currentLetter) {
            poems.push({ letter: currentLetter.trim(), body: currentBody.join('<br>') });
        }
        currentLetter = line.trim().toUpperCase();
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
    const letter = poem.letter.toLowerCase();
    const titleKey = `poem_alpha_${letter}_title`;
    const subtitleKey = `poem_alpha_${letter}_subtitle`;
    const bodyKey = `poem_alpha_${letter}_body`;

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
const startTag = '<div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: flex-start;">';
const endTag = '<!-- Global Back Button -->';

const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.indexOf(endTag);

const newHtml = html.substring(0, startIndex) + '\n' + cardsHtml + '\n            </div>\n\n            ' + html.substring(endIndex);
fs.writeFileSync(path.join(__dirname, 'poems.html'), newHtml);

// Output JS changes for manual/automated replace
let jsTranslationsBlock = "const jsTranslations = {\n";
for (const [k, v] of Object.entries(jsTranslations)) {
    jsTranslationsBlock += `    '${k}': \`${v}\`,\n`;
}
jsTranslationsBlock += "};";
fs.writeFileSync(path.join(__dirname, 'js_edits.js'), jsTranslationsBlock);
console.log('Processed ' + poems.length + ' poems. wrote to js_edits.js and poems.html');
