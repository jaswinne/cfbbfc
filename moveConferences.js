fs = require('fs');
request = require('request');

function loadTeams(){
	fs.readFile( __dirname + '/conferences.txt', function (err, data) {
	if (err) {
		throw err; 
	}
	var dataArr = data.toString().split(/\n/);
	console.log(dataArr);
	var index = 0;
	var teams = []
	var conferences = []
	while(index < dataArr.length){
		var confName = dataArr[index++];
		while(dataArr[index++].charAt(0) == "*"){
			var t = new Team(dataArr[index - 1].substring(1), confName);
			// Set the headers
			// var headers = {
			//     'Content-Type':     'application/x-www-form-urlencoded'
			// }

			// // Configure the request
			// var options = {
			//     url: 'http://limitless-fortress-25456.herokuapp.com/team/add',
			//     method: 'POST',
			//     headers: headers,
			//     form: {'nickname': `${t.lookupName}`, 'mascot': `${t.mascot}`, 'school':`${t.teamName}`}
			// }

			// // Start the request
			// request(options, function (error, response, body) {
			//     if (!error && response.statusCode == 200) {
			//         // Print out the response body
			//         console.log(body)
			//     }
			// })
			teams.push(t);
		}
		// Set the headers
			// var headers = {
			//     'Content-Type':     'application/x-www-form-urlencoded'
			// }

			// // Configure the request
			// var options = {
			//     url: 'http://limitless-fortress-25456.herokuapp.com/conference/add',
			//     method: 'POST',
			//     headers: headers,
			//     form: {'name': `${confName}`}
			// }

			// // Start the request
			// request(options, function (error, response, body) {
			//     if (!error && response.statusCode == 200) {
			//         // Print out the response body
			//         console.log(body)
			//     }
			// })
		conferences.push(confName);
	}
	//console.log(teams);
	//loadGames();
	});
}


class Team{
	constructor(name, conference){
		var arr = name.split(':');
		this.lookupName = arr[0];
		this.teamName = arr[1];
		this.mascot = arr[2];
		this.conference = conference;
		this.wins = 0;
		this.losses = 0;
		this.games = []
	}

	toString(){
		return `${this.teamName} ${this.mascot} : ${this.conference}`;
	}
}

class Game{
	constructor(team1, score1, team2, score2){
		if(team1.charAt(0) == "@"){
			this.homeTeam = team1;
			this.homeScore = score1;
			this.awayTeam = team2;
			this.awayScore = score2;
		}else{

			this.homeTeam = team2;
			this.homeScore = score2;
			this.awayTeam = team1;
			this.awayScore = score1;
		}
		setwinner();

	}

	setwinner(){
		if(this.homeScore > this.awayScore){
			this.homeWin = true;
		}else if(this.homeScore < this.awayScore){
			this.awayWin = true;
		}else{
			this.unplayed = true;
		}
	}
}
loadTeams();
