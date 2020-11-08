//Creating new array to hold button sequence
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStarted = false;

//Detecting key press
$(document).keypress(function() {
  if (!gameStarted) {
    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

//Detecting button press by user
$(".btn").click(function() {
  var userChoice = $(this).attr("id");
  userClickPattern.push(userChoice);
  playSound(userChoice);
  animatePress(userChoice);
  checkAnswer((userClickPattern.length) - 1);
});

//next sequence function
function nextSequence() {

  userClickPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomchosenColor = buttonColors[randomNumber];

  //adding random colour to game game pattern
  gamePattern.push(randomchosenColor);

  //making next colour square flash
  $("#" + randomchosenColor).fadeOut(100).fadeIn(100);
  playSound(randomchosenColor);

  $("h1").text("Level " + level);

}

//function to play correct sounds
function playSound(name) {
  //playing sound to match color
  var colorSound = new Audio('sounds/' + name + '.mp3');
  colorSound.play();
}

//Animate button to show that it has been pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//comparing user answer to correct pattern
function checkAnswer(currentLevel) {
  console.log(userClickPattern);
  console.log(gamePattern);
  if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickPattern.length == gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}
//Function for user to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
