import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import AppContainer from './containers/AppContainer'
import {fetchGames, fetchTeams, fetchConferences} from './actions.js'

const loggerMiddleware = createLogger();
 
let store = createStore(
  myApp,
  applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  )
var dataFetch = () => {
  store.dispatch(fetchGames());
  store.dispatch(fetchTeams());
  store.dispatch(fetchConferences());
}


dataFetch();

render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('root')
)