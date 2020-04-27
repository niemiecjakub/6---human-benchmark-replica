// DOM elements
const TEST = document.getElementById("test");
const reactionTime = document.getElementById("reaction-time");
const triesNumber = document.getElementById("tries-number"); 
const img = document.querySelector(".main-img");
const dots = document.querySelector(".dots")
const title = document.querySelector(".title");
const subtitle = document.querySelectorAll(".group-test h2");


const randomDelay = (minimum, maximum) => {
    // generates random delay between MINIMUM and MAXIMUM
    return Math.floor(Math.random() * (maximum - minimum) + minimum);   
}


const initGame = () => {
    // changes bg to red and awaits green
    console.log('initment')
    TEST.style.backgroundColor = "rgba(163, 36, 20,0.8)";
    img.style.display = "none"
    dots.style.display = "block"
    title.textContent = "Wait for green"
    subtitle.forEach(element => {
        element.style.display = "none"
    });
}


const changeForGreen = async (delay) => {
    // waits DELAY and changes for green 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            TEST.style.backgroundColor = "rgba(60, 230, 90,0.75)";
            title.textContent = "Click!"
            resolve ("true")
        }, delay) 
    })  
}



const initTest = async () => {
    console.log("Test started");
    const reactionTime = document.getElementById("reaction-time");
    const triesNumber = document.getElementById("tries-number");
    const delay = randomDelay(1000,8000);

    TEST.removeEventListener("click", initTest);

    initGame();
    const clickNow = await changeForGreen(delay);
    console.log(clickNow)

}




TEST.addEventListener("click", initTest)
