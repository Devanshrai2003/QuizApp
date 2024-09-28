const startButton = document.querySelector(".take-quiz")
const content = document.querySelector(".main-content")
const quizScreen = document.querySelector(".quiz-screen")
const heading = document.querySelector(".heading")
let questionNumber = 0;
let score = 0;



startButton.addEventListener("click",() => startQuiz())

function startQuiz(){
    startButton.disabled = true;
    startButton.classList.add("hidden");
    heading.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    const answerBox = document.createElement("div");
    answerBox.classList.add("answer-box");

    const questionBox = document.createElement("div");
    questionBox.classList.add("question-box");
    
    appendQuestion(questionBox, answerBox)

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.classList.add("button");

    submitButton.innerHTML = "Submit";
    submitButton.addEventListener("click",() => checkAnswer(questionBox, answerBox));

    const endQuizButton = document.createElement("button");
    endQuizButton.classList.add("end-button");
    endQuizButton.classList.add("button");
    endQuizButton.innerHTML = "End Quiz";
    endQuizButton.addEventListener("click",() => endQuiz())

    quizScreen.appendChild(questionBox);
    quizScreen.appendChild(answerBox);
    quizScreen.appendChild(submitButton)
    quizScreen.after(endQuizButton)
}



function appendQuestion(questionBox, answerBox){

    questionBox.innerHTML = quizData[questionNumber].question;

    quizData[questionNumber].options.forEach((optionText, index) => {
        const optionBox = document.createElement("div");
        optionBox.classList.add("option-box");

        const selectButton = document.createElement("input");
        selectButton.type = "radio";
        selectButton.name = "option";
        selectButton.id = `option${index}`;

        const option = document.createElement("label");
        option.htmlFor = selectButton.id;
        option.innerHTML = optionText
        
        optionBox.appendChild(selectButton);
        optionBox.appendChild(option);
        answerBox.appendChild(optionBox)
      });
}



function checkAnswer(questionBox, answerBox){
    const choice = document.querySelector(`input[name="option"]:checked`);
    if(choice == null){
        alert("please choose one of the following options")
    }else{
    const selectedAnswer = document.querySelector(`label[for="${choice.id}"]`).innerHTML;
    const correctAnswer = quizData[questionNumber].correct;
    if(selectedAnswer === correctAnswer){
        score++
        nextQuestion(questionBox, answerBox);
    }else{
        nextQuestion(questionBox, answerBox);
    }
  }
}



function nextQuestion(questionBox, answerBox){
    if(questionNumber < quizData.length -1){
    questionBox.innerHTML = "";
    answerBox.innerHTML = "";
    
    questionNumber++;

    appendQuestion(questionBox, answerBox)
    }else{
        endQuiz(questionBox, answerBox);
    }
}



function endQuiz(questionBox, answerBox){

    const submitButton = document.querySelector(".submit-button");
    const endQuizButton = document.querySelector(".end-button");

    questionBox.classList.add("hidden");
    answerBox.classList.add("hidden");
   
    submitButton.remove();
    endQuizButton.remove();

    const resultBox = document.createElement("div");
    resultBox.classList.add("result-box");
    resultBox.innerHTML = `Score: ${score}/${quizData.length}`;

    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.classList.add("button");
    backButton.innerHTML = "Back To Menu";

    backButton.addEventListener("click",() => reset())

    quizScreen.appendChild(resultBox);
    quizScreen.appendChild(backButton);
}



function reset(){
    const resultBox = document.querySelector(".result-box");
    const backButton = document.querySelector(".back-button");
    
    startButton.classList.remove("hidden");
    heading.classList.remove("hidden");
    
    quizScreen.classList.add("hidden");
    
    backButton.remove();
    resultBox.remove();

    startButton.disabled = false;
    questionNumber = 0
    score = 0
}