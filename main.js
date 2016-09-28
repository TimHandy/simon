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

$(".on-off-button").click(function(){
	powerToggle();
});

$(".strict-button").click(function(){
	strictToggle();
});

$(".start-reset-button").click(function(){
	startReset();
});

function resetGameState() {
	sequenceArr = [];
	buttonPressesArr = [];
}

function congratulate() {
	// flash lights or something in sequence
	$(".count-display p").html("WIN");  // TODO: make this '20' 'YOU' 'WON' '20' 'YOU' 'WON'...
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
		resetGameState();
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

function flashButton(buttonId) {
	$("#"+buttonId).fadeOut(300).fadeIn(200);
}

// flash and play sound for that quadrant
function flashButtonSequence(sequenceArr) {
	// iterate through the sequenceArr.shift? then with a timeout? to flash the lights? forEach is asynchronous I think, so won't work.
	let clonedSequenceArr = sequenceArr.slice(0);  // .slice(0) is a way to clone an array... only does a shallow clone
	function loop() {
	    setTimeout(function() {
			let button = clonedSequenceArr.shift();
			flashButton(button);
	        //console.log(button)
	        if (clonedSequenceArr.length > 0) {
	            loop();
	        }
	    }, 1000);
	}
	loop();
}

function startReset() {
	if (isOn) {
		console.log('isOn = ' + isOn + ': system reset');
		isPlaying = true;
		$(".count-display p").html("--").hide().fadeIn(200).fadeOut(200).fadeIn(200);
		resetGameState();
		nextPlay();
	}
}

function nextPlay() {
	// Choose random quadrant, and append to the sequence
	var randomButton = Math.floor(Math.random() * 4) + 1;
	sequenceArr.push(randomButton);
	console.log('Sequence is: ' + sequenceArr);
	flashButtonSequence(sequenceArr);
}

function compareIndexVals(buttonPressesArr, sequenceArr) {
	// TODO: Don't think this is very efficient as it checks every element, every time. Also, get rid of the for loop. Is there an inbuilt method to compare two arrays?
    for (var i = 0; i < buttonPressesArr.length; i++) {	// FIXME: dirty code smell? use .reduce instead?
        if ( buttonPressesArr[i] !== sequenceArr[i] ) {
            return false;
        }
    }
    return true;
}

// quadrant click handler
$(".quad").click(function(){
	// 	TODO: depresses, lights up, makes noise
	$(this).fadeOut(200).fadeIn(200);

	buttonPressesArr.push( parseInt(this.id) );
	console.log('buttonPressesArr: ' + buttonPressesArr);

	//if player got the sequence correct
	if ( compareIndexVals(buttonPressesArr, sequenceArr) ) {
		//if final level reached
		if (buttonPressesArr.length === sequenceArr.length && sequenceArr.length === 10) {
			congratulate();
			//else if just the sequence was correct for that level
		} else if ( buttonPressesArr.length === sequenceArr.length ) {
			$(".count-display p").html(sequenceArr.length);
			buttonPressesArr = [];
			nextPlay();
		}
		//if sequence was not correct
	} else {
		console.log('fail');
		$(".count-display p").html("!!!").fadeOut(400).fadeIn(20).fadeOut(400).fadeOut(400).fadeIn(20);
		$(".count-display p").html(sequenceArr.length);
		// if strict mode on
		if (isStrict) {
			$(".count-display p").html("!!!").fadeOut(400).fadeIn(20).fadeOut(400).fadeOut(400).fadeIn(20, function() {
				startReset();
			});
			//if strict mode off
		} else if (!isStrict) {
			$(".count-display p").html("!!!").fadeOut(400).fadeIn(20).fadeOut(400).fadeOut(400).fadeIn(20, function() {
				buttonPressesArr = [];
				$(".count-display p").html(sequenceArr.length -1).fadeIn(function() {
					flashButtonSequence(sequenceArr);
				});
			});
			console.log('Sequence is: ' + sequenceArr);
			console.log('buttonPressesArr: ' + buttonPressesArr);
		}
	}
});
