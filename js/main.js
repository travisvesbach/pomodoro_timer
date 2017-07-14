/*
Pomodoro Timer
*/ 

//Global Variables
var sessionTimer = 25;
var breakTimer = 5;
var hours = 0;
var minutes = 0;
var seconds = 0;
var totalSeconds = 0;
var interval = false;

//main function
$(document).ready(function(){

setTimer();

$('#session-up').on('click', sessionUp);
$('#session-down').on('click', sessionDown);
$('#break-up').on('click', breakUp);
$('#break-down').on('click', breakDown);


$('.start').on('click', startCountdown);
$('.pause').on('click', pauseCountdown);
$('.stop').on('click', stopCountdown);
$('.reset').on('click', resetCountdown);

});

//to change the full timer time into seconds
function toSeconds (timerMinutes) {
	totalSeconds = timerMinutes * 60;
}

//to set the current hours, minutes, and seconds
function setVariables(currentSeconds) {
	seconds = 0
	if (currentSeconds / 60 >= 1) {
		minutes = Math.floor(currentSeconds / 60);
		seconds = currentSeconds % 60;
	} else {
		minutes = 0;
		hours = 0;
		seconds = currentSeconds
	}
	if ( minutes / 60 >= 1) {
		hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
	} else {
		hours = 0;
	}
}


//to set/reset the timer
function setTimer() {
	if($('#countdown').hasClass('work')) {
		$('#current-timer').html('Session');
		toSeconds(sessionTimer);
		displayTimer();
	} else {
		$('#current-timer').html('Break');	
		toSeconds(breakTimer);
		displayTimer();
	}

}

//to display the timer on the webpage
function displayTimer() {
	setVariables(totalSeconds)
	if (totalSeconds <= 30 && totalSeconds > 10) {
		$('.time').css("color", "yellow");
	} else if (totalSeconds <= 10) {
		$('.time').css("color", "red");
	} else if (interval != false) {
		$('.time').css("color", "green");
	} else {
		$('.time').css("color", "white");
	}

	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (hours < 10 && hours > 0) {
		hours = '0' + hours
	}

	if (hours > 0) {
		$('.time').html(hours + ':' + minutes + ':' + seconds)
	} else {
		$('.time').html(minutes + ':' + seconds);
	}
}

//to change between the timer between session(work) and break(rest)
function changeTimer() {
	if($('#countdown').hasClass('work') ){
		$('#countdown').removeClass('work').addClass('rest');
		setTimer();
	} else {
		$('#countdown').removeClass('rest').addClass('work');
		setTimer();
	}
}

//to increase the time for the session timer
function sessionUp() {
	if (interval == false) {
		sessionTimer = sessionTimer + 1;
		$('#session-time').text(sessionTimer);
		if($('#countdown').hasClass('work')) {
			setTimer();
		}
	}
}

//to decrease the time for the session timer
function sessionDown() {
	if(interval == false) {
		if (sessionTimer != 1) {
			sessionTimer = sessionTimer - 1;
			$('#session-time').text(sessionTimer);
		}
		if($('#countdown').hasClass('work')) {
			setTimer();
		}
	}

}

//to increase the time of the break timer
function breakUp() {
	if (interval == false) {
		breakTimer = breakTimer + 1;
		$('#break-time').text(breakTimer);
		if($('#countdown').hasClass('rest')) {
			setTimer();
		}
	}
}

//to decrease the time of the break timer
function breakDown() {
	if (interval == false) {
		if (breakTimer != 1) {
			breakTimer = breakTimer - 1;
			$('#break-time').text(breakTimer);
			if($('#countdown').hasClass('rest')) {
				setTimer();
			}
		}
	}
}

//to start the timer
function startCountdown() {
	if (interval == false || interval == 'pause') {
		interval = setInterval(countdown, 1000);
	}
}

//lose 1 second every second, update the display, change timer when it hits 0
function countdown() {
	totalSeconds = totalSeconds - 1;
	displayTimer();
	if(totalSeconds < 0) {
		changeTimer();
	}
}

//to pause the timer
function pauseCountdown() {
	clearInterval(interval);
	interval = 'pause';
}

//to stop the timer and reset it to its starting value
function stopCountdown() {
	clearInterval(interval);
	interval = false;
	if($('#countdown').hasClass('rest') ) {
		changeTimer();
	}
	setTimer();
}

//to reset the timer to the default values
function resetCountdown() {
	sessionTimer = 25;
	breakTimer = 5;
	clearInterval(interval);
	interval = false;
	if($('#countdown').hasClass('rest') ) {
		changeTimer();
	}
	setTimer();
	$('#break-time').text(breakTimer);
	$('#session-time').text(sessionTimer);
}

