// Basic steps to makes game run
function newGame() {
    resetGame();
    randomPattern();
    playPattern();
}

let check = false;

// create click function to start new game.
$("#innerCircle").click(function() {
    if (check === false) {
        return newGame();
    }
});

let stage = 1;

// Created function for resetting game,
function resetGame() {
    $(".button").unbind(); //makes all events click off
    // after all events off, display shows h1, p, #stage.
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
    //using Math.random method to make each stage random pattern
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function playPattern() {
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(flashSquare, i * 700);
    }
}

let usedPattern = [];

function flashSquare() {
    let item = pattern.pop();
    check = true;
    document.getElementById("firstSound").play();
    //play sound when the square flashes
    //pops and remove (last_item) from array
    $("#" + item).animate({
        opacity: ".5"
    }, 300).animate({
        opacity: 1.5
    }, 400);
    usedPattern.push(item);
    //add removed item to  end of usedPattern
    if (0 >= pattern.length) {
        // click event
        return buttonClicks();
    }
}

function buttonClicks() {
    $(".button").click(function() {
        // check if clicked square is right one
        let item = usedPattern.shift(); //remove first step from usedPattern array
        let buttonId = $(this).attr("id"); //return the value of an attribute.
        $(this).animate({
            opacity: ".5"
        }, 300).animate({
            opacity: 1.5
        }, 400)
        if (item == buttonId) { //when colors matched
            pattern.push(item);
            //back to pattern array
            if (0 >= usedPattern.length) {
                stage++; //stages are increasing
                $("#stage").html("Stages: " + stage);
                $(".button").unbind();
                randomPattern();
                setTimeout(playPattern, 800);
            }
            document.getElementById("secondSound").play();
            //play sound when user clicked right square
        } else {
            //when game over, restart the game.
            check = false;
            document.getElementById("wrongSound").play();
            //play sound when user clicked wrong square.
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
