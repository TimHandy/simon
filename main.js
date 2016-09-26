// Simon Game from FreeCodeCamp

// User Story: I am presented with a random series of button presses.
// User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
// User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can see how many steps are in the current series of button presses.
// User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.


// Feature: Timeout if not pressed a button in x secs then it resets to the start

//Hint: Here are mp3s you can use for each button: https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.


//'use strict';  // Recommended as best practice, but disabled as issues with jshint stating "$ is not defined"

let isOn = false;
let isStrict = false;
let sequenceArr = []

function powerOnOff() {
	if (!isOn) {
		isOn = true;
		$(".count-display p").html("--").hide();
		$(".count-display p").fadeIn(300);
		resetArrays();
		console.log('isOn = ' + isOn + ': Powered On');
	} else {
		isOn = false;
		$(".count-display p").fadeOut(1000);
		console.log('isOn = ' + isOn + ': Powered Off');
	}
	// TODO: make this button into a slider switch
}

function startReset() {
	if (isOn) {
		$(".count-display p").html("--").hide();
		$(".count-display p").fadeIn(200).fadeOut(200).fadeIn(200);
		resetArrays();
		nextPlay();
	}
}

function strictOnOff() {
	if (isOn && !isStrict) {
		isStrict = true;
		$(".strict-button-indicator").css("background-color", "#DC0007");
	} else {
		isStrict = false;
		$(".strict-button-indicator").css("background-color", "black");
		// note, to enable fade in/out of colours, you have to use a 3rd party plugin: https://github.com/jquery/jquery-color/
	}
}

function flashButton(item) {
	setTimeout(function(){ $("#"+item).fadeOut().fadeIn(); }, 1000);
}

function nextPlay() {
	// Choose random number 1-4, and add to sequenceArr
	var randomButton = Math.floor(Math.random() * 4) + 1;
	sequenceArr.push(randomButton);
	// for each num in array, flash and play sound for that quadrant
	sequenceArr.forEach(flashButton);
}

function congratulate() {
	// flash lights or something
}

function resetArrays() {
	sequenceArr = [];
	buttonPressesArr = [];
}

$(".on-off-button").click(function(){
    powerOnOff();
});

$(".strict-button").click(function(){
    strictOnOff();
});

$(".start-reset-button").click(function(){
    startReset();
});


// clickListener:
// 	click on quad:
// 		depresses
// 		lights up
// 		makes noise





// $ on page load
	// gameplay logic
		// if isOn
		//
		// nextPlay() {
		//
		// player clicks a button/s and each is recorded to a buttonPressesArr
		// 	each entry in buttonPressesArr is matched to corresponding entry in sequence...
		// 		if a mismatch is found
		// 			if presses === sequence, nextPlay
		// 			else if (!strict)
		// 				repeat sequence
		// 			else if (strict)
		// 				startResetGame()
		// 		else if buttonPressesArr.length === 20
		// 			congratulate()
		// 			startReset()
		// 		else {
		// 			nextPlay()
		// 		}
