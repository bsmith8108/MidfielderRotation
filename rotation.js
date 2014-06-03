var player_list = [];
var start_date;
$(document).ready( function() {
	var submit = $("#submit"),
	done = $("#startgame"),
	playerbox = $("#players");
	submit.click(function() {
		var player = $("#player").val();
		$("#player").val("");
		var player_string = "<div class=\"player-class\" id=\""+player+"\" onclick=\"toggletime(\'"+player+"\')\">";
		player_string = player_string +player+"<span class=\"timeCum\">Cumulative: 0:00</span>";
		player_string = player_string +"<span class=\"timeCurrent\">Current: 0:00</span></div>";
		playerbox.append(player_string);
		player_list.push(player);
	});
	done.click(function() {
		$("#players-input").empty();
		start_date = new Date();
		startGame();
	}); 	
});

var playingtime = {};
var playing = {};
var currentWatch = {}
var timers = {};
var clocks = {};

function startGame() {
	var players_length = $("#players").children().length;
	console.log(players_length)
	for(var i=0; i<players_length; i++) {
		playingtime[player_list[i]]=0;
		playing[player_list[i]]=false;
		currentWatch[player_list[i]]=new Date();
		clocks[player_list[i]]=0;
	}
}
function toggletime(player) {	
	if (playing[player]) {
		playing[player] = false;
		stopTimer(player);
		var elapsed = new Date() - currentWatch[player];
		playingtime[player] = playingtime[player] + elapsed;
		updateColors();
	}
	else {
		playing[player] = true;
		startTimer(player);
		currentWatch[player] = new Date();
		updateColors();
	}
}

function updateColors() {
	var lowDomain = 10000000,
	highDomain = 0;
	for (var j=0; j<player_list.length; j++) {
		if (playingtime[player_list[j]] > highDomain) {
			highDomain = playingtime[player_list[j]];
		}
		if (playingtime[player_list[j]] < lowDomain) {
			lowDomain = playingtime[player_list[j]];
		}
	}
	var middle = (highDomain-lowDomain) + lowDomain;
	var color = d3.scale.linear()
		.domain([lowDomain,highDomain])
		.range(["red","green"]);
	for (var i=0; i<player_list.length; i++) {
		if (playing[player_list[i]]) {
			$("#"+player_list[i]).css("background-color","yellow");
		}
		else {
			$("#"+player_list[i]).css("background-color",color(playingtime[player_list[i]]));
		}
	}
}

var offsets = {};
var current = {};

function startTimer(person) {
	offsets[person] = Date.now();
	current[person] = 0;
	var id = setInterval(function() {updateTimer(person)}, 1000);
	timers[person] = id;
}

function updateTimer(person) {
	var now = Date.now();
	var d  = now - offsets[person];
	offsets[person] = now;
	clocks[person] += d;
	current[person] += d;
	render(person);
}

function stopTimer(person) {
	clearInterval(timers[person]);
	var span = $("div#"+person).children()[1];
	span.innerHTML = "Current: 0:00";
}

function render(person) {
	var minutes = Math.floor(clocks[person]/60000);
	var seconds = Math.floor(clocks[person]/1000);
	seconds = seconds%60;
	if (seconds.toString().length == 1) {
		var time_string = minutes.toString()+":0"+seconds.toString();
	}
	else {
		var time_string = minutes.toString()+":"+seconds.toString();
	}
	
	var span = $("div#"+person).children()[0];
	span.innerHTML = "Cumulative: " + time_string;
	
	var minutes = Math.floor(current[person]/60000);
	var seconds = Math.floor(current[person]/1000);
	seconds = seconds%60;
	if (seconds.toString().length == 1) {
		var time_string = minutes.toString()+":0"+seconds.toString();
	}
	else {
		var time_string = minutes.toString()+":"+seconds.toString();
	}
	
	var span = $("div#"+person).children()[1];
	span.innerHTML = "Current: " + time_string;
}
