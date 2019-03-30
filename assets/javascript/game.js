//setup html variables
var gameDiv = document.getElementById("blanks");
var gameDiv2 = document.getElementById("letters-Guessed");
var gameDiv3 = document.getElementById("wrong-guesses")
var gameOverDiv = document.getElementById("game-over");
//song variables
var songWin = document.getElementById("myAudio1");
var songLose = document.getElementById("myAudio2");
// global variables for gameplay
var computerChoices = ["Urinetown", "Wicked", "Once On This Island", "Aladdin", "Hair", "The Sound of Music", "Grease", "The Lion King", "Thoroughly Modern Millie", "Mamma Mia", "The Music Man", "Dreamgirls", "Fiddler on the Roof", "Ragtime", "Les Miserables", "Avenue Q", "A Chorus Line", "My Fair Lady", "The Producers", "Hairspray", "Oklahoma!", "Aida", "School of Rock", "Matilda", "Anything Goes", "Cabaret", "Annie", "The Book of Mormon", "Hamilton", "Big River", "Little Shop of Horrors", "Jesus Christ Superstar", "Into the Woods", "In the Heights", "Evita", "Miss Saigon", "Rent", "Sweeney Todd", "Spring Awakening", "Phantom of the Opera", "Something Rotten", "Jersey Boys", "The Band's Visit", "Guys and Dolls"]
var computerSelection;
var lettersGuessed;
var wrongGuesses;
var selectionBlanks;
var isGameOver;



// replaces blanks with correct letter guess
function fillInTheBlanks(guess) {
    for (var i = 0; i < selectionBlanks.length; i++) {
        if (guess == computerSelection[i].toLowerCase()) {
            selectionBlanks[i] = computerSelection[i];
        }
    }
}
// renders HTML content
function renderGame() {
    // display game as text    
    gameDiv3.textContent = "Wrong Guesses: " + wrongGuesses + "/8"
    gameDiv2.textContent = "Letters Guessed so far: " + Object.keys(lettersGuessed).join(", ");
    // display blanks with appropriate spacing
    var htmlTitle = ""
    for (var i = 0; i < selectionBlanks.length; i++) {
        htmlTitle += "<span class='titleLetter'>" + selectionBlanks[i] + "</span>"
    }

    gameDiv.innerHTML = htmlTitle;
}
// identify letters because I included shows that have spaces and punctuation. also don't want keys being accepted as guesses that are not letters
function isLetter(character) {
    if (character.length > 1) {
        return false;
    }
    var regex = /[A-Za-z]/;
    //character.search returns -1 if not found
    return character.search(regex) > -1;
}
// sets/resets variables to initial value
function gameSetUp() {
    lettersGuessed = {};
    wrongGuesses = 0;
    selectionBlanks = [];
    isGameOver = false;
   

    // search the computer selection for letters; 
    computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)]
    // replace alpha characters with "_"
    for (var i = 0; i < computerSelection.length; i++) {
        if (isLetter(computerSelection[i])) {
            selectionBlanks.push("_ ");
        }
        //if not a letter, keep original character from selection
        else {
            selectionBlanks.push(computerSelection[i])
        }

    }
    gameOverDiv.textContent = "";
    renderGame();
}
// check if player has won; if word is complete
function isTitleComplete(selectionBlanks, computerSelection) {
    if (selectionBlanks === computerSelection) {
        console.log("immediately returns true");
        return true;
    }
    if (selectionBlanks == null || computerSelection == null) {
        console.log("doesn't exist")
        return false;
    }
    if (selectionBlanks.length != computerSelection.length) {
        console.log("not the same length");
        return false;

    }
    //checks if every letter has been guessed correctly
    for (var i = 0; i < selectionBlanks.length; i++) {
        if (selectionBlanks[i] !== computerSelection[i]) {
            console.log("letters are not the same at index " + i)
            return false;
        } else {
            console.log("letters are the same at index " + i)
        }
    }
    return true;

}

// Game Over; play songs and give message
function gameOver(playerWins) {
    isGameOver = true;
    if (playerWins == true) {
        songWin.play();
        renderPlayerWins();
    } else {
        songLose.play();
        renderPlayerLoses();
    }
}

function renderPlayerWins() {
    gameOverDiv.textContent = "YOU WIN! Press any key to play again.";
}

function renderPlayerLoses() {
    gameOverDiv.textContent = "YOU LOSE! The correct show title was: \"" + computerSelection + "\". Press any key to play again."
}

//initial game set up after game is over
gameSetUp();




console.log("Computer chooses", computerSelection)
console.log(selectionBlanks);




//player presses button, guesses letter
document.onkeyup = function (event) {
  // if game is over, reset the game and exit the function  
    if (isGameOver == true) {
        gameSetUp();
        return
    }

    // player guess should always be lower case
    var playerGuess = event.key.toLowerCase();
    console.log("Player Guessed", playerGuess)
    if (isLetter(playerGuess) == false) {
        return
    }
    //check if letter has already been guessed
    if (lettersGuessed[playerGuess]) {
        console.log("You already guessed " + playerGuess)
        return
    }

    // if guess is unique, check the guess. Is it correct?
    else if (computerSelection.toLowerCase().includes(playerGuess)) {
        //if correct, replace blank in selectionBlanks array with correct playerGuess
        fillInTheBlanks(playerGuess)
        console.log("Correct Answer so far")
        console.log(selectionBlanks);
    } else {
        console.log("Wrong Guess!")
        wrongGuesses++
    }
    //add all letters guessed to lettersGuessed
    lettersGuessed[playerGuess] = true;
    console.log("Letters Guessed:")
    console.log(lettersGuessed);

    console.log(selectionBlanks.join(""));
    //if player is has won, game over
    if (isTitleComplete(selectionBlanks, computerSelection) == true) {
        console.log("complete")
        //gameOver function -win-
        gameOver(true);
    }

    //if player has lost, game over
    if (wrongGuesses > 7) {
        console.log("too many guesses")
        //gameOver function -lose-
        gameOver(false);
    }
    renderGame();

};