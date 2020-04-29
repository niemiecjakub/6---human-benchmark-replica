// DOM elements
const TEST = document.getElementById("test");
const averageTime = document.getElementById("average-time");
const triesNumber = document.getElementById("tries-number"); 
const img = document.querySelector(".main-img");
const dots = document.querySelector(".dots")
const title = document.getElementById("title");
const subtitle = document.querySelectorAll(".group-test h2");


const randomDelay = (minimum, maximum) => {
    // generates random delay between MINIMUM and MAXIMUM
    return Math.floor(Math.random() * (maximum - minimum) + minimum);   
}


const calculateAverage = (results) => {
    //takes array of numbers and returns average

    const reducer = (prev, curr) => {
        return prev + curr
    };

    if (results.length > 0 ) {
        const avg = Math.floor(results.reduce(reducer) / results.length);
        return avg
    }
    return 0
}


const tooSoon = (iteration, results) => {
    return new Promise(resolve => {
        dots.style.display = "none";
        img.src = "../images/info.png";
        img.style.display = "block";
        title.textContent = "Too soon!";
        TEST.style.backgroundColor = "rgb(43, 135, 209)";
        subtitle[1].textContent = "Click to try again";
        subtitle[1].style.display = "block";
    
        averageTime.textContent = `${calculateAverage(results)}ms`;    
        triesNumber.textContent = `${iteration+1} of 5`;
    
        TEST.addEventListener("click", () => {
            resolve("too soon resolved")
        });
    })
}


const init = () => {
    // changes bg to red

    console.log('initment')
    TEST.style.backgroundColor = "rgba(163, 36, 20,0.8)";
    img.style.display = "none";
    dots.style.display = "block";
    title.textContent = "Wait for green";
    subtitle.forEach(element => {
        element.style.display = "none";
    });
};


const waitForGreen = (delay) => {
    // waits DELAY and changes for green 

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("true");
        }, delay);
    });
};


const react = () => {
    //on click returns performance.now()

    return new Promise((resolve, reject) => {
        TEST.addEventListener("click", async () => {
            end = performance.now();
            resolve(end);
        });
    });
};


const waitForUser = () => {
    //waits for user to click

    return new Promise((resolve, reject) => {
        TEST.addEventListener("click", async () => {
            resolve("end");
        });
    });
};


const staySteady = () => {
    //waits for user to click

    return new Promise((resolve, reject) => {
        TEST.addEventListener("click", async () => {
            reject("too soon");
        });
    });
};

const showResult = (time, iteration, results) => {
    //shows results

    console.log("showing results");
    dots.style.display = "none";
    img.src = "../images/clock.png";
    img.style.display = "block";
    TEST.style.backgroundColor = "rgb(43, 135, 209)";
    title.textContent = `${time} ms`;
    triesNumber.textContent = `${iteration+1} of 5`;

    averageTime.textContent = `${calculateAverage(results)}ms`;

    subtitle[1].textContent = "Click to keep going";
    subtitle[1].style.display = "block";
};


const test = async () => {

    console.log("Test started");

    const resutlArray = []
    const reactionTime = document.getElementById("reaction-time");
    const triesNumber = document.getElementById("tries-number");
    const delay = randomDelay(1000,8000);

    TEST.removeEventListener("click", test);
    for(let i=0; i<5; i++) {
        console.log(i)

        init()
        try {
            await Promise.race([waitForGreen(delay), staySteady()]);
            TEST.style.backgroundColor = "rgba(60, 230, 90,0.75)";
            title.textContent = "Click!"

            let start = performance.now();                  //starts timing
            const end = await react();                      // ends timing and returns performance.now()
            const time = Math.floor(end - start);           // calculates time

            resutlArray.push(time);
            showResult(time,i, resutlArray);

            await waitForUser();                            // waits for user to click in order to move
        } catch(err) {
            console.log(err);
            i--;
            await tooSoon(i, resutlArray);
        }
    }

    console.log("Test ended");
    TEST.addEventListener("click", test)
};





TEST.addEventListener("click", test);
