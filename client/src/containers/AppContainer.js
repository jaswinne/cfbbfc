import { connect } from 'react-redux'
import App from '../components/App'

const parseGames = (JSONgames) =>{
	var games = JSONgames.sort(
			function(a, b){

				var dateA = new Date(a.date);
				var dateB = new Date(b.date);

				return dateA - dateB;
			}	
			).map(function(game){
			return {
				homeTeam : game.home_team.school,
				homeScore : game.home_team.score,
				roadTeam : game.away_team.school,
				roadScore : game.away_team.score,
				date : game.date
			}
	})
	return games;
}

const mapStateToProps = (state) => {
	return {
		games : parseGames(state.games),
		visibleGames : parseGames(state.visibleGames)
	}
}




const AppContainer = connect(
	mapStateToProps
)(App)

export default AppContainer