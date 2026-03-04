const fs = require('fs');

const pData = {
    'poem1_title': { en: "Mother's Eyes", uz: "Onaxonim ko'zlari", ru: "Глаза матери" },
    'poem1_subtitle': { en: "A touching poem", uz: "Ta'sirli she'r", ru: "Трогательное стихотворение" },
    'poem1_body': {
        en: "These deep eyes looking at you<br>Are not mine, friends...<br><br>I was born blind into the world,<br>They called me poor, said it was my fate.<br>I didn't know what the moon or stars were,<br>Or what nights and days were.<br><br>Early spring, my father brought<br>A doctor from Tashkent, I was so happy.<br>He was a professor, looked at my eyes,<br>Listened to my sad, sorrowful words.<br><br>He said he'd cure me, but only if someone<br>Gave their own eyes, though it's terrifying.<br>Then my father gathered my friends,<br>They said giving eyes is scary,<br>My relatives didn't gift their eyes either.<br><br>One day I sat in silence,<br>A loud cry was heard from the house.<br>I jumped up, someone sat me down,<br>5 days after the operation,<br>When the Russian doctor gave permission,<br>And sharply took the bandage off my eyes,<br>I saw the world for the first time.<br><br>Oh, moon and stars! Then I brought the horse home,<br>Oh, this life is forbidden for a worthless servant like me.<br>My mother's eyes were blind,<br>The poor thing groaned, her pain was great.<br>She felt my face and sharply<br>Kissed my new eyes once.<br><br>These deep eyes looking at you<br>Are not mine, friends... They are my mother's!",
        uz: "Sizga boqib turgan bu teron ko'zlar<br>Meniki emas, do'stlar...<br><br>Dunyoda ko'r bo'lib kelgan edim men,<br>Bechora derdilar, qismatim ekan.<br>Bilmasdim oy nima yo yulduz nima,<br>Kechalari nima o'zi yo kunduz nima.<br><br>Ilk bahorda Toshkentdan dadam,<br>Doktor olib keldilar, quvondim biram.<br>Professor ekan, ko'rdi ko'zlarim,<br>Tinglardi dardli, mungli so'zlarim.<br><br>Davalayman dedi, ammo birorta odam,<br>O'z ko'zini bersa, dahshat bo'lsa ham.<br>Shunda do'stlarimni to'pladi dadam,<br>Ko'z berish dahshat-ku deyishdi ular,<br>Ko'z inom etmadi qarindoshlarim ham.<br><br>Bir kun sukunatda o'tirardim jim,<br>Uydan eshitildi qattiq bir faryod.<br>Irg'ib turgandim, kimdir o'tqazdi,<br>Operatsiyadan 5 kun o'tgach,<br>Ul rus tabibi ruxsat bergach,<br>Ko'zimdan dokani oldimi shartta,<br>Men dunyoni ko'rdim birinchi marta.<br><br>Oh, oy yulduz! Shunda uyga qo'ydim ot,<br>Eh, men noshud bandaga harom bu hayot.<br>Onajonim ko'zlari ko'r edi,<br>Ingrardi bechora, dardi zo'r edi.<br>Paypaslab yuzimni tutdi-yu shartta,<br>Yangi ko'zlarimdan bir marotaba o'pdi.<br><br>Sizga boqib turgan bu teron ko'zlar<br>Meniki emas, do'stlar... Onajonimniki!",
        ru: "Эти глубокие глаза, смотрящие на тебя<br>Не мои, друзья...<br><br>Я родился слепым в этот мир,<br>Называли меня беднягой, говорили, что это моя судьба.<br>Я не знал, что такое луна или звезда,<br>Или что такое ночи и дни.<br><br>Ранней весной отец привез<br>Врача из Ташкента, я был так счастлив.<br>Он был профессором, посмотрел в мои глаза,<br>Слушал мои грустные, печальные слова.<br><br>Он сказал, что вылечит, но только если кто-то<br>Отдаст свои глаза, хотя это и ужасно.<br>Затем отец собрал моих друзей,<br>Они сказали, что отдавать глаза страшно,<br>Мои родственники тоже не подарили свои глаза.<br><br>В один из дней я сидел в тишине,<br>Из дома послышался громкий крик.<br>Я вскочил, кто-то усадил меня,<br>Через 5 дней после операции,<br>Когда русский врач дал разрешение,<br>И резко снял повязку с моих глаз,<br>Я впервые увидел мир.<br><br>О, луна и звезда! Тогда я привел коня домой,<br>О, эта жизнь запретна для такого никчемного слуги, как я.<br>Глаза моей матери были слепы,<br>Бедняжка стонала, ее боль была сильна.<br>Она нащупала мое лицо и резко<br>Поцеловала мои новые глаза один раз.<br><br>Эти глубокие глаза, смотрящие на тебя<br>Не мои, друзья... Они моей матери!"
    },
    'poem2_title': {
        en: "Uzbekistan, My Motherland",
        uz: "O‘zbekiston, Vatanim manim",
        ru: "Узбекистан, моя родина"
    },
    'poem2_subtitle': {
        en: "Abdulla Oripov",
        uz: "Abdulla Oripov",
        ru: "Абдулла Орипов"
    },
    'poem2_body': {
        en: "My land, I wrote a poem for you today,<br>I could never find a comparison for you.<br>There are poets who called their whole country<br>The only one in the world.<br><br>Their poems flew very far,<br>On the wings of silver lands,<br>There is a land in the world, however<br>All of it is an unwritten poem:<br>Only my weak pen,<br>Uzbekistan, my motherland.<br><br>I would never walk searching for paradise,<br>I wouldn't suffer if I couldn't find it.<br>I wouldn't sit telling fairy tales,<br>I wouldn't sharpen my pen calling it wine.<br><br>Taking joy from your spring,<br>Master Olimjon became famous,<br>The pride that Gafur Gulam felt<br>Could be made into a poem for the world.<br>Distant history is my step,<br>Uzbekistan, my motherland.<br><br>Your past is truly very long,<br>My eyes cannot catch all of it.<br>I would not praise the past, however<br>I think of your past for a moment.<br><br>Enquiring the wide Asia,<br>A proud, conquering person emerged,<br>For two and a half centuries<br>The Great Conqueror shook the world.<br>I will say, today, he is mine, mine.<br>Uzbekistan, my motherland.",
        uz: "Yurtim, senga she’r bitdim bu kun,<br>Qiyosingni topmadim aslo.<br>Shoirlar bor, o‘z yurtin butun —<br>Olam aro atagan tanho.<br><br>Ular she’ri uchdi ko‘p yiroq,<br>Qanotida kumush diyori,<br>Bir o‘lka bor dunyoda, biroq<br>Bitilmagan dostondir bori:<br>Faqat ojiz qalamim manim,<br>O‘zbekiston, Vatanim manim.<br><br>Yurmasman hech behishtni izlab,<br>Topolmasam chekmasman alam.<br>O‘tirmasman ertaklar so‘zlab,<br>Musallo deb yo‘nmasman qalam.<br><br>Ko‘klamingdan olib sururni,<br>Dovrug’ soldi ustoz Olimjon,<br>G‘afur G‘ulom tuygan g‘ururni<br>Qilmoq mumkin dunyoga doston.<br>Olis tarix qadamim manim,<br>O‘zbekiston, Vatanim manim.<br><br>Kechmishing bor chindan ham uzoq,<br>Ilg‘ay olmas barchasin ko‘zim.<br>Maqtamasman moziyni, biroq<br>O‘tmishingni o‘ylayman bir zum.<br><br>Zabtga olib keng Osiyoni,<br>Bir zot chiqdi mag‘rur, davongir,<br>Ikki asr yarim dunyoni<br>Zir qaqshatdi Buyuk jahongir.<br>Aytgum, bu kun, u manim, manim.<br>O‘zbekiston, Vatanim manim.",
        ru: "Мой край, я написал тебе стих сегодня,<br>Я никогда не мог найти тебе сравнения.<br>Есть поэты, которые называли свою страну<br>Единственной в мире.<br><br>Их стихи улетели очень далеко,<br>На крыльях серебряных стран,<br>Есть страна в мире, однако<br>Вся она - ненаписанная поэма:<br>Только мое слабое перо,<br>Узбекистан, моя родина.<br><br>Я бы никогда не искал рай,<br>Я бы не страдал, если бы не смог его найти.<br>Я бы не сидел и не рассказывал сказки,<br>Я бы не точил свое перо, называя его вином.<br><br>Беря радость от твоей весны,<br>Мастер Олимджон прославился,<br>Гордость, которую чувствовал Гафур Гулям<br>Можно превратить в поэму для всего мира.<br>Далекая история - мой шаг,<br>Узбекистан, моя родина.<br><br>Твое прошлое действительно очень длинное,<br>Мои глаза не могут охватить его все.<br>Я бы не хвалил прошлое, однако<br>Я думаю о твоем прошлом на мгновение.<br><br>Завоевывая широкую Азию,<br>Появился гордый, победоносный человек,<br>Два с половиной века<br>Великий Завоеватель сотрясал мир.<br>Я скажу, сегодня, он мой, мой.<br>Узбекистан, моя родина."
    },
    'liked_question': { en: "Did you like it?", uz: "Yoqdimi?", ru: "Вам понравилось?" },
    'liked_answer': { en: "Liked!", uz: "Yoqdi!", ru: "Понравилось!" }
};

let scriptContent = fs.readFileSync('script.js', 'utf8');

// Use innerHTML instead of textContent
scriptContent = scriptContent.replace(/element\.textContent = translations\[lang\]\[key\];/g, 'element.innerHTML = translations[lang][key];');

let enStr = "";
let uzStr = "";
let ruStr = "";

Object.keys(pData).forEach(key => {
    enStr += `            '${key}': \`${pData[key].en}\`,\n`;
    uzStr += `            '${key}': \`${pData[key].uz}\`,\n`;
    ruStr += `            '${key}': \`${pData[key].ru}\`,\n`;
});

// Since the translation object was heavily modified previously, we insert differently.
// Let's insert before "g1_v1_title" block, which is safe.
scriptContent = scriptContent.replace(/'g1_v1_title'/g, `${enStr}            'g1_v1_title'`);
// Wait, 'g1_v1_title' appears for EN, UZ, RU. Let's do it per language.
// Actually, it's safer to just replace 'g1_v1_title' once across the file?
let parts = scriptContent.split("'g1_v1_title'");
if (parts.length === 4) {
    scriptContent = parts[0] + enStr + "'g1_v1_title'" + parts[1] + uzStr + "'g1_v1_title'" + parts[2] + ruStr + "'g1_v1_title'" + parts[3];
    fs.writeFileSync('script.js', scriptContent);
    console.log('Successfully injected poem translations to script.js');
} else {
    console.error('Failed to split translations correctly');
}

// Ensure the button JS uses Translations instead.
// Wait! Instead of hardcoding "Yoqdi!" in JS, I'll modify poems.html separately.
