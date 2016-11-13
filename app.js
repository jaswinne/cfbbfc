var http = require('http');
var os = require('os');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.masseyratings.com',
  path: '/scores.php?s=286577&sub=12801&all=1&mode=2&sch=on&format=0'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    loadIntoFile(str);
    response.removeAllListeners('data');
  });
}
var gamesObj = [];
loadIntoFile = function(input){
	var inp = input.substring(input.indexOf("<pre>") + 5, input.indexOf("</pre>"));
	gamesArray = inp.split(os.EOL);

	gamesArray.forEach(function(item, index){
		var array = item.split(/\s+/);
		if(array.length > 4){
			gamesObj.push(new Game(item.split(/\s+/)));
			if(gamesObj[index].hasBeenPlayed()){
				console.log(gamesObj[index].toString());
			}
		}
	});
}



class Game{
	constructor(inputArr){
		//
		//   Pulling data from input
		//

		this.date = inputArr[0];
		var index = 1;
		this.firstName = "";
		while(isNaN(inputArr[index])){
			this.firstName += inputArr[index++] + " ";
		}
		this.firstScore = inputArr[index++];
		this.secondName = "";
		while(isNaN(inputArr[index])){
			this.secondName += inputArr[index++] + " ";
		}
		this.secondScore = inputArr[index];

		//
		//   Using it
		//

		this.score = new Score(this.firstName, this.firstScore, this.secondName, this.secondScore);
	}

	toString(){
		return this.hasBeenPlayed() ? `${this.date} ${this.score.toString()}` : "";
	}

	hasBeenPlayed(){
		return this.score.hasBeenPlayed();
	}

	getWinner(){
		return this.score.winner(); 
	}
}

class Score{
	constructor(team0, score0, team1, score1){
		this.team0 = team0;
		this.score0 = score0;
		this.team1 = team1;
		this.score1 = score1;
		this.homeIndex = -1;
		this.neutralSite = false;

		var isHome0 = team0.includes("@");
		var isHome1 = team1.includes("@");
		if(!isHome0 && !isHome1){
			this.neutralSite = true;
		}else{
			this.homeIndex = isHome0 ? 0 : 1;
		}
		this.team0 = this.team0.replace("@", "");
		this.team1 = this.team1.replace("@", "");
	}

	isNeutral(){
		return this.neutralSite;
	}

	toString(){
		return this.team0 + " " + this.score0 + "     " + this.team1 + " " + this.score1;
	}

	hasBeenPlayed(){
		return this.score0 != 0 || this.score1 != 0;
	}

	winner(){
		return this.hasBeenPlayed() ? (this.score0 > this.score1 ? this.team0 : this.team1) : null;
	}	

}

var req = http.request(options, callback).end();
