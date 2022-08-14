// create a deck of cards
    // define the possible card options
    var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
    var faceValues = ['A', "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    var deck = new Array();
    var players = new Array();
    var currentPlayer = 0;

    // create a deck with each combination of card, and assign a cardvalue
    var makeDeck = function () {
      deck = new Array();
      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < faceValues.length; j++) {
          var cardValue = parseInt(faceValues[j]);
          if (faceValues[j] == "J" || faceValues[j] == "Q" || faceValues[j] == "K") cardValue = 10;
          if (faceValues[j] == "A") cardValue = 11;
          var card = {Suit: suits[i], FaceValue: faceValues[j], CardValue: cardValue};
          deck.push(card);
        }
      }
    }

    // a funtion that swaps random card positions 500 times
    var shuffleDeck = function () {
      for (let i = 0; i < 500; i++) {
        let cardLoc1 = Math.floor((Math.random() * deck.length));
        let cardLoc2 = Math.floor((Math.random() * deck.length));
        let tempLoc = deck[cardLoc1];
        deck[cardLoc1] = deck[cardLoc2];
        deck[cardLoc2] = tempLoc;
      }
    }

// create a player object with an empty hand
    // create player and house
    var createPlayers = function () {
      players = new Array();
      var player = {Name: "", Points: 0, Hand: []};
      players.push(player);
      var house = {Name: "House", Points: 0, Hand: []};
      players.push(house);
    }

// Gameplay code
    // deal each player two cards
    var dealHands = function () {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < players.length; j++) {
          var card = deck.pop();
          players[j].Hand.push(card);
          updatePoints();
        }
      }
      
      for (let x = 0; x < players[currentPlayer].Hand.length; x++) {
        console.log(`You drew: ${players[currentPlayer].Hand[x].FaceValue} of ${players[currentPlayer].Hand[x].Suit}`)
      } console.log(`You have ${players[currentPlayer].Points} points.`)

      if (players[currentPlayer].Points === 21) {
        alert('Blackjack! Well done, you win.')
      }

    }

    // check scores after each deal
    var updatePoints = function () {
      for (let i = 0 ; i < players.length; i++) { 
        let points = 0;

        for(let j = 0; j < players[i].Hand.length; j++) {
            points += players[i].Hand[j].CardValue;
        }

        if (points > 21) {
          for(let k = 0; k < players[i].Hand.length; k++) {
            if (players[i].Hand[k].CardValue == 11) {
              players[i].Hand[k].CardValue = 1;
              points = points - 10;
              if (points <= 21) {
                break;
              }
            }
          }
        }

        players[i].Points = points;
      }
    }

    // add a new card to the hand and check score
    var hitMe = function () {
      var card = deck.pop();

      players[currentPlayer].Hand.push(card);
      
      updatePoints();

      if (currentPlayer == 0) {
        var newCard = players[currentPlayer].Hand.length;
        console.log(`You drew: ${players[currentPlayer].Hand[newCard-1].FaceValue} of ${players[currentPlayer].Hand[newCard-1].Suit}`)
        console.log(`You have ${players[currentPlayer].Points} points.`)
        check();
      } else {
        var newCard = players[currentPlayer].Hand.length;
        console.log(`The House drew: ${players[currentPlayer].Hand[newCard-1].FaceValue} of ${players[currentPlayer].Hand[newCard-1].Suit}`)
        console.log(`They have ${players[currentPlayer].Points} points.`)
        check();
      }
  
    }

    // move on to the house
    var stayPut = function () {
      if (currentPlayer != players.length-1) {
        currentPlayer += 1;
        housePlays();
      } else {
        endGame();
      }
    }

    // a function for letting the house play
    var housePlays = function () {

      for (let x = 0; x < players[currentPlayer].Hand.length; x++) {
        console.log(`The house drew: ${players[currentPlayer].Hand[x].FaceValue} of ${players[currentPlayer].Hand[x].Suit}`)
      } console.log(`They have ${players[currentPlayer].Points} points.`)

      if (players[currentPlayer].Points <= 16) {
        while (players[currentPlayer].Points < 17) {
          console.log('The house draws a card.');
          hitMe();
        } 

        if (players[currentPlayer].Points > 21) {
          console.log('The house is bust.');
        } else {
          console.log('The house stays.');
          stayPut();
        }
      } else if (players[currentPlayer].Points >= 17) {
        console.log('The house stays.');
        stayPut();
      }
    }


    // check score for being bust
    var check = function () {
      if (players[currentPlayer].Points > 21) {
        endGame();
      }
    }

    // end game function to swap to house
    var endGame = function () {
      var winner = -1;
      var score = [];
      
      for (let i = 0; i < players.length; i++) {
        score.push(players[i].Points)
      } 

      if (score[0] > score[1] && score[0] < 22) {
          winner = 0;
      } else if (score[1] > score[0] && score[1] < 22) {
        winner = 1;
      } else if (score[0] >= 22) {
        winner = 1;
      } else if (score[1] >= 22) {
        winner = 0;
      } else if (score[0] == score[1]) {
        winner = 0;
      }
      alert(`The winner is ${players[winner].Name}!`);

    }


// start a game
    var startblackjack = function () {
      // change button to restart
      document.getElementById('btnStart').value = 'Restart';
      // default settings and setup deck
      currentPlayer = 0;
      makeDeck();
      shuffleDeck();
      createPlayers();
      var playerName = prompt('What is your name?');
      players[0].Name = playerName || "Player";
      console.log("Lets play!")

      dealHands();
    }
