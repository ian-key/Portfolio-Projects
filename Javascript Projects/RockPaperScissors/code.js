var choices = ['Rock', 'Paper', 'Scissors'];

var playRound = function () {
  // get users choice
  var userInput = prompt('Please enter your play, 1: Rock, 2: Paper: 3: Scissors');
  while (userInput < 1 && userInput > 3) {
    userInput = prompt('Please enter your play, 1: Rock, 2: Paper: 3: Scissors');
  }
  var userSelection = choices[userInput - 1]

  //get computers choice
  var computerSelection = choices[Math.floor(Math.random() * (2 - 0 + 1) + 0)]

  //log choices
  console.log(`Your choice: ${userSelection} / Computers choice: ${computerSelection}`)

  //calculate winner
  var choice1 = choices.indexOf(userSelection);
  var choice2 = choices.indexOf(computerSelection);
  if (choice1 == choice2) {
    return "Tie!";
  }
  if (choice1 == choices.length - 1 && choice2 == 0) {
    return "Computer wins!";
  }
  if (choice2 == choices.length - 1 && choice1 == 0) {
    return "You win!";
  }
  if (choice1 > choice2) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

var playSingleGame = function () {
  
  //set scores to 0
  let playerScore = 0;
  let computerScore = 0;
  let roundCount = 0;

  do {
    //run a round
    var res = playRound();

    //report winner
    console.log(res)

    // increase round count
    roundCount++

    //add scores based on winner of the round
    if (res.startsWith("You")) {
      playerScore++
    } else if (res.startsWith("Computer")) {
      computerScore++
    } 

    //report progress
    console.log(`Round ${roundCount} - Your score: ${playerScore} / Computer score: ${computerScore}`)
  } while ((playerScore + computerScore) < maxScore)
  
  if (playerScore > computerScore) {
    alert(`You win! You played ${roundCount} round${roundCount===1?"":"s"}. The final score was: ${playerScore} / ${computerScore} to you.`);
    playAgain();
    } else {
    alert(`You lost! You played ${roundCount} round${roundCount===1?"":"s"}. The final score was: ${computerScore} / ${playerScore} to the computer.`);
    playAgain();
  }

}

var playBestOfThree = function () {
  
  //set scores to 0
  let playerScore = 0;
  let computerScore = 0;
  let roundCount = 0;

  do {
  //run a round
  var res = playRound();

  // increase round count
  roundCount++

  //report winner
  console.log(res)

  //add scores based on winner of the round
  if (res.startsWith("You")) {
    playerScore++
  } else if (res.startsWith("Computer")) {
    computerScore++
  } 

  //report progress
  alert(`Round ${roundCount} - Your score: ${playerScore} / Computer score: ${computerScore}`)

  if (playerScore === 0 && computerScore === 2) {
    break;
  } else if (playerScore === 2 && computerScore === 0) {
    break;
  }

  } while ((playerScore + computerScore) < maxScore);

  if (playerScore > computerScore) {
    alert(`You win! You played ${roundCount} rounds. The final score was: ${playerScore} / ${computerScore} to you.`);
    playAgain();
    } else {
    alert(`You lost! You played ${roundCount} rounds. The final score was: ${computerScore} / ${playerScore} to the computer.`);
    playAgain();
  }
}


var playAgain = function () {
  if(confirm('Do you want to play again ?')){
    var gameMode = prompt("How many rounds would you like to play? Press '1' for a single game, or '2' for best out of 3.");
    if (gameMode === '2') {
      maxScore = 3;
      playBestOfThree();
    } else if (gameMode === '1') {
      maxScore = 1
      playSingleGame();
    }
  } else {
    alert("Thanks for playing!")
  }
}

//default settings and game start
var maxScore = 1;
var gameMode = prompt("How many rounds would you like to play? Press '1' for a single game, or '2' for best out of 3.");
 if (gameMode === '2') {
   maxScore = 3;
   playBestOfThree();
 } else if (gameMode === '1') {
   playSingleGame();
 }




