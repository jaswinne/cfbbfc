var fs = require('fs');
var request = require('request');

const baseURL = 'http://limitless-fortress-25456.herokuapp.com'

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
			var conferenceName = dataArr[index++];

			conferences.push(conferenceName);

			conferencesPost(conferenceName);

			while(dataArr[index++].charAt(0) == "*"){

				var team = new Team(dataArr[index - 1].substring(1), conferenceName);
			
				teams.push(team);

				teamsPost(team);
			}

		}
		teams.forEach(function(team){
				teamsToConferencesPost(team);
		});
	});
}

function conferencesPost(conferenceName){
	var headers = {
	    'Content-Type':     'application/x-www-form-urlencoded'
	}

	var options = {
	    url: `${baseURL}/conference/add`,
	    method: 'POST',
	    headers: headers,
	    form: {'name': `${conferenceName}`}
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode != 200) {
	        console.log(body)
	    }
	})
}

function teamsPost(team){
	var headers = {
	    'Content-Type':     'application/x-www-form-urlencoded'
	}

	var options = {
	    url: `${baseURL}/team/add`,
	    method: 'POST',
	    headers: headers,
	    form: {'nickname': `${team.lookupName}`, 
	    'mascot': `${team.mascot}`, 
	    'school':`${team.teamName}`, 
	    'conference':`${team.conference}`}
	}

	request(options, function (error, response, body) {
	    if (!error && response.statusCode != 200) {
	        console.log(body)
	    }
	});
}

function teamsToConferencesPost(team){
	var headers = {
	    'Content-Type':     'application/x-www-form-urlencoded'
	}

	var options = {
	    url: `${baseURL}/conference/add/team`,
	    method: 'POST',
	    headers: headers,
	    form: {'school':`${team.teamName}`,
	    'conference':`${team.conference}`}
	}
	request(options, function (error, response, body) {
	    if (!error && response.statusCode != 200) {
	        console.log(body);
	    }
	});
}

//Local class to help with db setup
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

loadTeams();
