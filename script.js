const quizQuestions = [
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: "Canberra",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "N2"],
      correctAnswer: "H2O",
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "James Madison"],
      correctAnswer: "George Washington",
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What does 'CPU' stand for in the context of computers?",
      options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Core Processing Unit"],
      correctAnswer: "Central Processing Unit",
    },
  ];
  

let quizStart = false
let isTimeUp = false
let defaultTime = 30
let timing
let hasChosen = false
let isCorrectAns = false


const timeCounter = document.querySelector('.time-count')

function hide(classname, ShouldHide){
 const item = document.querySelector(`.${classname}`)
 item.style.left = ShouldHide? '-100%' : '0'
 quizStart = (classname === 'startQuiz' && ShouldHide)? true : !quizStart
 quizStart && (LoadQuesAndAnswers())
 
}
function timer(){
    clearInterval(timing)

    timing = setInterval(() => {
      defaultTime--
      if(defaultTime <= 0){
        defaultTime = 30
        LoadQuesAndAnswers()
      }
      range()
      timeCounter.textContent = defaultTime + 's'
    },1000)
}

let index = -1
function LoadQuesAndAnswers(){
    defaultTime = 30
    hasChosen = false
    checkAns()
    timer()
    index++
    (index > quizQuestions.length -1) && displayScoreBoard()
    const question = document.querySelector('.question')
    const options = document.querySelector('.options')
    let option
    question.textContent = quizQuestions[index].question
    options.innerHTML = ''

    for(let i = 0; i < quizQuestions[index].options.length; i++){
     option = document.createElement('button')
     option.className = 'option'
     option.textContent = quizQuestions[index].options[i]
     options.appendChild(option)
    }
    
    selectOption = document.querySelectorAll('.option')
    selectOption.forEach((option) =>{
        option.addEventListener('click', (e)=>{
            if(e.target.textContent === quizQuestions[index].correctAnswer){
                isCorrectAns = true
                e.target.classList.add('correct')
            }else{
                isCorrectAns = false
                e.target.classList.remove('correct')
                e.target.classList.add('wrong')
            }
            hasChosen = true
            checkAns()
        })
    })
    document.querySelector('.question-slide').textContent = `${index + 1}/5`
}
const nextBtn = document.querySelector('.next')
nextBtn.addEventListener('click', LoadQuesAndAnswers)

function displayScoreBoard(){
    clearInterval(timing)
    hide('score-board',false)
    let board = document.querySelector('.score-board')
    board.querySelector('.score').textContent = score + '%'
    board.querySelector('.correctOptions').textContent = 'had ' + ((correctOptions === 5)? 'All' : correctOptions) + ' questions correct'
}
let score = 0
let correctOptions = 0
function checkAns(){
    if(hasChosen){
        clearInterval(timing)
        nextBtn.style.visibility = 'visible'
        for(let i = 0; i < selectOption.length; i++){
            selectOption[i].disabled = true
        }
        if(isCorrectAns){
            score += 20
            correctOptions += 1
        }else{
            score = score
            correctOptions = correctOptions
        }
    }else{
        score = score
        nextBtn.style.visibility = 'hidden'
    }
      console.log(score)
}
function range(){
    let range = document.querySelector('.range')
    let RngeWidth = (defaultTime/30) * 100
    range.style.width = RngeWidth + '%'

    if(RngeWidth <= 70 && RngeWidth > 35) {
        range.style.backgroundColor = 'yellowgreen'
    }else if(RngeWidth <= 35){
        range.style.backgroundColor = 'red' 
    }else{
        range.style.backgroundColor = 'green'
    }
}

document.querySelector('.restart').addEventListener('click', () => location.reload())