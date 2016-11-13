fs = require('fs');
fs.readFile( __dirname + '/Conferences', function (err, data) {
  if (err) {
    throw err; 
  }
  //console.log(data.toString());
  var dataArr = data.toString().split(/\n/);
  console.log(dataArr);
  var index = 0;
  var conferences = []
  while(index < dataArr.length){
  	var name = dataArr[index++];
  	var teams = [];
  	while(dataArr[index++].charAt(0) == "*"){
  		teams.push(dataArr[index - 1].substring(1));
  	}
  	conferences.push(new Conference(name, teams));
  }
  console.log(JSON.stringify(conferences));
});

class Conference{
	constructor(name, teamNames){
		this.name = name;
		this.teams = [];
		for(var l = 0; l < teamNames.length; l++){
			this.teams.push(new Team(teamNames[l], name));
		}
	}
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