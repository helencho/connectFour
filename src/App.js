import React, { Component } from 'react'
import Board from './components/Board'

const redPiece = '🔴'
const whitePiece = '⚪'
// const redPiece = 'R'
// const whitePiece = 'W'

class App extends Component {
  // State: 
  // 1. Board 
  // 2. Turn (white or red) 
  // 3. Game over 
  constructor() {
    super()
    this.state = {
      board: [],
      turn: 'red',
      gameOver: false
    }
  }

  componentDidMount() {
    this.fillBoard()
  }

  // Render the board here and pass into the Board as props 
  fillBoard = () => {
    let board = []
    for (let row = 0; row < 6; row++) {
      board.push([])
      for (let col = 0; col < 7; col++) {
        board[row].push('')
      }
    }
    this.setState({
      board,
      gameOver: false
    })
  }

  // When user clicks new game, rerender the board
  clearBoard = () => {
    this.fillBoard()
  }

  findRow = (col) => {
    for (let x = 0; x < 6; x++) {
      if (x === 0 && this.state.board[x][col]) {
        // If user chooses 1st row and it's filled, return first row 
        // console.log(`Column is full!`)
        return null
      } else if (this.state.board[x][col]) {
        // If we find a row that's been filled, return the previous row 
        // console.log(`Dropping at ${x - 1}`)
        return x - 1
      } else if (x === 5) {
        // If we're at the last row, return last row 
        return x
      }
    }
  }

  checkVictory = (row, col) => {
    let count = 0
    let turn = this.state.turn

    // Check vertically 
    for (let x = row; x < 6; x++) {
      if (turn === 'red') {
        console.log(`Checking for red`)
        if (this.state.board[x][col] == redPiece) {
          count++
          console.log(count)
        } else {
          console.log(`break`)
          break
        }
      } else {
        console.log(`Checking for white`)
        if (this.state.board[x][col] == whitePiece) {
          count++
          console.log(count)
        } else {
          console.log(`break`)
          break
        }
      }
    }

    // If 4 rows are all of the same color (if count === 4) 
    // Toggle: game over, winner 
    if (count === 4) {
      return true
    }

    return false
  }

  // When user clicks on column, drop piece on the next available row 
  handleClick = (row, col) => {
    let newBoard = [...this.state.board]
    let dropRow = this.findRow(col)
    let turn = this.state.turn

    if (dropRow !== null) {
      if (turn === 'red') {
        newBoard[dropRow][col] = redPiece
        turn = 'white'
      } else {
        newBoard[dropRow][col] = whitePiece
        turn = 'red'
      }
      this.setState({
        board: newBoard
      })
    }

    let victory = this.checkVictory(dropRow, col)

    if (victory) {
      this.setState({
        gameOver: true
      })
    } else {
      this.setState({
        turn
      })
    }
  }

  render() {
    const { gameOver, turn } = this.state 

    return (
      <div>
        <h1>Connect Four</h1>
        <h3>{this.state.turn}</h3>
        <button onClick={this.clearBoard}>New game</button>
        <Board board={this.state.board} handleClick={this.handleClick} />
        <p>{gameOver ? `${turn} wins!` : null}</p>
      </div>
    );
  }
}

export default App