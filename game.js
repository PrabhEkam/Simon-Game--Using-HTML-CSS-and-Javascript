var gamePattern = [];
var level = 0;
var currentLevel = 0;
var userClickedPattern = [];
var started = false;

function startOver() {
      gamePattern = [];
      level = 0;
      currentLevel = 0;
      userClickedPattern = [];
      started = false;
     }

const buttonColors = ["red", "blue", "green", "yellow"];

function playSound(name) {
     switch (name) {
          case "blue":
               var blue = new Audio("./sounds/blue.mp3");
               blue.play();
               break;
          case "green":
               var green = new Audio("./sounds/green.mp3");
               green.play();
               break;
          case "yellow":
               var Yellow = new Audio("./sounds/yellow.mp3");
               Yellow.play();
               break;
          case "red":
               var red = new Audio("./sounds/red.mp3");
               red.play();
               break;

          default:
               var wrong = new Audio("./sounds/wrong.mp3");
               wrong.play();
               break;
     }
}
$(document).keypress(function () {
     if (!started) {
          $("h1").text(`Level ${level}`);
          nextSequence();
          started = true;
     }
});

function nextSequence() {
     $("h1").text(`Level ${level}`);

     //generating random no.
     const randomNumber = Math.floor(Math.random() * 4);
     //color chosing
     var randomChosenColor = buttonColors[randomNumber];
     //playing sound
     playSound(randomChosenColor);
     gamePattern.push(randomChosenColor);

     console.log(gamePattern);
     $("#" + randomChosenColor)
          .fadeOut(100)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
}

function checkAnswer(currentLevel) {
     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          level += 1;
          console.log("success");

          //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
          if (userClickedPattern.length === gamePattern.length) {
               //5. Call nextSequence() after a 1000 millisecond delay.
               setTimeout(function () {
                    nextSequence();
               }, 1000);
               userClickedPattern=[];
          }
     } else {
          $("body").addClass("game-over");
          setTimeout(function () {
               $("body").removeClass("game-over");
          }, 2000);
          console.log("wrong");
          var wrong = new Audio("./sounds/wrong.mp3");
          wrong.play();
          $("h1").text("Game Over! Press any key to Restart");
          startOver();
     }
}

function animatePress(color) {
     $("." + color).addClass("pressed");

     setTimeout(function () {
          $("." + color).removeClass("pressed");
     }, 100);
}
$(".btn").click(function (event) {
     var userChosenColor = event.target.id;
     console.log(userChosenColor);
     userClickedPattern.push(userChosenColor);
     console.log(userClickedPattern);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
});
