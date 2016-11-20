class Score{
	constructor(team0, score0, team1, score1){
		this.team0 = team0;
		this.score0 = score0;
		this.team1 = team1;
		this.score1 = score1;
		this.neutralSite = false;

		var isHome0 = team0.includes("@");
		var isHome1 = team1.includes("@");
		if(isHome0 || isHome1){
			this.homeIndex = isHome0 ? 0 : 1;
		}
		this.team0 = this.team0.replace("@", "");
		this.team1 = this.team1.replace("@", "");
	}

	//
	// -1 indicates neutral
	//
	isNeutral(){
		return this.homeIndex === -1;
	}

	toString(){
		var team0Display = this.team0 + " " + this.score0;
		var team1Display = this.team1 + " " + this.score1;

		if(this.homeIndex == 0)
			team0Display = "(@)" + team0Display;
		if(this.homeIndex == 1)
			team1Display = "(@)" + team1Display;
		return team0Display + "\t" + team1Display;
	}

	hasBeenPlayed(){
		return this.score0 != 0 || this.score1 != 0;
	}

	winningTeam(){
		return this.hasBeenPlayed() ? (this.score0 > this.score1 ? this.team0 : this.team1) : undefined;
	}

	losingTeam(){
		return this.hasBeenPlayed() ? (this.score0 > this.score1 ? this.team1 : this.team0) : undefined;
	}	

}

module.exports.Score = Score;