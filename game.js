let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

// Starting Game
$(document).keydown(function() {
   if(!gameStarted) {
      $("h1").text("Level " + level);
      nextSequence();
      gameStarted = true;
   }
});
$(document).click(function() {
   if(!gameStarted) {
      $("h1").text("Level " + level);
      nextSequence();
      gameStarted = true;
   }
});

// User Clicked
$(".btn").click(function() {
   if(gameStarted) {
      let userChosenColor = $(this).attr("id"); 
      userClickedPattern.push(userChosenColor);
   
      playSound(userChosenColor);
      animatePress(userChosenColor);
   
      checkAnswer(userClickedPattern.length - 1);
   }
   
});

// Answering
function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success.");
      if(userClickedPattern.length === gamePattern.length) {
         setTimeout(function() {
            nextSequence();
         }, 1000);
      }
   } else {
      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function() {
         $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
   }
}


function nextSequence() {
      userClickedPattern = [];
      level++;
      $("#level-title").text("level " + level);
      
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor);
   
      $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   
      playSound(randomChosenColor);
   
}

// Playing Sounds
function playSound(name) {
   let audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

// Animating Presses
function animatePress(currentColor) {
   $("#" + currentColor).addClass("pressed");
   setTimeout(function() {
      $("#" + currentColor).removeClass("pressed")
   }, 100);
}

// Starting over
function startOver() {
   level = 0;
   gamePattern = [];
   gameStarted = false;
}

