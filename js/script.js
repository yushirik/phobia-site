/* --- Гамбургер меню --- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('nav--open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Закрыть меню при клике на ссылку */
    nav.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('nav--open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* --- Мини-тест --- */
const questions = [
    {
        text: 'Чувствуете ли вы себя спокойно в помещении полном людей?',
        yesScore: 0,
        noScore: 1
    },
    {
        text: 'Испытываете ли вы тревогу в замкнутых пространствах?',
        yesScore: 1,
        noScore: 0
    },
    {
        text: 'Беспокоит ли вас мысль о полёте на самолёте?',
        yesScore: 1,
        noScore: 0
    },
    {
        text: 'Комфортно ли вам находиться на большой высоте?',
        yesScore: 0,
        noScore: 1
    },
    {
        text: 'Пугает ли вас темнота когда вы одни?',
        yesScore: 1,
        noScore: 0
    }
];

const results = [
    {
        min: 0,
        max: 1,
        text: 'Похоже у вас нет выраженных фобий. Продолжайте жить уверенно!'
    },
    {
        min: 2,
        max: 3,
        text: 'Есть признаки лёгкой тревожности. Попробуйте дыхательные техники.'
    },
    {
        min: 4,
        max: 5,
        text: 'Возможно у вас есть фобия. Рекомендуем обратиться к психологу.'
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('test-question');
const progressFill = document.getElementById('progress-fill');
const testResult = document.getElementById('test-result');
const testButtons = document.getElementById('test-buttons');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

/* Обновить прогресс бар */
function updateProgress() {
    if (progressFill) {
        const percent = (currentQuestion / questions.length) * 100;
        progressFill.style.width = percent + '%';
    }
}

/* Показать результат */
function showResult() {
    if (progressFill) progressFill.style.width = '100%';

    let resultText = results[results.length - 1].text;
    for (let i = 0; i < results.length; i++) {
        if (score >= results[i].min && score <= results[i].max) {
            resultText = results[i].text;
            break;
        }
    }

    if (questionEl) questionEl.style.display = 'none';
    if (testButtons) testButtons.style.display = 'none';

    if (testResult) {
        testResult.style.display = 'block';
        testResult.textContent = resultText;
    }
}

/* Обработать ответ */
function handleAnswer(answer) {
    if (currentQuestion >= questions.length) return;

    const q = questions[currentQuestion];
    score += answer === 'yes' ? q.yesScore : q.noScore;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        if (questionEl) questionEl.textContent = questions[currentQuestion].text;
        updateProgress();
    } else {
        showResult();
    }
}

if (btnYes) {
    btnYes.addEventListener('click', function () {
        handleAnswer('yes');
    });
}

if (btnNo) {
    btnNo.addEventListener('click', function () {
        handleAnswer('no');
    });
}

/* Инициализация теста */
if (questionEl && questions.length > 0) {
    questionEl.textContent = questions[0].text;
    updateProgress();
}

/* --- FAQ аккордеон --- */
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(function (item) {
    const question = item.querySelector('.faq__question');

    if (question) {
        question.addEventListener('click', function () {
            const isOpen = item.classList.contains('faq__item--open');

            /* Закрыть все */
            faqItems.forEach(function (i) {
                i.classList.remove('faq__item--open');
                const q = i.querySelector('.faq__question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            /* Открыть текущий если был закрыт */
            if (!isOpen) {
                item.classList.add('faq__item--open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    }
});
