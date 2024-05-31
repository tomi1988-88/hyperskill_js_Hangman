
const input = require('sync-input')

function gameLoop(attempts, results) {
  const wordsPossible = ["python", "java", "swift", "javascript"];
  let word = wordsPossible[Math.floor(Math.random() * wordsPossible.length)];
  let wordArr = word.split("");
  let wordHidden = `${"-".repeat(word.length)}`;
  let wordHiddenArr = wordHidden.split("");
  let letterGuessed = [];
  
  while (attempts.at) {
  console.log();
  console.log(wordHidden);
  
  if (!wordHidden.includes("-")) {

    console.log(`You guessed the word ${word}!
You survived!`);
    results.won += 1;
    return;
    
  }
  
  let guess = input(`Input a letter:`);
  
  if (guess.length != 1) {
    
    console.log(`Please, input a single letter.`);
    
  } else if (!("a" <= guess && guess <= "z")) {

    console.log(`Please, enter a lowercase letter from the English alphabet.`);
    
  } else if (letterGuessed.includes(guess)) {

    console.log(`You've already guessed this letter.`);
    
  } else if (wordHidden.includes(guess)) {
    
    console.log(`No improvements.`);
    --attempts.at;
    
  } else if (wordArr.includes(guess)) {

    for (j = 0; j < wordArr.length; j++) {
      
      if (wordArr[j] == guess) {
        wordHiddenArr[j] = guess; 
      }
      
    }

    wordHidden = wordHiddenArr.join("");
    letterGuessed.push(guess);
  
  } else {
    
    console.log(`That letter doesn't appear in the word.`);
    --attempts.at;
    letterGuessed.push(guess);
    
  }
}
  console.log(`You lost!`);
  results.lost += 1;
}


function menuLoop () {
  
  let attempts = {'at': 8};
  let results = {'won': 0, 'lost': 0};
  
  console.log(`H A N G M A N`);
  
  while (true) {
    let menuChoice = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`);

    if (menuChoice == "play") {
      
      gameLoop(attempts, results);
      
    } else if (menuChoice == "results") {
      
      console.log(`You won: ${results.won} times.
You lost: ${results.lost} times.`);
      
    } else if (menuChoice == "exit") {
      break;
    }

    attempts.at = 8;
  
  }
}

menuLoop();
