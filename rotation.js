var player_list = [];
var start_date;
$(document).ready( function() {
	var submit = $("#submit"),
	done = $("#startgame"),
	playerbox = $("#players");
	console.log("here")
	submit.click(function() {
		var player = $("#player").val();
		console.log("Player to be passed: ",typeof player)
		playerbox.append("<div class=\"player-class\" id=\""+player+"\" onclick=\"toggletime(\'"+player+"\')\">"+player+"</div>");
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
function startGame() {
	var players_length = $("#players").children().length;
	console.log(players_length)
	for(var i=0; i<players_length; i++) {
		playingtime[player_list[i]]=0;
		playing[player_list[i]]=false;
		currentWatch[player_list[i]]=new Date();
	}
}
function toggletime(player) {	
	if (playing[player]) {
		playing[player] = false;
		var elapsed = new Date() - currentWatch[player];
		playingtime[player] = playingtime[player] + elapsed;
		console.log(playingtime[player])
		updateColors();
	}
	else {
		playing[player] = true;
		currentWatch[player] = new Date();
		updateColors();
	}
}

function updateColors() {
	for (var i=0; i<player_list.length; i++) {
		if (playing[player_list[i]]) {
			$("#"+player_list[i]).css("background-color","yellow");
		}
		else {
			$("#"+player_list[i]).css("background-color","red");
		}
	}
}
