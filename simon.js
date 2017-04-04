let pattern = [];
let usedPattern = [];
let stage = 01;
let check = false;

 function startGame() {
      removeClicks();
      resetGame();
      gamePattern();
      playPattern();
    }

  $("#innerCircle").click(function() {
      if (check === false) {
        return startGame();
      }
    });

function removeClicks() {
      $('.button').off();
      }

function resetGame() {
      stage = 01;
      $("h1").html("Simon Game");
      $("p").html("Click here to Start");
      $("#stage").html("Stages: " + stage);
      }

function gamePattern() {
  let value = randNum(1, 4);
  pattern.push(value);
      }

function randNum(x, y) {
  return Math.round(Math.random() * (y - x)) + x;
      }

function playPattern() {
  for (let i = 0; i < pattern.length; i++) {
    let delayTime = i * 700;
    setTimeout(flashSquare, delayTime);
        }
      }

function flashSquare() {
  let item = pattern.pop();
  check = true;
  $("#" + item).animate({
    opacity: 0.5
  }, 200).animate({
    opacity: 1.5
  }, 100);
  usedPattern.push(item);
  if (pattern.length <= 0) {
    buttonClicks();
  }
}

function buttonClicks() {
  $(".button").click(function() {
    let item = usedPattern.shift();
    let buttonId = $(this).attr("id");
  $(this).animate({
    opacity: ".5"
  }, 200).animate({
    opacity: 1
  }, 100)
  if (item == buttonId) {
    pattern.push(item);
    if (usedPattern.length <= 0) {
      stage++;
      $("#stage").html("Stages: " + stage);
      removeClicks();
      gamePattern();
      setTimeout(playPattern, 800);
    }
  } else {
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
    pattern = [];
    usedPattern = [];
  }
  });
}
