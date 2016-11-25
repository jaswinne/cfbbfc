import React, { Component } from 'react';
import '../App.css';
import GameView from './GameView'
import TeamSearchContainer from '../containers/TeamSearchContainer'


    var id = 0;
class App extends Component {
    render() {
      return (
        <div >
          <TeamSearchContainer/>
          <div> {this.props.visibleGames.map(this.createGameView)}</div>
        </div>
      );
    }
    createGameView(obj){
      return (<GameView date={obj.date} key={id++} homeTeam={obj.homeTeam} homeScore={obj.homeScore} roadTeam={obj.roadTeam} roadScore={obj.roadScore}/>);
    }
}

export default App;
