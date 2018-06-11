import React, { Component } from 'react'
import Board from './components/Board'

class App extends Component {
  // State: 
  // 1. Board 
  // 2. Turn (white or red) 
  // 3. Game over 

  // Render the board here and pass into the Board as props 

  // On column button click, log button's row-col index 
  // "Drop" the piece into the button if: 
  // 1. The column isn't filled to the top 
  // 2. The button is empty 

  

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <Board />
      </div>
    );
  }
}

export default App