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
		var secondScore = Number(inputArr[index++]);


		if(index < inputArr.length){
			if(inputArr[index].length < 3){
				this.OT = inputArr[index++]
			}
			if(index < inputArr.length){
				this.neutralLocation = "";
				while(index < inputArr.length){
					this.neutralLocation += inputArr[index++] + " ";
				}
				if(this.neutralLocation.trim().length === 0){
					this.neutralLocation = undefined;
				}
			}
		}
		//
		//   Using it
		//

		this.score = new Score(firstName, firstScore, secondName, secondScore);
	}

	toString(){
		return this.hasBeenPlayed() ? `${this.date} ${this.score.toString()}${this.OT ? " (" + this.OT + ") ":""}${this.neutralLocation ?  "  @ "+this.neutralLocation:""}`: "";
	}

	hasBeenPlayed(){
		return this.score.hasBeenPlayed();
	}

	getWinner(){
		return this.score.winner(); 
	}
}

module.exports.Game = Game;