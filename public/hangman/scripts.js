const body = document.querySelector('body');
const content = document.getElementById('content');
const startButton = document.getElementById('start-button');
const startDiv = document.getElementById('start');
const submitButton = document.getElementById('submit-button');
const restartDiv = document.getElementById('restart-div');
const restartButton = document.getElementById('restart-button');
const letterDiv = document.getElementById('letter-div');
const theWord = document.getElementById('the-word');
const letter = document.getElementById('letter');
const guesses = document.getElementById('guesses');
const duckImg = document.getElementById('duck-img');
const duckDiv = document.getElementById('duck-div');
const game = new Audio('game.mp3');
const bgmusic = new Audio('bgmusic.mp3');
const laugh = new Audio('puppetlaugh.wav');
const alive = new Audio('alive.mp3');
const death = new Audio('death.ogg');

// I thoght I needed these, but I did not...  Good times
// const a = document.getElementById('a');
// const b = document.getElementById('b');
// const c = document.getElementById('c');
// const d = document.getElementById('d');
// const e = document.getElementById('e');
// const f = document.getElementById('f');
// const g = document.getElementById('g');
// const h = document.getElementById('h');
// const i = document.getElementById('i');
// const j = document.getElementById('j');
// const k = document.getElementById('k');
// const l = document.getElementById('l');
// const m = document.getElementById('m');
// const n = document.getElementById('n');
// const o = document.getElementById('o');
// const p = document.getElementById('p');
// const q = document.getElementById('q');
// const r = document.getElementById('r');
// const s = document.getElementById('s');
// const t = document.getElementById('t');
// const u = document.getElementById('u');
// const v = document.getElementById('v');
// const w = document.getElementById('w');
// const x = document.getElementById('x');
// const y = document.getElementById('y');
// const z = document.getElementById('z');

let musicOn = false;
let guessNumber = 0;
let lettersGuessed = '';
let id = '';
let letterCount = 0;
let currentGuess = '';
let failedGuesses = 0;
let correctGuess = false;
let laughed = false;
// let optionsHolster = letter.options;
// console.log(letter.options);
// console.log(optionsHolster);

// this is used to remove letters as options from the drop down menu.  I left my commented out failures inside the function
const removeLetter = () => {
    // This took quite a bit of data sifting to get right haha
    // console.log(typeof(letter.options));
    // console.log(letter.options[4].value);
    // console.log(letter.options[80]);
    // console.log(letter.options[80]===undefined);
    // console.log(letter.value);
    let done = false;
    let i = 0;
    while (done != true) {
        if (letter.options[i] != undefined) {
            if (letter.options[i].value === letter.value) letter.options[i] = null;
        }
        else done = true;
        i++
    }
    // This failed because, despite having apparent index values, letter.options is an object and not an array
    // letter.options.forEach((element) => {
    //     if (element.value === letter.value) option = null;
    // })

    // This failed because the the letter the index numbers points to shifts with every nullification
    // if (letter.value === 'a') letter.options[0] = null;
    // else if (letter.value === 'b') letter.options[1] = null;
    // else if (letter.value === 'c') letter.options[2] = null;
    // else if (letter.value === 'd') letter.options[3] = null;
    // else if (letter.value === 'e') letter.options[4] = null;
    // else if (letter.value === 'f') letter.options[5] = null;
    // else if (letter.value === 'g') letter.options[6] = null;
    // else if (letter.value === 'h') letter.options[7] = null;
    // else if (letter.value === 'i') letter.options[8] = null;
    // else if (letter.value === 'j') letter.options[9] = null;
    // else if (letter.value === 'k') letter.options[10] = null;
    // else if (letter.value === 'l') letter.options[11] = null;
    // else if (letter.value === 'm') letter.options[12] = null;
    // else if (letter.value === 'n') letter.options[13] = null;
    // else if (letter.value === 'o') letter.options[14] = null;
    // else if (letter.value === 'p') letter.options[15] = null;
    // else if (letter.value === 'q') letter.options[16] = null;
    // else if (letter.value === 'r') letter.options[17] = null;
    // else if (letter.value === 's') letter.options[18] = null;
    // else if (letter.value === 't') letter.options[19] = null;
    // else if (letter.value === 'u') letter.options[20] = null;
    // else if (letter.value === 'v') letter.options[21] = null;
    // else if (letter.value === 'w') letter.options[22] = null;
    // else if (letter.value === 'x') letter.options[23] = null;
    // else if (letter.value === 'y') letter.options[24] = null;
    // else if (letter.value === 'z') letter.options[25] = null;
}
// Below is my first failed attempt at getting options back in the select menu
// const returnLetters = function() {
//     // let last = letter.options[i];
//     console.log(letter.options);
//     let primer = letter.options[0];
//     for (i=0; i<26; i++){
//         console.log(letter.options);
//         if (letter.options[i] === 'undefined') {
//             console.log('the prob begins');
//         }
//         letter.options.unshift(primer);
//         letter.options[i].value = `${String.fromCharCode(i+97)}`;
//         letter.options[i].innerText = `${String.fromCharCode(i+65)}`;

//         // letter.options[i] = letter.options[0];
//         // letter.options[i].value = `${String.fromCharCode(i+97)}`;
//         // letter.options[i].innerText = `${String.fromCharCode(i+65)}`;
//         console.log(letter.options[i]);
//         // letter.options[i] = `${String.fromCharCode(i+97)}`;
//     }
//     console.log(letter.options);
// }
const returnLetters = function() {
    // let last = letter.options[i];
    while (letter.options[0]) {
        letter.options[0] = null;
    }
    // for (i=0; i<Object.keys(letter.options).length-1; i++){      //this doesn't work
    //     letter.options[i] = null;
    // }
    console.log(letter.options);
    
    for (i=0; i<26; i++){
        console.log(letter.options);
        let option = document.createElement("option");
        option.innerText = `${String.fromCharCode(i+65)}`;
        option.value = `${String.fromCharCode(i+97)}`;
        letter.appendChild(option);

        // letter.options.unshift(primer);
        // letter.options[i].value = `${String.fromCharCode(i+97)}`;
        // letter.options[i].innerText = `${String.fromCharCode(i+65)}`;
        // letter.options[i].Text = `${String.fromCharCode(i+65)}`;

        // letter.options[i] = letter.options[0];
        // letter.options[i].value = `${String.fromCharCode(i+97)}`;
        // letter.options[i].innerText = `${String.fromCharCode(i+65)}`;
        console.log(letter.options[i]);
        // letter.options[i] = `${String.fromCharCode(i+97)}`;
    }
    console.log(letter.options);
}

const handleBegin = (event) => {
    event.preventDefault();
    startDiv.style.display = 'none';
    game.play();
    if (musicOn === false) {
        musicOn = true;
        bgmusic.loop = 'true';
        bgmusic.play();
    }
    // const data = {
    //     id: '',
    //     letterCount: ''
    // };
    fetch('getAWord', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            id = data.id;
            let spaces = '';
            for (i=0; i<data.letterCount; i++) {
                if (i===0) spaces = '_';
                else spaces += ' _';
            }
            theWord.innerText = spaces;
            letterDiv.style.display = 'block';
        })
        content.innerText = 'take a guess, I dare you...';
        letterDiv.style.display = 'block';
        theWord.style.display = 'block';
        submitButton.disabled = false;
    });
}

const handleAskServerForALetter = (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    guessNumber ++;
    currentGuess = letter.value;
    if (guessNumber === 1) {
        lettersGuessed = `${letter.value.toUpperCase()}`;
        guesses.innerText = `Guesses made: ${guessNumber}\nLetter guessed: ${lettersGuessed}`;
    }
    else {
        lettersGuessed += `, ${letter.value.toUpperCase()}`
        guesses.innerText = `Guesses made: ${guessNumber}\nLetters guessed: ${lettersGuessed}`;
    }
    removeLetter();
    const data = {
        status: '',
        guess: '',
        id: '',
        answer: []
    };
    fetch(`${id}/${currentGuess}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            let correctGuess = false;
            if (data.status === '200'){
                if (data.answer.length != 0) {
                    let currentInnerText = theWord.innerText.split('');
                    for (let i=0; i<data.answer.length; i++){
                        if (data.answer[i]=== 'T') {
                            currentInnerText[i*2] = data.guess.toUpperCase();
                            correctGuess = true;
                        }
                    }
                    currentInnerText = currentInnerText.join('');
                    theWord.innerText = currentInnerText;
                }
            }
        //})
            if (correctGuess === false) {
                failedGuesses ++;
            }
            const testIfDone = function (){
                let currentInnerText = theWord.innerText.split('');
                // console.log(currentInnerText);
                let done = true;
                currentInnerText.forEach((char) => {
                    // console.log(char);
                    if (char === '_') done = false;
                })
                return done;
            }
            if (testIfDone()) {
                bgmusic.pause();
                alive.play();
                content.innerText = 'your reward: your life';
                letterDiv.style.display = 'none';
                setTimeout(()=>{
                    restartDiv.style.display = 'block';
                    restartButton.innerText = 'TOY WITH FATE ONCE MORE?';
                }, 12000);
            }
            switch(failedGuesses){
                case 1:
                    duckDiv.style.display = 'block';
                    duckImg.src= "hang1.png";
                    duckDiv.style.position = 'absolute';
                    content.innerText = `${8-failedGuesses} more attempts: plenty`;
                    submitButton.disabled = false;
                    break;
                case 2:
                    duckImg.src= "hang2.png";
                    content.innerText = `${8-failedGuesses} to go`;
                    submitButton.disabled = false;
                    break;
                case 3:
                    duckImg.src= "hang3.png";
                    content.innerText = `${8-failedGuesses} more tries until...`;
                    submitButton.disabled = false;
                    break;
                case 4:
                    duckImg.src= "hang4.png";
                    content.innerText = `${8-failedGuesses} remaining.  you know what's at risk`;
                    submitButton.disabled = false;
                    break;
                case 5:
                    duckImg.src= "hang5.png";
                    content.innerText = `down to ${8-failedGuesses}... are you guessing?`;
                    submitButton.disabled = false;
                    break;
                case 6:
                    duckImg.src= "hang6.png";
                    content.innerText = `${8-failedGuesses} left...`;
                    submitButton.disabled = false;
                    break;
                case 7: 
                    if (laughed === false) {
                        laugh.play();
                        setTimeout(() => {laugh.pause()}, 1700);
                        laughed = true;
                    }
                    content.innerText = `${8-failedGuesses}`;
                    duckImg.src= "hang7.png";
                    submitButton.disabled = false;
                    break;
                break;
                case 8:
                    duckDiv.style.display = 'none';
                    letterDiv.style.display = 'none';
                    content.style.display = 'none';
                    theWord.style.display = 'none';
                    body.style.backgroundImage = "url('https://mk0uploadvrcom4bcwhj.kinstacdn.com/wp-content/uploads/2019/05/Five-Nights-at-Freddys-VR-2.jpg')";
                    bgmusic.pause();
                    death.play();
                    setTimeout(()=>{
                        death.pause();
                        death.currentTime=0;
                        restartDiv.style.display = 'block';
                        restartButton.innerText = 'CLAW YOUR WAY OUT OF THE JAWS OF DEATH';
                    }, 1200);
                    break;
                default:
                    submitButton.disabled = false;
            }
        })
    })
    .catch();
}

const resetTheGame = (event) => {
    body.style.backgroundImage = "";
    restartDiv.style.display = 'none';
    musicOn = false;
    guessNumber = 0;
    lettersGuessed = '';
    id = '';
    letterCount = 0;
    currentGuess = '';
    failedGuesses = 0;
    correctGuess = false;
    laughed = false;
    theWord.innerText = '';
    guesses.innerText = '';
    // After a night's rest, I solved the below issue by appending newly created options to the menu.
    // Spent about 90 minutes trying to get the letter to return to the options menu... decided to not remove them as the user guesses.  They can now guess the same letter multiple times.
    returnLetters();
    // console.log(letter.options);
    // letter.options = optionsHolster;
    // console.log(letter.options);
    content.innerText = 'time to get to hanging.... I mean guessing...';
    startDiv.style.display = 'block';
    content.style.display = 'block';
    duckDiv.style.display = 'none';
}