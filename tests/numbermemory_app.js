// DOM elements
// test elems
const TEST = document.getElementById("test");
const button = document.querySelector(".button");
const mainImg = document.querySelector(".main-img");
const title = document.getElementById("title");
const subtitle = document.querySelector(".group-test h2");

// remember elems
const REMEMBER = document.getElementById("remember");
const number = document.querySelector("#remember h1");

// ANSWER
const ANSWER = document.getElementById("answer");
const number = document.querySelector("#remember h1");
const number = document.querySelector(".input");



const init = () => {
    TEST.style.display = "none";
    REMEMBER.style.display = "block"
}



TEST.addEventListener("click", () => {
    init()

})




