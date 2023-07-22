import React from 'react';
import './App.css';
import Player from './components/Player/Player';
import {PlayersCount} from "./components/Player/EnumsAndTypes";

function App() {
  return (
    <div className="App">
     <Player defaultPlayersCount={PlayersCount.Nine} containerSize={'90%'}/>
    </div>
  );
}

export default App;
