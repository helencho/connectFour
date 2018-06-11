import React, { Component } from 'react'
import '../stylesheets/board.css'

class Board extends Component {
    constructor() {
        super()
        this.state = {
            board: []
        }
    }

    componentDidMount() {
        this.fillBoard()
    }

    fillBoard = () => {
        let board = []
        for (let row = 0; row < 6; row++) {
            board.push([])
            for (let col = 0; col < 7; col++) {
                board[row].push('')
            }
        }
        this.setState({
            board
        })
    }

    render() {
        const { board } = this.state
        console.log(board)

        return (
            <div>
                <h1>Board</h1>
                {board.map((row, index) => (
                    <div className="row" key={index}>
                        {row.map((col, idx) => (
                            <button className="col" key={idx}>{col}</button>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default Board 