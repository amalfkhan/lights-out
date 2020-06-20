import React, { Component } from "react";
import Board from "./Board";
import "./App.css";

// LightsOut game
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Board />
      </div>
    );
  }
}

export default App;
