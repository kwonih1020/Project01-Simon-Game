// let blueSound =  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
// let yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
// let greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
// let purpleSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
//
// function buttonSounds(randomNum) {
//   switch (randomNum) {
//     case 1 : blueSound.play();
//     break;
//     case 2 : yellowSound.play();
//     break;
//     case 3 : greenSound.play();
//     break;
//     case 4 : purpleSound.play();
//     break;
//   }
// }

// Basic steps to makes game run
function newGame() {
      resetGame();
      randomPattern();
      playPattern();
    }

let check = false;

// Created click function to start new game.
$("#innerCircle").click(function() {
    if (check === false) {
    return newGame();
    }
});

let stage = 1;

// Created function for restarting game,
function resetGame() {
  $(".button").off(); //makes all events clicks off
  // start
  stage = 01;
  $("h1").html("Simon Game");
  $("p").html("Click here to Start");
  $("#stage").html("Stages: " + stage);
}

let pattern = [];
// Generating random pattern
function randomPattern() {
  let value = generateRandomNum(1, 4);
  pattern.push(value);
      }

function generateRandomNum(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
      }

function playPattern() {
  for (let i = 0; i < pattern.length; i++) {
    setTimeout(flashSquare, i * 600);
        }
      }

let usedPattern = [];

function flashSquare() {
  let item = pattern.pop();
    check = true;
    //pops and remove first item from array
    $("#" + item).animate({
      opacity: ".5"
        }, 300).animate({
      opacity: 1.5
        }, 400);
    usedPattern.push(item);
    //add removed item to usedPattern
    if (0 >= pattern.length) {
      // click event
    return buttonClicks();
    }
}

function buttonClicks() {
  $(".button").click(function() {
    // check if clicked square is right one
    let item = usedPattern.shift();
    let buttonId = $(this).attr("id");
  $(this).animate({
    opacity: ".5"
  }, 300).animate({
    opacity: 1.5
  }, 400)
  if (item == buttonId) {
    pattern.push(item);
    //back to pattern array
    if (0 >= usedPattern.length) {
      stage++;
      $("#stage").html("Stages: " + stage);
      $(".button").off();
      randomPattern();
      setTimeout(playPattern, 800);
    }
  } else {
    //when game over
    check = false;
    $("h1").html("Game Over").css({
      fontSize: 20,
      marginBottom: 15,
      paddingTop: 40
    });
    $("p").html("Click here to Restart").css({
      fontSize: 10,
      paddingTop: 35
    });
    // clear pattern arrays
    pattern = [];
    usedPattern = [];
  }
  });
}
