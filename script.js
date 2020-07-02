const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerButtons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    
})


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
   
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) { 
            button.dataset.correct = answer.correct
              
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild) 
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    const wrong = selectedButton.dataset.wrong

   if (correct) {
       increaseScore()
    setStatusClass(document.body,correct) 
   } else {
    setStatusClass(document.body,wrong) 
   }
    
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct) 
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }
}

function increaseScore(){
    console.log('score increase', score)
    return displayScore.innerHTML = ++score 
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "What is question #1",
        answers: [
            { text: 'A', correct: true},
            { text: 'B', correct: false},
            { text: 'C', correct: false},
            { text: 'D', correct: false}
        ]
    },
    {
        question: "What is question #2",
        answers: [
            { text: 'A', correct: true},
            { text: 'B', correct: false},
            { text: 'C', correct: false},
            { text: 'D', correct: false}
        ]
    },
    {
        question: "What is question #3",
        answers: [
            { text: 'A', correct: true},
            { text: 'B', correct: false},
            { text: 'C', correct: false},
            { text: 'D', correct: false}
        ]
    },
    {
        question: "What is question #4",
        answers: [
            { text: 'A', correct: true},
            { text: 'B', correct: false},
            { text: 'C', correct: false},
            { text: 'D', correct: false}
        ]
    },
    {
        question: "What is question #5",
        answers: [
            { text: 'A', correct: true},
            { text: 'B', correct: false},
            { text: 'C', correct: false},
            { text: 'D', correct: false}
        ]
    }

]
var score = 0;
var displayScore = document.querySelector('.score')
displayScore.innerHTML = "Score: " + score; 


var displayUsername = document.querySelector('.Username')
displayUsername.innerHTML = "User name: " + new URL(document.location).searchParams.get("fname"); 

// function showUsername(){
//     console.log("show userName")
//     return displayUsername.innerHTML = ("fname");
// }
     