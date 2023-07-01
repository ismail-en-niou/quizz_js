const question = [
    {
        question :" How can you change the text content of an HTML element using JavaScript and the DOM?",
        answers : [ 
            { text : "element.innerHTML = 'New text'" , correct : false},
            { text : "element.textContent = 'New text'" , correct : false},
            { text : "element.innerText = 'New text'" , correct : false},
            { text : " All of the above." , correct : true}
        ]
    },
    {
        question :" const x = 5; type of data ? ",
        answers : [ 
            { text : "number" , correct : true},
            { text : "object" , correct : false},
            { text : "function" , correct : false},
            { text : "string" , correct : false}
        ]
    },
    {
        question :" const x = function great(){ console.log('hello')};                  type of great ? ",
        answers : [ 
            { text : "function" , correct : true},
            { text : "number" , correct : false},
            { text : "string" , correct : false},
            { text : "object" , correct : false}
        ]
    },
    {
        question :" How can you access an HTML element with the id 'myElement' using JavaScript and the DOM?",
        answers : [ 
            { text : "getElement('myElement');" , correct : false},
            { text : "document.getElementByClass('myElement');" , correct : false},
            { text : "document.getElementById('myElement');" , correct : true},
            { text : "querySelector('#myElement')" , correct :false}
        ]
    },
    {
        question :" Which DOM method is used to create a new HTML element dynamically using JavaScript? ",
        answers : [ 
            { text : "createElement()" , correct : false},
            { text : "appendElement()" , correct : false},
            { text : "createNode()" , correct : true},
            { text : "appendChild()" , correct : false}
        ]
    },

    {
        question :"How can you add a CSS class 'highlight' to an HTML element with JavaScript and the DOM? ",
        answers : [  
            { text : "element.addClass('highlight')" , correct : false},
            { text : "element.className = 'highlight'" , correct : false},
            { text : "element.setAttribute('class', 'highlight')" , correct : true},
            { text : "element.addStyle('highlight')" , correct : false}
        ]
    },
    {
        question :"Which type of loop in JavaScript will execute the code block at least once, even if the condition is initially false? ",
        answers : [  
            { text : "for loop" , correct : false},
            { text : "while loop" , correct : false},
            { text : "do...while loop" , correct : true},
            { text : "foreach loop" , correct : false}
        ]
    },
    {
        question :"Which loop allows you to iterate over the properties of an object in JavaScript? ",
        answers : [  
            { text : "for loop" , correct : false},
            { text : "while loop" , correct : false},
            { text : "do...while loop" , correct : false},
            { text : "for...in loop" , correct : true}
        ]
    },
    {
        question :"Which BOM object provides information about the browser's history ?",
        answers : [  
            { text : "window" , correct : false},
            { text : "document" , correct : false},
            { text : "location" , correct : false},
            { text : "history" , correct : true}
        ]
    },
    {
        question :"How can you open a new browser window using JavaScript?",
        answers : [  
            { text : "window.open('https://www.example.com');'" , correct : true},
            { text : "window.newWindow('https://www.example.com');" , correct : false},
            { text : "window.createWindow('https://www.example.com')" , correct : false},
            { text : "window.openWindow('https://www.example.com')" , correct : false}
        ]
    },
]
const questionsElements = document.getElementById("quetion");
const answerbutton = document.getElementById("answre-button");
const nextbotton = document.getElementById("next-btn");

let quetionIndex = 0 ;
let score = 0;

function starQuizz(){
    questionIndex = 0;
    score = 0 ;
    nextbotton.innerHTML = "Next"
    showquestions()    
}


function  showquestions() {
     resetState()
    let currentQuestion = question[quetionIndex] ;
    let questionNo = quetionIndex + 1;
    questionsElements.innerHTML= questionNo + ". " + currentQuestion.question ; 

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("BUTTON");
        button.innerHTML = answers.text
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answers.correct)
        {
            button.dataset.correct = answers.correct ;
        }
        button.addEventListener("click" , selectAnswer) 
    })
}

function resetState(){
    nextbotton.style.display="none"
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.lastChild)
    }
}


function  selectAnswer(e){
    const selectedbtn = e.target 
    const iscorect = selectedbtn.dataset.correct === "true" ;
    if(iscorect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answerbutton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextbotton.style.display = "block"
}


function  showScore() {
    resetState();
    questionsElements.innerHTML= `you scored ${score} out of ${question.length} !`;
    nextbotton.innerHTML = "Play Again ";
    nextbotton.style.display = "block"
    nextbotton.onclick = function rest (){
        location.reload();
    }
}




function handleNextButton(){
    quetionIndex++;
    if(quetionIndex < question.length)
    {
        showquestions();
    }else
    {
        showScore();
    }
}

nextbotton.addEventListener("click" , ()=>{
    if(quetionIndex <  question.length){
        handleNextButton();
    }else{
        starQuizz();
    }
})




starQuizz();
