import React, { Component } from 'react'
import '../stylesheets/board.css'

class Button extends Component {
    render() {
        const { col, idx, index, targetRow, targetCol } = this.props

        // Row index and target row are the same 
        // Column index and target column are the same 
        const activeClass = index === targetRow && idx === targetCol ? `active` : null

        return (
            <button
                className={`col col-${activeClass}`}
                onClick={() => this.props.handleClick(index, idx)}
                onMouseOver={() => this.props.handleHover(index, idx)}
            >
                {col}
            </button>
        )
    }
}

class Row extends Component {
    render() {
        const { row, index, targetRow, targetCol } = this.props

        return (
            <div className={`row`}>
                {row.map((col, idx) => (
                    <Button
                        key={idx}
                        col={col}
                        targetRow={targetRow}
                        targetCol={targetCol}
                        idx={idx} index={index}
                        handleClick={this.props.handleClick}
                        handleHover={this.props.handleHover} />
                ))}
            </div>
        )
    }
}

class Board extends Component {
    render() {
        const { board, targetRow, targetCol } = this.props

        return (
            <div className="board-container">
                <div className="board">
                    {board.map((row, index) => (
                        <Row
                            key={index}
                            row={row}
                            index={index}
                            targetRow={targetRow}
                            targetCol={targetCol}
                            handleClick={this.props.handleClick}
                            handleHover={this.props.handleHover} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Board 