
var gameTitle = document.getElementById("ComputerChoice");
var gameDiv = document.getElementById("blanks");
var gameDiv2 = document.getElementById("letters-Guessed");
var gameDiv3 = document.getElementById("wrong-guesses")
var gameDiv4 = document.getElementById("how-to-play")
var gameOverDiv = document.getElementById("game-over");
//computer chooses random Broadway show
var computerChoices = ["Urinetown", "Wicked", "Once On This Island", "Aladdin", "Hair", "The Sound of Music", "Grease", "The Lion King", "Thoroughly Modern Millie", "Mamma Mia", "The Music Man", "Dreamgirls", "Fiddler on the Roof", "Ragtime", "Les Miserables", "Avenue Q", "A Chorus Line", "My Fair Lady", "The Producers", "Hairspray", "Oklahoma!", "Aida", "School of Rock", "Matilda", "Anything Goes", "Cabaret", "Annie", "The Book of Mormon", "Hamilton", "Big River", "Little Shop of Horrors", "Jesus Christ Superstar", "Into the Woods", "In the Heights", "Evita", "Miss Saigon", "Rent", "Sweeney Todd", "Spring Awakening", "Phantom of the Opera", "Something Rotten", "Jersey Boys", "The Band's Visit", "Guys and Dolls"]
var computerSelection;
// total letters guessed so far 
var lettersGuessed;
//wrong guesses are counted to know when player gets "Game Over"
var wrongGuesses;
// computer's choice written in blanks
var selectionBlanks;
var isGameOver;
var song = document.getElementById("myAudio");


// defining function for correct guesses to replace the blanks
function fillInTheBlanks(guess) {
    for (var i = 0; i < selectionBlanks.length; i++) {
        if (guess == computerSelection[i].toLowerCase()) {
            selectionBlanks[i] = computerSelection[i];
        }
    }
}

function renderGame() {
    //display game as text    
    gameDiv3.textContent = "Wrong Guesses: " + wrongGuesses +"/8"
    gameDiv2.textContent = "Letters Guessed so far: " + Object.keys(lettersGuessed).join(", ");

    var htmlTitle = ""
    for (var i = 0; i < selectionBlanks.length; i++){
        htmlTitle += "<span class='titleLetter'>" + selectionBlanks[i] + "</span>"
    }
    
    gameDiv.innerHTML = htmlTitle;
}

function isLetter(character) {
    if (character.length > 1) {
        return false;
    }
    var regex = /[A-Za-z]/;
    return character.search(regex) > -1;
}

function gameSetUp() {
    lettersGuessed = {};
    wrongGuesses = 0;
    selectionBlanks = [];
    isGameOver = false;
    //identify letters because I included shows that have spaces and punctuation
    
    //search the computer selection for letters; replace those regular characters with "_"
    computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)]
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

function gameOver(playerWins) {
    isGameOver = true;
    if (playerWins == true) {
        song.play();
        renderPlayerWins();
    } else {
        renderPlayerLoses();
    }
}

function renderPlayerWins() {
    gameOverDiv.textContent = "YOU WIN! Press any key to play again.";
}

function renderPlayerLoses() {
    gameOverDiv.textContent = "YOU LOSE! The correct show title was: " + computerSelection + ". Press any key to play again."
}


gameSetUp();




console.log("Computer chooses", computerSelection)
console.log(selectionBlanks);




//player presses button, guesses letter
document.onkeyup = function (event) {
    if (isGameOver == true) {
        gameSetUp();
        return
    }

    var playerGuess = event.key.toLowerCase();
    console.log("Player Guessed", playerGuess)
    if (isLetter(playerGuess) == false){
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