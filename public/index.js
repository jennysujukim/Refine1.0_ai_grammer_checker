const contentForm = document.querySelector('.content-form');
const resultContainer = document.querySelector('.result-container');
const noResult = document.querySelector('.result-none');
const isPending = document.querySelector('.loading');


contentForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    noResult.classList.add('deactive');
    isPending.classList.add('active');

    let question  = e.target.elements.content.value;
    formatQuestion(question);

    resultContainer.scrollTop = resultContainer.scrollHeight;

    fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: contentForm.content.value })
    })
    .then(
        response => response.json()
    )
    .then((data) => {
        formatAnswer(data.answer);
    })
    .catch((error) => {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add(error);
        errorMsg.innerText = 'Error occured while fetching data. Please refresh.';

        resultContainer.appendChild(errorMsg);
    })
    .finally(
        () => {
            e.target.elements.content.value = '';
            isPending.classList.remove('active');
            resultContainer.scrollTop = resultContainer.scrollHeight;
        }
    )
});


// --- Format to show answer from ai --- //
const formatAnswer = (answer) => {
    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-ai');

    const txtContainer = document.createElement('div');
    txtContainer.classList.add('answer-txt-container');

    const answerText = document.createElement('p');
    answerText.classList.add('answer-text');
    answerText.innerText = answer;

    txtContainer.appendChild(answerText);
    answerContainer.appendChild(txtContainer);
    resultContainer.appendChild(answerContainer);
}

// --- Format to show question from user --- //
const formatQuestion = (question) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-user');

    const txtContainer = document.createElement('div');
    txtContainer.classList.add('question-txt-container');

    const questionText = document.createElement('p');
    questionText.innerText = question;

    txtContainer.appendChild(questionText);
    questionContainer.appendChild(txtContainer);
    resultContainer.appendChild(questionContainer);
}

