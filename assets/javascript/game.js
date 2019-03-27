//computer chooses random Broadway show
var computerChoices = ["Urinetown", "Wicked", "Once On This Island", "Aladdin", "Hair", "The Sound of Music", "Grease", "The Lion King", "Thoroughly Modern Millie", "Mamma Mia", "The Music Man", "Dreamgirls", "Fiddler on the Roof", "Ragtime", "Les Miserables", "Avenue Q", "A Chorus Line", "My Fair Lady", "The Producers", "Hairspray", "Oklahoma!", "Aida", "School of Rock", "Matilda", "Anything Goes", "Cabaret", "Annie", "The Book of Mormon", "Hamilton", "Big River", "Little Shop of Horrors", "Jesus Christ Superstar", "Into the Woods", "In the Heights", "Evita", "Miss Saigon", "Rent", "Sweeney Todd", "Spring Awakening", "Phantom of the Opera", "Something Rotten", "Jersey Boys", "The Band's Visit", "Guys and Dolls"]
var computerSelection = computerChoices[Math.floor(Math.random() * computerChoices.length)]
// total letters guessed so far 
var lettersGuessed = {};
//wrong guesses are counted to know when player gets "Game Over"
var wrongGuesses = 0;
// computer's choice written in blanks
var selectionBlanks = [];
// found "regular expression" aka regex to create blanks only for letters, since some shows have spaces and punctuation
var regex = /[A-Za-z]/;
for (var i = 0; i < computerSelection.length; i++) {
    if (computerSelection[i].search(regex) > -1) {
        selectionBlanks.push("_ ");
    }
    else {
        selectionBlanks.push(computerSelection[i])
    }
}
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

//player presses button, guesses letter
document.onkeyup = function (event) {

    var playerGuess = event.key;
    console.log("Player Guessed", playerGuess)

    // check the guess; is it correct?
    if (computerSelection.toLowerCase().includes(playerGuess)) {

        //replace blank in selectionBlanks array with correct playerGuess
        fillInTheBlanks(playerGuess)

    } else {
        console.log("Wrong Guess!")
        wrongGuesses++;
    }
    //add all letters guessed to lettersGuessed
    lettersGuessed[playerGuess] = true;
    console.log(lettersGuessed);
    console.log(selectionBlanks.join(""));

    if (wrongGuesses > 9) {
        console.log("GAME OVER")
    }

    //if player has already guessed letter, display "you already guessed that"

    //display game as text    
    gameDiv.textContent = selectionBlanks.join("");
    gameDiv2.textContent = "Letters Guessed so far: " + Object.keys(lettersGuessed) + wrongGuesses;
    //don't allow guesses to be guessed twice; in an object, all keys must be unique

    
};
//defining text elements via HTML
var gameTitle = document.getElementById("ComputerChoice");
var gameDiv = document.getElementById("hangman");
var gameDiv2 = document.getElementById("letters-Guessed");

gameDiv.textContent = selectionBlanks.join("");



gameTitle.textContent = "Computer Choice: ???";






//when word is complete
//player wins
//computer selects new word
