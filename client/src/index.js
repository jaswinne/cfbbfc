import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import AppContainer from './containers/AppContainer'
import {fetchPosts} from './actions.js'

const loggerMiddleware = createLogger();

let store = createStore(
	myApp,
	applyMiddleware(
    	thunkMiddleware, // lets us dispatch() functions
    	loggerMiddleware // neat middleware that logs actions
  	)
	)

store.dispatch(fetchPosts())

render(
  <Provider store={store}>
    <AppContainer games={store.getState().games}/>
  </Provider>,
  document.getElementById('root')
)