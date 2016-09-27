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
let isPlaying = false;
let sequenceArr = [];
let buttonPressesArr = [];


function resetGameState() {
	sequenceArr = [];
	buttonPressesArr = [];
}

function congratulate() {
	// flash lights or something in sequence
	$(".count-display p").html("WIN");
	$(".quad").fadeOut(200).fadeIn(100).fadeOut(200).fadeIn(100).fadeOut(200).fadeIn(100);
}

function powerToggle() {
	if (!isOn) {
		isOn = true;
		$(".on-off-button").css("background-color", "#ff8000");
		$(".count-display p").html("--").hide();
		$(".count-display p").fadeIn(300);
		resetGameState();
		console.log('isOn = ' + isOn + ': Powered On');
		// TODO: try making opacity when off: $(this).css({opacity: '0.6'}) so buttons look more like they're lighting up when pressed.
	} else {
		isOn = false;
		$(".on-off-button").css("background-color", "#ff0000");
		$(".count-display p").fadeOut(1000);
		console.log('isOn = ' + isOn + ': Powered Off');
	}
	// TODO: make this button into a slider switch
}

function strictToggle() {
	if (isOn && !isStrict) {
		isStrict = true;
		$(".strict-button-indicator").css("background-color", "#DC0007");
		console.log('isStrict = ' + isStrict + ': Strict mode is now on');
	} else {
		isStrict = false;
		$(".strict-button-indicator").css("background-color", "black");
		console.log('isStrict = ' + isStrict + ': Strict mode is now off');
		// note, to enable fade in/out of colours, you have to use a 3rd party plugin: https://github.com/jquery/jquery-color/
	}
}

function startReset() {
	console.log('startReset pressed, if powered on, it will reset and start the game');
	if (isOn) {
		console.log('isOn = ' + isOn + ': system reset');
		isPlaying = true;
		$(".count-display p").html("--").hide();
		$(".count-display p").fadeIn(200).fadeOut(200).fadeIn(200);
		resetGameState();
		nextPlay();
	}
}

function nextPlay() {
	// Choose random number 1-4, and add to sequenceArr
	var randomButton = Math.floor(Math.random() * 4) + 1;
	sequenceArr.push(randomButton);
	// for each num in array, flash and play sound for that quadrant
	sequenceArr.forEach(flashButtonSequence);  // FIXME - need some kind of callback here?
}

function flashButtonSequence(item) {
	setTimeout(function(){ $("#"+item).fadeOut(300).fadeIn(200); }, 1000);
}

function checkButtonPressesMatch() {
	// 	each entry in buttonPressesArr is matched to corresponding entry in sequence...
	// 		if a mismatch is found
	//			Fail noise, and !! in display
	// 			if presses === sequence, nextPlay
	// 			else if (!strict)
	// 				repeat current sequence
	// 			else if (strict)
	// 				startResetGame()
	// 		else if buttonPressesArr.length === 20
	// 			congratulate()
	// 			startReset()
	// 		else {
	//			reset the buttonPressesArr (it has to be checked fresh each time)
				//buttonPressesArr = [];
	//			var level = buttonPressesArr.length
	//			update display
	//
	// 		}
	console.log('array comparison here');
}

$(".on-off-button").click(function(){
	powerToggle();
});

$(".strict-button").click(function(){
	strictToggle();
});

$(".start-reset-button").click(function(){
	startReset();
});

// quadrant click handler
$(".quad").click(function(){
	if (isOn && isPlaying) {
		//$(this).fadeOut(200).fadeIn(100);
		// 	TODO: depresses, lights up, makes noise
		buttonPressesArr.push(parseInt(this.id));
		if (buttonPressesArr.length === sequenceArr.length) {
			checkButtonPressesMatch();
		}
		console.log(buttonPressesArr);

	}
});
