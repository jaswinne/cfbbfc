class Game{
	constructor(inputArr){
		//
		//   Pulling data from input
		//

		this.loadInfoFromStringArray(inputArr);
	}

	loadInfoFromStringArray(inputArr){
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

		// if(inputArr.filter(function(item){
		// 	return item.toString().toLowerCase().includes("sch");
		// }).length > 0){
		// 	console.log(inputArr);
		// }

		//Parsing non mandatory fields (OT and location)
		if(index < inputArr.length){
			//Yet to be played
			if(inputArr[index].toLowerCase() === 'sch'){
				this.unplayed = true;
				index++;
			}//OT marker (can't be both)
			else if(inputArr[index].length < 3){
				this.OT = inputArr[index++]
			}

			//Now pulls city if it exists
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

		//assign home and away
		if(firstName.includes("@")){
			this.homeTeamLookupName = firstName.trim().replace("@","");
			this.homePoints = firstScore;
			this.awayTeamLookupName = secondName.trim();
			this.awayPoints = secondScore;
		}else{
			//neither team marked as home
			if(!secondName.includes("@")){
				this.isNeutral = true;
			}
			//home team is second team listed if neutral
			this.homeTeamLookupName = secondName.trim().replace("@","");
			this.homePoints = secondScore;
			this.awayTeamLookupName = firstName.trim();
			this.awayPoints = firstScore;
		}


		//
		//   Using it
		//
	}

	toString(){
		return this.hasBeenPlayed() ? `${this.date} ${this.gameScoreToString()}${this.OT ? " (" + this.OT + ") ":""}${this.neutralLocation ?  "  @ "+this.neutralLocation:""}`: "";
	}

	gameScoreToString(){
		return `@${this.homeTeamLookupName} ${this.homePoints}\t${this.awayTeamLookupName} ${this.awayPoints}`;
	}

	hasBeenPlayed(){
		//Either team has points, return true;
		return this.homePoints !== 0 || this.awayPoints !== 0;
	}

	winningTeam(){
		return this.hasBeenPlayed() ? (this.homePoints > this.awayPoints ? this.homeTeamLookupName : this.awayTeamLookupName) : undefined;
	}

	losingTeam(){
		return this.hasBeenPlayed() ? (this.homePoints > this.awayPoints ? this.awayTeamLookupName : this.homeTeamLookupName) : undefined;
	}

	homeTeamLookupName(){
		return this.homeTeamLookupName;
	}

	awayTeamLookupName(){
		return this.awayTeamLookupName;
	}

	homePoints(){
		return this.homePoints;
	}

	awayPoints(){
		return this.awayPoints;
	}
}

module.exports.Game = Game;