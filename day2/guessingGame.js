// Create variable to hold the answer
var answer;

// Set up the game
function setUpGame(){
    // Clear out old values
    $("#tbxGuess").val("");
    $("#message").text("");

    // Come up with the answer
    answer = parseInt(Math.random() * 10);
    console.log("Cheater! Don't you dare enter " + answer);
    
    // Show the appropriate divs
    $("#intro").show();
    $("#game").hide();
}

// Handle the guess
function handleGuess(){
    var guess = $("#tbxGuess").val();
    if (+guess == answer) {
        // Tell them the answer is right
        $("#message").text("Correct!");

    } else {
        // Tell them the answer is wrong
        $("#message").text("Nope, try again");
        $("#tbxGuess").val("");
    }
}

// Set up the page for the game
function playGame(){
    $("#intro").hide();
    $("#game").show();
    $("#tbxGuess").focus();
}

// When the page loads, set up the game
$(function(){
// Wire up event handlers
    $("#startGame").on("click", playGame);
    $("#btnGuess").on("click", handleGuess);
// Start the gema
    setUpGame();
});