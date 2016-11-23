import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import GameView from './GameView'

class App extends Component {
    render() {
      return (
        <div >
          <div> {this.props.games.map(this.createGameView)}</div>
        </div>
      );
    }
    createGameView(obj){
      return (<GameView date={obj.date} homeTeam={obj.homeTeam} homeScore={obj.homeScore} roadTeam={obj.roadTeam} roadScore={obj.roadScore}/>);
    }
}

export default App;
