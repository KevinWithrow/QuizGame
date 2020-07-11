data = "hello"

window.onload = sendApiRequest


const startButton = document.getElementById('startBtn')
const nextButton = document.getElementById('nextBtn')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerButtons')
let shuffledQuestions, currentQuestionIndex
var questionData = []
var score = 0;
var displayScore = document.querySelector('.score')
displayScore.innerHTML =  "Score: " + score;

var displayUsername = document.querySelector('.Username')
displayUsername.innerHTML = "User name: " + new URL(document.location).searchParams.get("fname");


async function sendApiRequest(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://opentdb.com/api.php?amount=10&category=17&type=multiple', true);

  request.onload = function() {

    if (this.status >= 200 && this.status < 400) {

      response_json = JSON.parse(this.response); 
      data = response_json.results
      useApiData(data)
      console.log("test")
      console.log(data)

    } else {
      // We reached our target server, but it returned an error
      console.log("error")
    }

  };

  request.send();
    //let response = await fetch(`https://opentdb.com/api.php?amount=10&category=17&type=multiple`);
    //let data = await response.json()
}

// ---------------------------------------Pull API data in----------------------------------
function useApiData(data) {
document.querySelector("#question").innerHTML = `${data[0].question}`
document.querySelector("#answer1").innerHTML = data[0].correct_answer
document.querySelector("#answer2").innerHTML = data[0].incorrect_answers[0]
document.querySelector("#answer3").innerHTML = data[0].incorrect_answers[1]
document.querySelector("#answer4").innerHTML = data[0].incorrect_answers[2]
}
// ---------------------------------------correct answer chosen----------------------------------
let correctButton = document.querySelector("#answer1")
correctButton.addEventListener("click",(e)=>{
    selectAnswer(e)
    //  sendApiRequest()
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
    // shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    // setNextQuestion()

}
// ---------------------------------------bring in next question and hide Next btn----------------------------------
function setNextQuestion() {
    resetState()
    showQuestion(questionData[currentQuestionIndex])


}

// ---------------------------------------bring in answers for each button, if correct bring in CORRECT CSS---------------------------------
function showQuestion(question) {
    console.log(question)
    questionElement.innerText = question.question
    question.incorrect_answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer
        button.classList.add('btn')
        if (answer.correct) {
            alert('otest')
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

    const button = document.createElement('button')
    button.innerText = question.correct_answer
    button.classList.add('btn')
/*    if (answer.correct) {
        alert('otest')
        button.dataset.correct = answer.correct
    }*/
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)


}

// ---------------------------------------show score and Restart button if all 5 questions have been answered---------------------------------
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    // TODO - we cant use innertext of start to determine if its time to reset score
    if (startButton.innerText ===  'Next') {
        score = 0;
        displayScore.innerHTML = "Score: " + score;
    }
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

// ---------------------------------------show CORRECT/WRONG CSS for each answer and increment score--------------------------------
function selectAnswer(e) {

    questionData = data
    const selectedButton = e.target
    console.log(selectedButton)
    const correct = questionData[currentQuestionIndex].correct_answer
    const wrong = questionData[currentQuestionIndex].incorrect_answers
   if (correct) {
        // TODO - dont let people push over and over and over
       increaseScore()
    setStatusClass(document.body,correct)
    console.log("correct!")
   } else {
    setStatusClass(document.body,wrong)
    console.log("wrong!")
   }


    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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
    // {
    //     question: questionData.results[0].question,
    //     answers: [
    //         `${questionData.results[0].correct_answer }` === true ,
    //         `${questionData.results[0].incorrect_answers[0] }` === false,
    //         `${questionData.results[0].incorrect_answers[1] }` === false,
    //         `${questionData.results[0].incorrect_answers[2] }` === false
    //     ]
    // },
    // {
    //     question: questionData.results[0].question,
    //     answers: [
    //         `${questionData.results[0].correct_answer }` === true ,
    //         `${questionData.results[0].incorrect_answers[0] }` === false,
    //         `${questionData.results[0].incorrect_answers[1] }` === false,
    //         `${questionData.results[0].incorrect_answers[2] }` === false
    //     ]
    // },
    // {
    //     question: questionData.results[0].question,
    //     answers: [
    //         `${questionData.results[0].correct_answer }` === true ,
    //         `${questionData.results[0].incorrect_answers[0] }` === false,
    //         `${questionData.results[0].incorrect_answers[1] }` === false,
    //         `${questionData.results[0].incorrect_answers[2] }` === false
    //     ]
    // },
    // {
    //     question: questionData.results[0].question,
    //     answers: [
    //         `${questionData.results[0].correct_answer }` === true ,
    //         console.log(questionData)
    //         `${questionData.results[0].incorrect_answers[0] }` === false,
    //         `${questionData.results[0].incorrect_answers[1] }` === false,
    //         `${questionData.results[0].incorrect_answers[2] }` === false
    //     ]
    // }

]





// function showUsername(){
//     console.log("show userName")
//     return displayUsername.innerHTML = ("fname");
}