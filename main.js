// Simon Game from FreeCodeCamp

// User Story: I am presented with a random series of button presses.
// User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
// User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
// User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
// User Story: I can see how many steps are in the current series of button presses.
// User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
// User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
// User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

// IDEA: Timeout if not pressed a button in x secs then it resets to the start

'use strict';  // Recommended as best practice.

const MAX_LEVEL = 20;
let isOn = false;
let isStrict = false;
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
	// FIXME: There is craziness if turning off you can then still press buttons and the clickhandler still fires. Maybe add an if isOn to the click handler?
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
	// TODO: when the power button is switched off, any sequences currently playing should but cut short and stop
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
	document.getElementById('simonSound'+buttonId).play();
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
		// FIXME: this should cancel any sequences/sounds playing. Currently the flashButtonSequence will continue until finished. How do I cut it short?
		console.log('isOn = ' + isOn + ': system reset');
		$(".count-display p").html("1").hide().fadeIn(200).fadeOut(200).fadeIn(200);
		resetGameState();
		nextPlay();
	}
}

function nextPlay() {
	// Choose random quadrant, and append to the sequence
	let randomButton = Math.floor(Math.random() * 4) + 1;
	sequenceArr.push(randomButton);
	console.log('Sequence is: ' + sequenceArr);
	flashButtonSequence(sequenceArr);
	$(".count-display p").html(sequenceArr.length);
}

function compareIndexVals(buttonPressesArr, sequenceArr) {
	// TODO: Don't think this is very efficient as it checks every element, every time. Also, get rid of the for loop. Is there an inbuilt method to compare two arrays?
    for (let i = 0; i < buttonPressesArr.length; i++) {	// FIXME: dirty code smell? use .reduce instead?
        if ( buttonPressesArr[i] !== sequenceArr[i] ) {
            return false;
        }
    }
    return true;
}

// quadrant click handler
$(".quad").click(function(){
	// FIXME: Ohh-errr...there's some weirdness going on if you click too much... :-/ Perhaps a flag of some kind to prevent you clicking whilst a flashButtonSequence is playing?
	// FIXME: Should all this spaghetti code be in a click handler? Is this bad form?
	// TODO: 3D depresses on buttons
	$(this).fadeOut(200).fadeIn(200);
	document.getElementById('simonSound' + this.id).play();

	buttonPressesArr.push( parseInt(this.id) );
	console.log('buttonPressesArr: ' + buttonPressesArr);

	//if player got the sequence correct
	if ( compareIndexVals(buttonPressesArr, sequenceArr) ) {
		//if final level reached
		if (buttonPressesArr.length === sequenceArr.length && sequenceArr.length === MAX_LEVEL) {
			congratulate();
			//else if just the sequence was correct for that level
		} else if ( buttonPressesArr.length === sequenceArr.length ) {
			buttonPressesArr = [];
			nextPlay();
		}
	//if sequence was not correct
	} else {
		// TODO: play the error grrrrrr sound here!
		// TODO: break these fails out into functions, strictFail, nonStrictFail?
		// TODO: look at these multiple fadeIn/FadeOut bleuchhh... DRY it up.
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
				$(".count-display p").html(sequenceArr.length).fadeIn(function() {
					flashButtonSequence(sequenceArr);
				});
			});
			console.log('Sequence is: ' + sequenceArr);
			console.log('buttonPressesArr: ' + buttonPressesArr);
		}
	}
});
