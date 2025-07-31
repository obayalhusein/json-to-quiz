let questions = [];
let currentIndex = 0;

document.getElementById('jsonFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            questions = JSON.parse(e.target.result);
            currentIndex = 0;
            showQuestion(); // Change this 
        } catch (err) {
            alert("خطأ في ملف JSON");
        }
    };
    reader.readAsText(file);
});

/* remove the code bellow this line if you wanna make it dynamic */
function showQuestion() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';

    if (currentIndex >= questions.length) {
        container.innerHTML = `<div class="alert alert-success text-center">انتهى الاختبار 🎉</div>`;
        return;
    }

    const q = questions[currentIndex];
    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const questionTitle = document.createElement('h5');
    questionTitle.className = 'card-title mb-3';
    questionTitle.textContent = `السؤال ${currentIndex + 1}: ${q.q}`;
    cardBody.appendChild(questionTitle);

    q.a.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary d-block w-100 text-start mb-2';
        btn.textContent = answer.option;
        btn.onclick = () => handleAnswer(btn, answer.correct);
        cardBody.appendChild(btn);
    });

    container.appendChild(card);
    card.appendChild(cardBody);
}

function handleAnswer(button, isCorrect) {
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-success');
    } else {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-danger');

        // Highlight correct answer
        const answers = questions[currentIndex].a;
        answers.forEach((a, idx) => {
            if (a.correct) {
                const correctBtn = button.parentElement.querySelectorAll('button')[idx];
                correctBtn.classList.remove('btn-outline-primary');
                correctBtn.classList.add('btn-success');
            }
        });
    }

    // Next question button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary mt-3';
    nextBtn.textContent = 'السؤال التالي';
    nextBtn.onclick = () => {
        currentIndex++;
        showQuestion();
    };
    button.parentElement.appendChild(nextBtn);
}