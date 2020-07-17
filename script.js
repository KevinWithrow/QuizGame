
let data = []

window.onload = sendApiRequest



const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerButtons')
const answerBtnArray = [document.getElementById('answer1'),
                        document.getElementById('answer2'),
                        document.getElementById('answer3'),
                        document.getElementById('answer4')]

let shuffledQuestions, currentQuestionIndex
var questionData = []
var score = 0;
var displayScore = document.querySelector('.score')
displayScore.innerHTML =  "Score: " + score;

var displayUsername = document.querySelector('.Username')
displayUsername.innerHTML = "User name: " + new URL(document.location).searchParams.get("fname");

function refreshPage(){
    window.location.reload();
} 


async function sendApiRequest(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://opentdb.com/api.php?amount=4&category=17&difficulty=easy&type=multiple&encode=base64', true);

  request.onload = function() {

    if (this.status >= 200 && this.status < 400) {

      response_json = JSON.parse(this.response); 
      data = response_json.results
      data = removeEncoding(data)
      useApiData(data)
      console.log("test")
      console.log(data)

    } else {
      console.log("error")
    }

  };

  request.send();

}

// ---------------------------------------Pull API data in----------------------------------

function removeBase64Encoding(answer) {
    const newAnswer = {
        category: window.atob(answer.category),
        correct_answer: window.atob(answer.correct_answer),
        difficulty: window.atob(answer.difficulty),
        question: window.atob(answer.question),
        type: window.atob(answer.type),
        incorrect_answers: answer.incorrect_answers.map(window.atob)
    }
    return newAnswer
}

function removeEncoding(encodedAnswers) {

   const newData = encodedAnswers.map(removeBase64Encoding)
    return newData
    
}


function useApiData(data) {
document.querySelector("#question").innerHTML = `${data[0].question.replace(/&amp;/g, '&')}`
document.querySelector("#answer1").innerHTML = data[0].correct_answer
document.querySelector("#answer2").innerHTML = data[0].incorrect_answers[0]
document.querySelector("#answer3").innerHTML = data[0].incorrect_answers[1]
document.querySelector("#answer4").innerHTML = data[0].incorrect_answers[2]
}
// ---------------------------------------correct answer chosen----------------------------------


answerBtnArray.forEach(button => {
    button.addEventListener("click",(e)=>{
        selectAnswer(e)
       
    })
})
// ---------------------------------------start game when START btn is clicked---------------------------------
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    console.log('next button was pressed')
    currentQuestionIndex++
    setNextQuestion()
})

// ---------------------------------------Hide start btn and begin game----------------------------------
function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')


}
// ---------------------------------------bring in next question and hide Next btn----------------------------------
function setNextQuestion() {
    resetState()
    showQuestion(questionData[currentQuestionIndex])
    enableAnswerButtons()


}
function revealCorrectAnswerColor(correctAnswerString) {
    answerBtnArray.forEach(button => {
        if (button.innerHTML === correctAnswerString){
            button.classList.add('correct')
        }else {
            button.classList.add('wrong')
        }
    })
}

function resetBtnColor() {
    answerBtnArray.forEach(button =>{  
        button.classList.remove('wrong') 
        button.classList.remove('correct')        
    })

}

function fillButton(buttonArray, answerString) {
    const randomIndex = Math.floor(Math.random() * buttonArray.length)
    buttonArray[randomIndex].innerHTML = answerString 
    buttonArray.splice(randomIndex, 1)
}
// ---------------------------------------bring in answers for each button, if correct bring in CORRECT CSS---------------------------------
function showQuestion(question) {
    console.log(question)
    questionElement.innerText = question.question
    const buttonArray = [document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3'),
    document.getElementById('answer4')]
    fillButton(buttonArray, question.correct_answer)
    while (buttonArray.length > 0) {
        const incorrectAnswer = question.incorrect_answers.shift()
        fillButton(buttonArray, incorrectAnswer)
    }

    // answerBtnArray[0].innerHTML = question.correct_answer
    // answerBtnArray[1].innerHTML = question.incorrect_answers[0]
    // answerBtnArray[2].innerHTML = question.incorrect_answers[1]
    // answerBtnArray[3].innerHTML = question.incorrect_answers[2]
    resetBtnColor()
  
}

// ---------------------------------------show score and Restart button if all questions have been answered---------------------------------
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    if (startButton.innerText ===  '') {
        score = 0;
        displayScore.innerHTML = "Score: " + score;
    }
}
function disableAnswerButtons() {
    document.querySelector("#answer1").disabled = true
    document.querySelector("#answer2").disabled = true
    document.querySelector("#answer3").disabled = true
    document.querySelector("#answer4").disabled = true
}
function enableAnswerButtons() {
    document.querySelector("#answer1").disabled = false
    document.querySelector("#answer2").disabled = false
    document.querySelector("#answer3").disabled = false
    document.querySelector("#answer4").disabled = false
}
// ---------------------------------------show CORRECT/WRONG CSS for each answer and increment score--------------------------------
function selectAnswer(e) {

    questionData = data
    const selectedButton = e.target
    console.log(selectedButton)
    const correct = questionData[currentQuestionIndex].correct_answer
    disableAnswerButtons()
   if (correct === selectedButton.innerHTML) {
       increaseScore()
    setStatusClass(document.body,correct)
    console.log("correct!")
   } 

   revealCorrectAnswerColor(correct)

    if (shuffledQuestions > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        nextButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }
}

function increaseScore(){
    
    console.log('score increase', score)
    return displayScore.innerHTML = "Score: " + ++score
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
console.log(questionData)
    function loadQuestions() {[
    {
        question: questionData.results[0].question,
        answers: [
            `${questionData.results[0].correct_answer }` === true ,
            `${questionData.results[0].incorrect_answers[0] }` === false,
            `${questionData.results[0].incorrect_answers[1] }` === false,
            `${questionData.results[0].incorrect_answers[2] }` === false
        ]
    },

]

}