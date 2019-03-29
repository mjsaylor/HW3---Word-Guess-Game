
var gameTitle = document.getElementById("ComputerChoice");
var gameDiv = document.getElementById("hangman");
var gameDiv2 = document.getElementById("letters-Guessed");
//computer chooses random Broadway show
var computerChoices = ["Urinetown", "Wicked", "Once On This Island", "Aladdin", "Hair", "The Sound of Music", "Grease", "The Lion King", "Thoroughly Modern Millie", "Mamma Mia", "The Music Man", "Dreamgirls", "Fiddler on the Roof", "Ragtime", "Les Miserables", "Avenue Q", "A Chorus Line", "My Fair Lady", "The Producers", "Hairspray", "Oklahoma!", "Aida", "School of Rock", "Matilda", "Anything Goes", "Cabaret", "Annie", "The Book of Mormon", "Hamilton", "Big River", "Little Shop of Horrors", "Jesus Christ Superstar", "Into the Woods", "In the Heights", "Evita", "Miss Saigon", "Rent", "Sweeney Todd", "Spring Awakening", "Phantom of the Opera", "Something Rotten", "Jersey Boys", "The Band's Visit", "Guys and Dolls"]
var computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)]
// total letters guessed so far 
var lettersGuessed = {};
//wrong guesses are counted to know when player gets "Game Over"
var wrongGuesses = 0;
// computer's choice written in blanks
var selectionBlanks = [];
//identify letters because I included shows that have spaces and punctuation
var regex = /[A-Za-z]/;



function gameSetUp() {
    //search the computer selection for letters; replace those regular characters with "_"

    for (var i = 0; i < computerSelection.length; i++) {
        if (computerSelection[i].search(regex) > -1) {
            selectionBlanks.push("_ ");
        }
        //if not a letter, keep original character from selection
        else {
            selectionBlanks.push(computerSelection[i])
        }
    }
}


gameSetUp();



console.log("Computer chooses", computerSelection)
console.log(selectionBlanks);

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
    gameDiv2.textContent = "Letters Guessed so far: " + Object.keys(lettersGuessed) + " Wrong Guesses: " + wrongGuesses;
    gameTitle.textContent = "Computer Choice: ???";
    gameDiv.textContent = selectionBlanks.join("");
}


//player presses button, guesses letter
document.onkeyup = function (event) {

    var playerGuess = event.key;
    console.log("Player Guessed", playerGuess)
    //check if letter has already been guessed
    if (lettersGuessed[playerGuess]) {
        console.log("You already guessed " + playerGuess)
        return
    }

    // if guess is unique, check the guess. Is it correct?
    else if (computerSelection.toLowerCase().includes(playerGuess)) {
        //if correct, replace blank in selectionBlanks array with correct playerGuess
        fillInTheBlanks(playerGuess)
    } else {
        console.log("Wrong Guess!")
        wrongGuesses++
    }
    //add all letters guessed to lettersGuessed
    lettersGuessed[playerGuess] = true;
    console.log(lettersGuessed);

    console.log(selectionBlanks.join(""));



    if (wrongGuesses > 7) {
        gameSetUp();
    }
    

};













//when word is complete
//player wins
//computer selects new word
