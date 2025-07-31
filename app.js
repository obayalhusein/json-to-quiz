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
            showQuestion(); // Change this if you want to customize display
        } catch (err) {
            alert("Error in JSON file");
        }
    };
    reader.readAsText(file);
});

/* remove the code below this line if you want to make it dynamic */
function showQuestion() {
    const hideOnUpload = document.getElementById('hide-on-upload');
    if (hideOnUpload) {
        hideOnUpload.style.display = 'none';
    }
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';

    if (currentIndex >= questions.length) {
        container.innerHTML = `<div class="alert alert-success text-center">Quiz Completed 🎉</div>`;
        return;
    }

    const q = questions[currentIndex];
    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const questionTitle = document.createElement('h5');
    questionTitle.className = 'card-title mb-3';
    questionTitle.textContent = `Question ${currentIndex + 1}: ${q.q}`;
    cardBody.appendChild(questionTitle);

    q.a.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary d-block w-100 text-end mb-2';
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

        // Highlight the correct answer
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
    nextBtn.textContent = 'Next Question';
    nextBtn.onclick = () => {
        currentIndex++;
        showQuestion();
    };
    button.parentElement.appendChild(nextBtn);
}
