var Score = require('./Score').Score;

class Game{
	constructor(inputArr){
		//
		//   Pulling data from input
		//
		var index = 0;

		this.date = inputArr[index++];


		var firstName = "";
		while(isNaN(inputArr[index])){
			firstName += inputArr[index++] + " ";
		}
		var firstScore = Number(inputArr[index++]);
		
		var secondName = "";
		while(isNaN(inputArr[index])){
			secondName += inputArr[index++] + " ";
		}
		var secondScore = Number(inputArr[index]);

		//
		//   Using it
		//

		this.score = new Score(firstName, firstScore, secondName, secondScore);
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

module.exports.Game = Game;