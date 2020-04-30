// DOM elements
const START_SCREEN = document.getElementById("main-screen");
const START_BUTTON = document.querySelector(".start-button");

const REMEMBER_SECTION = document.getElementById("remember");
const NUMBER_TO_REMEMBER = document.querySelector(".number-to-remember")

const ANSWER_SECTION = document.getElementById("answer");
const INPUT = document.querySelector(".input");
const ANSWER_BUTTON = document.querySelector(".answer-button");

const SUMMARY_SECTION = document.getElementById("summary");
const NUMBER_OVERVIEW = document.querySelector(".number-to-remember-overview");
const YOUR_ANSWER = document.querySelector(".your-answer");
const LEVEL = document.querySelector(".level");
const SUMMARY_BUTTON = document.querySelector(".summary-button");


const randomNumber= (len) => {
    // generates random rumber
    let number = []
    for (let i=0; number.length<len; i++) {

        const randomNumber = Math.floor(Math.random() * 9);
        if (i===0 && randomNumber ===0) {
            continue
        }
        number.push(randomNumber)
    }
    return number.join("")
}


const rememberWindow = (number) => {
    // changes bg to red
    console.log("clicked")
    NUMBER_TO_REMEMBER.textContent = number;
    START_SCREEN.style.display = "none";
    REMEMBER_SECTION.style.display = "flex";
    return new Promise(resolve => {
        setTimeout(() => {
            REMEMBER_SECTION.style.display = "none";
            resolve("guess now")
        },3000)
    })
};


const getAnswer = () => {
    return INPUT.value
}

const answerWindow = (number) =>{

    return new Promise((resolve, reject) => {
        // REMEMBER_SECTION.style.display = "none";
        ANSWER_SECTION.style.display = "flex";
        INPUT.value = ""
        ANSWER_BUTTON.addEventListener("click", () => {
            ANSWER_SECTION.style.display = "none";
            if (getAnswer() === number) {
                resolve("correct");
            } else {
                reject("failed");
            }
        });
    });

};


const summarySection = async (number, i, answer) => {

    return new Promise(resolve => {
        SUMMARY_SECTION.style.display = "flex"
        LEVEL.textContent = `Level ${i}`;
        NUMBER_OVERVIEW.textContent = `${number}`;
        YOUR_ANSWER.textContent = `${answer}`;
        if (NUMBER_OVERVIEW.textContent !== YOUR_ANSWER.textContent) {
            SUMMARY_BUTTON.textContent = "Try again"
        }
        SUMMARY_BUTTON.addEventListener("click", () => {
            SUMMARY_SECTION.style.display = "none"
            console.log("hehe")
            resolve("next")
        });

    });
};



const app = async () => {

    let gameIsOn = true
    let i = 1;

    while (gameIsOn) {
        const number_to_guess = randomNumber(i);
        await rememberWindow(number_to_guess);
        try{
            await answerWindow (number_to_guess);
            const answer = getAnswer()
            await summarySection(number_to_guess, i, getAnswer());

        } catch(error) {
            await summarySection(number_to_guess, i, getAnswer());

            gameIsOn = false
        }
    
    i++
    }
    console.log("end")
}


START_BUTTON.addEventListener("click", app)