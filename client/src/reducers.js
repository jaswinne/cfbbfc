import {RECEIVE_GAMES, CHANGE_SEARCH, RECEIVE_TEAMS, RECEIVE_CONFERENCES, CHANGE_TEAM_DROP_DOWN} from './actions.js'

const games = (state = {
              games:[],
              visibleGames:[],
              teams: [],
              conferences: [],
              teamDropdownVisible: false,
              defaultName: 'Arkansas'}, action) => {


  switch (action.type) {
    case RECEIVE_GAMES:
          return Object.assign(
            {}, 
            state, 
            {
              games: action.games
            }
          );
    case CHANGE_SEARCH:
            var visibleGames = state.games.filter((game) => {
              return game.home_team.school.toLowerCase() === action.searchTerm.toLowerCase() 
                  || game.away_team.school.toLowerCase() === action.searchTerm.toLowerCase();
            });
           return Object.assign(
            {}, 
            state, 
            {
              searchTerm: action.searchTerm,
              visibleGames : visibleGames
            }
           );
    case RECEIVE_TEAMS:
          return Object.assign(
            {}, 
            state, 
            {
              teams : action.teams,
            }
           );
    case RECEIVE_CONFERENCES:
          return Object.assign(
            {}, 
            state, 
            {
              conferences : action.conferences,
            }
           );
    case CHANGE_TEAM_DROP_DOWN:
           var matchTeams = state.teams.filter(
              (team) => {
                return team.school.toLowerCase().includes(state.searchTerm.toLowerCase());
              })
           return Object.assign(
            {}, 
            state, 
            {
              dropVisibleTeams : matchTeams,
              teamDropdownVisible: action.teamDropdownVisible
            }
           );   
    default:
      return state;
  }
}

export default games