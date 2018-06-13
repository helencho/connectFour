import React, { Component } from 'react'
import Board from './components/Board'

const whitePiece = '⚪'
const bluePiece = '🔵'

class App extends Component {
  constructor() {
    super()
    this.state = {
      board: [],
      turn: 'blue',
      gameOver: false,
      targetRow: null,
      targetCol: null
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
        board[row].push(null)
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

  // Find the first empty slot in given column 
  findRow = (col) => {
    for (let x = 0; x < 6; x++) {
      if (x === 0 && this.state.board[x][col]) {
        // If user chooses 1st row and it's filled, return null
        return null

      } else if (this.state.board[x][col]) {
        // If we find a row that's been filled, return the previous row 
        return x - 1

      } else if (x === 5) {
        // If we're at the last row, return last row 
        return x

      }
    }
  }

  // Vertical victory check 
  checkColumns = (row, col) => {
    const { board } = this.state
    let count = 0
    let piece = board[row][col]
    for (let x = row; x < 6; x++) {
      if (board[x][col] === piece) {
        count++
      } else {
        break
      }
    }
    // Return boolean  
    return count === 4
  }

  // Horizontal victory check 
  checkRows = (row) => {
    const { board } = this.state

    // Check the row, form left to right 
    for (let y = 0; y < board[row].length - 3; y++) {
      let piece = board[row][y]

      // Slot is empty 
      if (!piece) {
        continue
      }

      // Check 3 pieces to the right of target piece 
      if (piece === board[row][y + 1] &&
        piece === board[row][y + 2] &&
        piece === board[row][y + 3]) {
        return true
      }
    }
    return false
  }

  // Top left to bottom right victory check 
  checkMainDiagonal = () => {
    const { board } = this.state

    // Check from the top left to bottom right 
    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 0; col < board[row].length - 3; col++) {
        let piece = board[row][col]

        // Slot is empty 
        if (!piece) {
          continue
        }

        // Check rows and columns to bottom right 
        if (piece === board[row + 1][col + 1] &&
          piece === board[row + 2][col + 2] &&
          piece === board[row + 3][col + 3]) {
          return true
        }
      }
    }
    return false
  }

  // Bottom left to top right victory check 
  checkCounterDiagonal = () => {
    const { board } = this.state

    // Check from middle left to top right 
    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 3; col < board[row].length; col++) {
        let piece = board[row][col]

        // Target is empty 
        if (!piece) {
          continue
        }

        // Check row and columns to top right 
        if (piece === board[row + 1][col - 1] &&
          piece === board[row + 2][col - 2] &&
          piece === board[row + 3][col - 3]) {
          return true
        }
      }
    }
    return false
  }

  // When user clicks on column, drop piece on the next available row 
  handleClick = (row, col) => {
    const { gameOver } = this.state

    // Game is not over 
    if (!gameOver) {
      let newBoard = [...this.state.board]
      // let dropRow = this.findRow(col)
      let dropRow = this.state.targetRow
      let turn = this.state.turn

      // Row is not full 
      if (dropRow !== null) {
        if (turn === 'blue') {

          // Drop a blue piece on the board 
          newBoard[dropRow][col] = bluePiece

          // Switch turn to white 
          turn = 'white'
        } else {

          // Drop a white piece on the board 
          newBoard[dropRow][col] = whitePiece

          // Switch turn to blue 
          turn = 'blue'
        }

        // Set new board 
        this.setState({
          board: newBoard,
          targetRow: null,
          targetCol: null
        })

        // Check for any victory 
        let victory = this.checkRows(dropRow) || this.checkColumns(dropRow, col) || this.checkMainDiagonal() || this.checkCounterDiagonal()

        // Victory found, game over 
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
    }
  }

  // When user hovers over a slot 
  handleHover = (row, col) => {
    // Game is not over 
    if (!this.state.gameOver) {
      // Find target row 
      let dropRow = this.findRow(col)

      // Set row and column to state 
      this.setState({
        targetRow: dropRow,
        targetCol: col
      })
    }
  }

  render() {
    const { gameOver, turn, targetRow, targetCol } = this.state
    // console.log(this.state)

    const renderTurn = turn === 'blue' ? bluePiece : whitePiece

    return (
      <div>
        <h1>Connect Four</h1>
        <h3>Turn: {renderTurn}</h3>
        <button onClick={this.clearBoard}>New game</button>
        <Board board={this.state.board} handleClick={this.handleClick} handleHover={this.handleHover} targetRow={targetRow} targetCol={targetCol} />
        <p>{gameOver ? `${turn} wins!` : null}</p>
      </div>
    );
  }
}

export default App