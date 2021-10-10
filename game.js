var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;
var level = 0;


$(document).keypress(function () {

    if (!start) {
        $("#levet-title").text("Level" + level);
        nextSquence();
        start = true;

    }


});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSquence();
            },1000);
  }



    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout (function (){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over  Press Any Key to restart");
        startOver();
    }

}

function nextSquence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + " " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    var clickColor = $("#" + currentColor);
    clickColor.addClass("pressed");
    setTimeout(function () {
        clickColor.removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    start = false;

}