'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const words = require('./data/words.js');

const PORT = process.env.PORT || 8000;

const handleGuess = (req, res) => {
    // console.log(req.params.id);
    // console.log(req.params.letter);
    let code = [];
    let letterInWord = false;
    for (let i=0; i<words[req.params.id].word.length; i++) {
        if (words[req.params.id].word[i]===req.params.letter) {
            code.push('T');
            letterInWord = true;
        }
        else code.push('F');
    }
    // console.log(code);
    if (!letterInWord) code = [];
    // console.log(code);
    res.send({
        status: '200',
        guess: req.params.letter,
        id: req.params.id,
        answer: code
    });
}

// const handleGameLaunch = (req, res) => {
//     console.log(req.params);
//     let wordNum = req.params.id;
//     console.log('is this working?');
//     console.log(wordNum);
//     console.log(words[wordNum]);
//     res.render('../hangman/hangman', {
//         'id': wordNum,
//         'letterCount': words[wordNum].letterCount
//     });
// }

const handleGeneration = (req, res) => {
    let generatedWord = words[Math.floor(1+Math.random()*19)];
    console.log(generatedWord);
    console.log(generatedWord.word);
    console.log(generatedWord.id);
    console.log(generatedWord.letterCount);
    res.send({
        id: generatedWord.id,
        letterCount: generatedWord.letterCount
    });
}

// const handleAccessSpecifiedWordId = (req, res) => {
//     res.redirect('hangman/index', word = req.params.id);
// }

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints

    
    // .get('/hangman/:id', handleGameLaunch)
    // .get('/getAWord', handleGeneration)
    .get('/hangman/getAWord', handleGeneration)
    .get('/hangman/:id/:letter', handleGuess)
    // .get('/hangman/:id', handleAccessSpecifiedWordId)  This was for the challenge, I decided to take a break lol

    // .get('/hangman/getAWord', (req, res) => res.send('Testy tesy'))
    .get('/', (req, res) => res.render('/index'))
    .get('*', (req, res) => res.send(`404 - You don't know Jack`))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`))



    // and use querry by filling in message ewhen hyou clikc on the buttons


    // .get(`hangman/guess/:wordID/:letter`, (req,res) => {
    //     const {params, query} = req;
    //     console.log(params,query);
    //     res.send('tofu');
    // })
    // or use the querry by adding a message
    // .get(`hangman/guess/:wordID/`, (req,res) => {
    //     const {params, query} = req;
    //     console.log(params,query);
    //     res.status(300).send('tofu');
    // })

