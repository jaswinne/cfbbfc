fs = require('fs');
loadTeams();


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
			teams.push(new Team(dataArr[index - 1].substring(1), confName));
		}
		conferences.push(confName);
	}
	console.log(teams);
	//loadGames();
	});
}


class Team{
	constructor(name, conference){
		this.teamName = name;
		this.conference = conference;
		this.wins = 0;
		this.losses = 0;
		console.log(toString())
	}

	toString(){
		return `${this.teamName} ${this.conference}`;
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