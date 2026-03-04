const questions = [
    // Mathematics
    {
        type: "text",
        text_en: "How is child's food prepared?\nURL:",
        text_uz: "Bolani ovqatini qanday qilinadi?\nURL:",
        text_ru: "Как готовится детское питание?\nURL:",
        correct: null
    },
    {
        text_en: "Which shape has 3 sides?",
        text_uz: "Qaysi shaklning 3 ta tomoni bor?",
        text_ru: "У какой фигуры 3 стороны?",
        options_en: ["Square", "Circle", "Triangle"],
        options_uz: ["Kvadrat", "Doira", "Uchburchak"],
        options_ru: ["Квадрат", "Круг", "Треугольник"],
        correct: 2
    },
    {
        text_en: "If you have 2 apples and eat 1, how many are left?",
        text_uz: "Sizda 2 ta olma bor edi, 1 tasini yeddingiz. Nechta qoldi?",
        text_ru: "У вас было 2 яблока, вы съели 1. Сколько осталось?",
        options_en: ["0", "1", "2"],
        options_uz: ["0", "1", "2"],
        options_ru: ["0", "1", "2"],
        correct: 1
    },
    {
        text_en: "What number comes after 3?",
        text_uz: "3 dan keyin qaysi son keladi?",
        text_ru: "Какое число идет после 3?",
        options_en: ["2", "4", "5"],
        options_uz: ["2", "4", "5"],
        options_ru: ["2", "4", "5"],
        correct: 1
    },
    {
        text_en: "Which is bigger: 8 or 2?",
        text_uz: "Qaysi biri katta: 8 yoki 2?",
        text_ru: "Что больше: 8 или 2?",
        options_en: ["8", "2", "They are same"],
        options_uz: ["8", "2", "Ikkalasi teng"],
        options_ru: ["8", "2", "Они одинаковые"],
        correct: 0
    },
    // Animals & Nature
    {
        text_en: "Which animal says 'Moo'?",
        text_uz: "Qaysi hayvon 'Moo' deydi?",
        text_ru: "Какое животное говорит 'Му'?",
        options_en: ["Cow", "Cat", "Dog"],
        options_uz: ["Sigir", "Mushuk", "Kuchuk"],
        options_ru: ["Корова", "Кошка", "Собака"],
        correct: 0
    },
    {
        text_en: "Where do fish live?",
        text_uz: "Baliqlar qayerda yashaydi?",
        text_ru: "Где живут рыбы?",
        options_en: ["Tree", "Water", "House"],
        options_uz: ["Daraxt", "Suv", "Uy"],
        options_ru: ["Дерево", "Вода", "Дом"],
        correct: 1
    },
    {
        text_en: "What color is the sun?",
        text_uz: "Quyosh rangi qanaqa?",
        text_ru: "Какого цвета солнце?",
        options_en: ["Blue", "Green", "Yellow"],
        options_uz: ["Ko'k", "Yashil", "Sariq"],
        options_ru: ["Синий", "Зеленый", "Желтый"],
        correct: 2
    },
    {
        text_en: "Which animal can fly?",
        text_uz: "Qaysi hayvon ucha oladi?",
        text_ru: "Какое животное умеет летать?",
        options_en: ["Bird", "Elephant", "Turtle"],
        options_uz: ["Qush", "Fil", "Toshbaqa"],
        options_ru: ["Птица", "Слон", "Черепаха"],
        correct: 0
    },
    {
        text_en: "What do bees make?",
        text_uz: "Asalarilar nima tayyorlaydi?",
        text_ru: "Что делают пчелы?",
        options_en: ["Milk", "Honey", "Bread"],
        options_uz: ["Sut", "Asal", "Non"],
        options_ru: ["Молоко", "Мед", "Хлеб"],
        correct: 1
    },
    // Logic & Shapes
    {
        text_en: "What comes next: Red, Blue, Red, ...?",
        text_uz: "Keyingisi nima: Qizil, Ko'k, Qizil, ...?",
        text_ru: "Что дальше: Красный, Синий, Красный, ...?",
        options_en: ["Green", "Blue", "Yellow"],
        options_uz: ["Yashil", "Ko'k", "Sariq"],
        options_ru: ["Зеленый", "Синий", "Желтый"],
        correct: 1
    },
    {
        text_en: "Which is different?",
        text_uz: "Qaysi biri boshqacha?",
        text_ru: "Что лишнее?",
        options_en: ["Apple", "Banana", "Car"],
        options_uz: ["Olma", "Banan", "Mashina"],
        options_ru: ["Яблоко", "Банан", "Машина"],
        correct: 2
    },
    {
        text_en: "Which is heavy?",
        text_uz: "Qaysi biri og'ir?",
        text_ru: "Что тяжелое?",
        options_en: ["Feather", "Rock", "Paper"],
        options_uz: ["Pat", "Tosh", "Qog'oz"],
        options_ru: ["Перо", "Камень", "Бумага"],
        correct: 1
    },
    {
        text_en: "When do we see the stars?",
        text_uz: "Biz yulduzlarni qachon ko'ramiz?",
        text_ru: "Когда мы видим звезды?",
        options_en: ["Morning", "Afternoon", "Night"],
        options_uz: ["Ertalab", "Abetda", "Kechasi"],
        options_ru: ["Утром", "Днем", "Ночью"],
        correct: 2
    },
    {
        text_en: "Which is round like a ball?",
        text_uz: "Qaysi biri to'p kabi yumaloq?",
        text_ru: "Что круглое как мяч?",
        options_en: ["Orange", "Box", "Book"],
        options_uz: ["Apelsin", "Quti", "Kitob"],
        options_ru: ["Апельсин", "Коробка", "Книга"],
        correct: 0
    },
    // More basic concepts...
    { text_en: "What color is grass?", text_uz: "O'tning rangi qanaqa?", text_ru: "Какого цвета трава?", options_en: ["Purple", "Green", "White"], options_uz: ["Siyohrang", "Yashil", "Oq"], options_ru: ["Фиолетовый", "Зеленый", "Белый"], correct: 1 },
    { text_en: "What do we use to see?", text_uz: "Ko'rish uchun nimadan foydalanamiz?", text_ru: "Чем мы смотрим?", options_en: ["Ears", "Eyes", "Nose"], options_uz: ["Quloq", "Ko'z", "Burun"], options_ru: ["Уши", "Глаза", "Нос"], correct: 1 },
    { text_en: "What do we wear on our feet?", text_uz: "Oyoqimizga nima kiyamiz?", text_ru: "Что мы носим на ногах?", options_en: ["Hat", "Shoes", "Gloves"], options_uz: ["Kepka", "Oyoq kiyim", "Qo'lqop"], options_ru: ["Шапка", "Обувь", "Перчатки"], correct: 1 },
    { text_en: "Which animal is very tall?", text_uz: "Qaysi hayvon juda baland?", text_ru: "Какое животное очень высокое?", options_en: ["Cat", "Mouse", "Giraffe"], options_uz: ["Mushuk", "Sichqon", "Jirafa"], options_ru: ["Кошка", "Мышь", "Жираф"], correct: 2 },
    { text_en: "What is ice made of?", text_uz: "Muz nimadan iborat?", text_ru: "Из чего сделан лед?", options_en: ["Milk", "Juice", "Water"], options_uz: ["Sut", "Sharbat", "Suv"], options_ru: ["Молоко", "Сок", "Вода"], correct: 2 },
    { text_en: "How many legs does a spider have?", text_uz: "O'rgimchakning nechta oyog'i bor?", text_ru: "Сколько ног у паука?", options_en: ["4", "6", "8"], options_uz: ["4", "6", "8"], options_ru: ["4", "6", "8"], correct: 2 },
    { text_en: "Which is hot?", text_uz: "Qaysi biri issiq?", text_ru: "Что горячее?", options_en: ["Ice cream", "Fire", "Snow"], options_uz: ["Muzqaymoq", "Olov", "Qor"], options_ru: ["Мороженое", "Огонь", "Снег"], correct: 1 },
    { text_en: "What do we use to cut paper?", text_uz: "Qog'ozni nima bilan kesamiz?", text_ru: "Чем мы режем бумагу?", options_en: ["Spoon", "Scissors", "Pencil"], options_uz: ["Qoshiq", "Qaychi", "Qalam"], options_ru: ["Ложка", "Ножницы", "Карандаш"], correct: 1 },
    { text_en: "Which fruit is yellow and long?", text_uz: "Qaysi meva sariq va uzun?", text_ru: "Какой фрукт желтый и длинный?", options_en: ["Banana", "Cherry", "Grapes"], options_uz: ["Banan", "Olcha", "Uzum"], options_ru: ["Банан", "Вишня", "Виноград"], correct: 0 },
    { text_en: "Where does the sun rise?", text_uz: "Quyosh qayerdan chiqadi?", text_ru: "Где встает солнце?", options_en: ["Sky", "Ground", "Forest"], options_uz: ["Osmon", "Yer", "O'rmon"], options_ru: ["Небо", "Земля", "Лес"], correct: 0 },
    { text_en: "Which animal lives in a bowl?", text_uz: "Qaysi hayvon idishda (akvariumda) yashaydi?", text_ru: "Какое животное живет в миске?", options_en: ["Lion", "Goldfish", "Bear"], options_uz: ["Sher", "Oltin baliq", "Ayiq"], options_ru: ["Лев", "Золотая рыбка", "Медведь"], correct: 1 },
    { text_en: "What color is an orange?", text_uz: "Apelsin rangi qanaqa?", text_ru: "Какого цвета апельсин?", options_en: ["Orange", "Pink", "Blue"], options_uz: ["Apelsin rang", "Pushti", "Ko'k"], options_ru: ["Оранжевый", "Розовый", "Синий"], correct: 0 },
    { text_en: "How many wheels does a bicycle have?", text_uz: "Velosipedning nechta g'ildiragi bor?", text_ru: "Сколько колес у велосипеда?", options_en: ["1", "2", "4"], options_uz: ["1", "2", "4"], options_ru: ["1", "2", "4"], correct: 1 },
    { text_en: "What do we do in a bed?", text_uz: "Karavotda nima qilamiz?", text_ru: "Что мы делаем в кровати?", options_en: ["Eat", "Sleep", "Run"], options_uz: ["Ovqatlanamiz", "Uxlaymiz", "Yuguramiz"], options_ru: ["Едим", "Спим", "Бегаем"], correct: 1 },
    { text_en: "Which is a vehicle?", text_uz: "Qaysi biri transport vositasi?", text_ru: "Что из этого транспорт?", options_en: ["Dog", "Bus", "Flower"], options_uz: ["It", "Avtobus", "Gul"], options_ru: ["Собака", "Автобус", "Цветок"], correct: 1 },
    { text_en: "What do trees have instead of arms?", text_uz: "Daraxtlarda qo'llar o'rniga nima bor?", text_ru: "Что у деревьев вместо рук?", options_en: ["Wings", "Branches", "Tail"], options_uz: ["Qanotlar", "Shoxlar", "Dum"], options_ru: ["Крылья", "Ветки", "Хвост"], correct: 1 },
    { text_en: "Which sweet do you lick?", text_uz: "Qaysi shirinlikni yalaymiz?", text_ru: "Какую сладость мы лижем?", options_en: ["Bread", "Lollipop", "Carrot"], options_uz: ["Non", "Xo'rozqand", "Sabzi"], options_ru: ["Хлеб", "Леденец", "Морковь"], correct: 1 },
    { text_en: "What is the color of the moon?", text_uz: "Oyning rangi qanaqa?", text_ru: "Какого цвета луна?", options_en: ["Green", "White/Silver", "Purple"], options_uz: ["Yashil", "Oq/Kumush", "Siyohrang"], options_ru: ["Зеленый", "Бело-серебристый", "Фиолетовый"], correct: 1 },
    { text_en: "Which animal hops and has long ears?", text_uz: "Qaysi hayvon sakraydi va uzun quloqlari bor?", text_ru: "Кто прыгает и имеет длинные уши?", options_en: ["Rabbit", "Turtle", "Snake"], options_uz: ["Quyon", "Toshbaqa", "Ilon"], options_ru: ["Кролик", "Черепаха", "Змея"], correct: 0 },
    { text_en: "Which one do we drink?", text_uz: "Qaysi birini ichamiz?", text_ru: "Что из этого мы пьем?", options_en: ["Cookie", "Milk", "Cake"], options_uz: ["Pechenye", "Sut", "Tort"], options_ru: ["Печенье", "Молоко", "Торт"], correct: 1 },
    { text_en: "How many months are in a year?", text_uz: "Bir yilda nechta oy bor?", text_ru: "Сколько месяцев в году?", options_en: ["10", "12", "7"], options_uz: ["10", "12", "7"], options_ru: ["10", "12", "7"], correct: 1 },
    { text_en: "What do we use to comb hair?", text_uz: "Sochni tarash uchun nimadan foydalanamiz?", text_ru: "Чем мы расчесываем волосы?", options_en: ["Comb", "Fork", "Brush (Paint)"], options_uz: ["Taroq", "Vilkka", "Mo'yqalam"], options_ru: ["Расческа", "Вилка", "Кисть"], correct: 0 },
    { text_en: "Which bird is national symbol of many countries?", text_uz: "Qaysi qush ko'plab davlatlarning milliy ramzi?", text_ru: "Какая птица является национальным символом?", options_en: ["Pigeon", "Eagle", "Chicken"], options_uz: ["Kabutar", "Burgut", "Tovuq"], options_ru: ["Голубь", "Орел", "Курица"], correct: 1 },
    { text_en: "What part of computer is for typing?", text_uz: "Kompyuterning qaysi qismi yozish uchun?", text_ru: "Какая часть компьютера для печати?", options_en: ["Mouse", "Keyboard", "Screen"], options_uz: ["Sichqoncha", "Klaviatura", "Ekran"], options_ru: ["Мышь", "Клавиатура", "Экран"], correct: 1 },
    { text_en: "Which is a primary color?", text_uz: "Qaysi biri asosiy rang?", text_ru: "Какой цвет основной?", options_en: ["Brown", "Red", "Grey"], options_uz: ["Jigarrang", "Qizil", "Kulrang"], options_ru: ["Коричневый", "Красный", "Серый"], correct: 1 },
    { text_en: "What do you call a baby cat?", text_uz: "Mushuk bolasi nima deyiladi?", text_ru: "Как называют котенка?", options_en: ["Puppy", "Kitten", "Calf"], options_uz: ["Kuchukcha", "Mushukcha", "Buzoqcha"], options_ru: ["Щенок", "Котенок", "Теленок"], correct: 1 },
    { text_en: "Where do we keep our food cold?", text_uz: "Ovqat qayerda sovuq tutiladi?", text_ru: "Где еда хранится в холоде?", options_en: ["Oven", "Fridge", "Table"], options_uz: ["Pech", "Muzlatgich", "Stol"], options_ru: ["Печь", "Холодильник", "Стол"], correct: 1 },
    { text_en: "What do flowers grow from?", text_uz: "Gullar nimadan o'sib chiqadi?", text_ru: "Из чего растут цветы?", options_en: ["Sand", "Seeds", "Rocks"], options_uz: ["Qum", "Urug'lar", "Toshlar"], options_ru: ["Песок", "Семена", "Камни"], correct: 1 },
    { text_en: "Which fruit has seeds on the outside?", text_uz: "Qaysi mevaning urug'lari tashqarisida?", text_ru: "У какой ягоды семена снаружи?", options_en: ["Apple", "Strawberry", "Watermelon"], options_uz: ["Olma", "Qulupnay", "Tarvuz"], options_ru: ["Яблоко", "Клубника", "Арбуз"], correct: 1 },
    { text_en: "What do you use an umbrella for?", text_uz: "Soyabon nimadan himoya qiladi?", text_ru: "Зачем нужен зонтик?", options_en: ["Eat", "Rain", "Sleep"], options_uz: ["Ovqat", "Yomg'ir", "Uyqu"], options_ru: ["Еда", "Дождь", "Сон"], correct: 1 },
    { text_en: "Which is a shape with 4 equal sides?", text_uz: "Qaysi shaklning 4 ta teng tomoni bor?", text_ru: "У какой фигуры 4 равные стороны?", options_en: ["Square", "Triangle", "Circle"], options_uz: ["Kvadrat", "Uchburchak", "Doira"], options_ru: ["Квадрат", "Треугольник", "Круг"], correct: 0 },
    { text_en: "What is 1 + 1?", text_uz: "1 + 1 nechaga teng?", text_ru: "Сколько будет 1 + 1?", options_en: ["1", "2", "3"], options_uz: ["1", "2", "3"], options_ru: ["1", "2", "3"], correct: 1 },
    { text_en: "Which animal has a trunk?", text_uz: "Qaysi hayvonning xartumi bor?", text_ru: "У какого животного есть хобот?", options_en: ["Tiger", "Elephant", "Monkey"], options_uz: ["Yo'lbars", "Fil", "Maymun"], options_ru: ["Тигр", "Слон", "Обезьяна"], correct: 1 },
    { text_en: "What color is a red fire truck?", text_uz: "Qizil o't o'chirish mashinasi qanaqa rangda?", text_ru: "Какого цвета красная пожарная машина?", options_en: ["Blue", "Red", "Yellow"], options_uz: ["Ko'k", "Qizil", "Sariq"], options_ru: ["Синий", "Красный", "Желтый"], correct: 1 },
    { text_en: "Congratulations, this is the last question! Are you ready?", text_uz: "Tabriklaymiz, bu oxirgi savol! Tayyormisiz?", text_ru: "Поздравляем, это последний вопрос! Вы готовы?", options_en: ["No", "Maybe", "Yes!"], options_uz: ["Yo'q", "Balki", "Ha!"], options_ru: ["Нет", "Может быть", "Да!"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsGridEl = document.getElementById('options-grid');
const textInputContainer = document.getElementById('text-input-container');
const questionTextarea = document.getElementById('question-textarea');
const progressBarEl = document.getElementById('progress-bar');
const remainingEl = document.getElementById('questions-remaining');
const nextBtn = document.getElementById('next-btn');
const testContent = document.getElementById('test-content');
const resultsContent = document.getElementById('results-content');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');

function getLang() {
    return localStorage.getItem('selectedLang') || 'uz';
}

function loadQuestion() {
    selectedOption = null;
    nextBtn.disabled = true;

    const lang = getLang();
    const q = questions[currentQuestion];

    questionNumberEl.textContent = `${translations[lang]['question']} ${currentQuestion + 1} / 50`;
    questionTextEl.innerHTML = q[`text_${lang}`].replace(/\n/g, '<br>');

    if (q.type === 'text') {
        optionsGridEl.style.display = 'none';
        textInputContainer.style.display = 'block';
        questionTextarea.value = '';

        // Update placeholder based on language
        const placeholders = {
            en: "Type your answer here...",
            uz: "Shu yerga yozing...",
            ru: "Напишите ваш ответ здесь..."
        };
        questionTextarea.placeholder = placeholders[lang] || placeholders.uz;

        questionTextarea.oninput = () => {
            nextBtn.disabled = questionTextarea.value.trim().length < 5;
        };
    } else {
        optionsGridEl.style.display = 'grid';
        textInputContainer.style.display = 'none';
        optionsGridEl.innerHTML = '';
        q[`options_${lang}`].forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-circle"></span> ${option}`;
            btn.onclick = () => selectOption(index, btn);
            optionsGridEl.appendChild(btn);
        });
    }

    const progress = ((currentQuestion) / 50) * 100;
    progressBarEl.style.width = `${progress}%`;
    remainingEl.textContent = `${50 - currentQuestion} questions remaining`;
}

function selectOption(index, btn) {
    selectedOption = index;
    nextBtn.disabled = false;

    const allBtns = optionsGridEl.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

nextBtn.onclick = () => {
    const q = questions[currentQuestion];
    if (q.type === 'text') {
        // For open-ended questions, we give points if they wrote something substantial
        if (questionTextarea.value.trim().length > 10) {
            score++;
        }
    } else {
        if (selectedOption === q.correct) {
            score++;
        }
    }

    currentQuestion++;

    if (currentQuestion < 50) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    testContent.style.display = 'none';
    resultsContent.style.display = 'block';
    progressBarEl.style.width = '100%';

    const lang = getLang();
    finalScoreEl.textContent = `${score} / 50`;

    if (score >= 40) {
        resultMessageEl.textContent = translations[lang]['result_message_excellent'];
        document.getElementById('get-cert-btn').style.display = 'block';
    } else if (score >= 25) {
        resultMessageEl.textContent = translations[lang]['result_message_good'];
        document.getElementById('get-cert-btn').style.display = 'none';
    } else {
        resultMessageEl.textContent = translations[lang]['result_message_retry'];
        document.getElementById('get-cert-btn').style.display = 'none';
    }
}

// Initial load
window.addEventListener('load', () => {
    // Wait for translations to be ready in script.js
    setTimeout(loadQuestion, 100);
});
