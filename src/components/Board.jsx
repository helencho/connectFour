import React, { Component } from 'react'
import '../stylesheets/board.css'

class Board extends Component {
    render() {
        const { board } = this.props

        return (
            <div className="board-container">
                <div className="board">
                    {board.map((row, index) => (
                        <div className="row" key={index}>
                            {row.map((col, idx) => (
                                <button className="col" key={idx} onClick={() => this.props.handleClick(index, idx)}>{col}</button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Board 