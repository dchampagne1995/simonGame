//Creating new array to hold button sequence
var buttonColors = ["red", "blue" , "green", "yellow"];
var chosenColor = buttonColors[randomNumber];


//next sequence function
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}
