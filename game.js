
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
  $("#level-title").text("level" + 0);
  nextSequence();
  started = true;
  }
});

$(".btn").click( function(){
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour);
  animatePress(userChosencolour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("assets/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");
   setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
   }
 }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart")
      setTimeout(function () {
          $("body").removeClass("game-over");
      }, 200);
      startOver();
     }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
