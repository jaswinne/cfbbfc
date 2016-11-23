import {RECEIVE_GAMES} from './actions.js'

const games = (state = {games:[]}, action) => {
  switch (action.type) {
    case RECEIVE_GAMES:
          return Object.assign(
            {}, 
            state, 
            {
              games: action.games
            }
          );
    default:
      return state;
  }
}

export default games