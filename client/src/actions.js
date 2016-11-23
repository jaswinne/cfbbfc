import fetch from 'isomorphic-fetch'

export const REQUEST_GAMES = 'REQUEST_GAMES'
function requestPosts() {
  return {
    type: REQUEST_GAMES
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
function receivePosts(json) {
  return {
    type: RECEIVE_GAMES,
    games: json.games,
    receivedAt: Date.now()
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch('http://limitless-fortress-25456.herokuapp.com/games')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

