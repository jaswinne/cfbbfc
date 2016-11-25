import fetch from 'isomorphic-fetch'

export const REQUEST_GAMES = 'REQUEST_GAMES'
function requestGames() {
  return {
	type: REQUEST_GAMES
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
function receiveGames(json) {
  return {
	type: RECEIVE_GAMES,
	games: json.games,
	receivedAt: Date.now()
  }
}

export function fetchGames() {
  return dispatch => {
	dispatch(requestGames());
	return fetch('http://limitless-fortress-25456.herokuapp.com/games')
	  .then(response => response.json())
	  .then(json => dispatch(receiveGames(json)))
  }
}


export const REQUEST_TEAMS = 'REQUEST_TEAMS'
function requestTeams() {
  return {
	type: REQUEST_TEAMS
  }
}

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS'
function receiveTeams(json) {
  return {
	type: RECEIVE_TEAMS,
	teams: json.team,
	receivedAt: Date.now()
  }
}


export function fetchTeams() {
  return dispatch => {
	dispatch(requestTeams());
	return fetch('http://limitless-fortress-25456.herokuapp.com/teams')
	  .then(response => response.json())
	  .then(json => dispatch(receiveTeams(json)))
  }
}

export const REQUEST_CONFERENCES = 'REQUEST_CONFERENCES'
function requestConferences() {
  return {
	type: REQUEST_CONFERENCES
  }
}

export const RECEIVE_CONFERENCES = 'RECEIVE_CONFERENCES'
function receiveConferences(json) {
  return {
	type: RECEIVE_CONFERENCES,
	conferences: json.conferences,
	receivedAt: Date.now()
  }
}


export function fetchConferences() {
  return dispatch => {
	dispatch(requestConferences());
	return fetch('http://limitless-fortress-25456.herokuapp.com/conferences')
	  .then(response => response.json())
	  .then(json => dispatch(receiveConferences(json)))
  }
}


export const CHANGE_SEARCH = 'CHANGE_SEARCH';
export function changeSearchTerm(searchTerm){
	return {
		type: CHANGE_SEARCH,
		searchTerm: searchTerm.trim()
	}
}


export const CHANGE_TEAM_DROP_DOWN= 'CHANGE_TEAM_DROP_DOWN';
export function changeTeamDropdown(searchTerm){
	return {
		type : CHANGE_TEAM_DROP_DOWN,
		teamDropdownVisible : searchTerm.trim().length !== 0 
	}
}