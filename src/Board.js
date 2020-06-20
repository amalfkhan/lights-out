import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Props:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  // generate random board
  createBoard() {
    let board = [];

    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }

    return board
  }

  // change cells on click and determine if game has been won
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // flipping cells
    flipCell(y, x); // self
    // flipCell(y - 1, x); // above
    // flipCell(y, x + 1); // right
    // flipCell(y + 1, x); // below
    // flipCell(y, x - 1); // left

    // check if all cells are off
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board, hasWon});
  }

  // makeBoard() {

  // }

  render() {
    // win clause
    if (this.state.hasWon) {
      return (
        <div> 
          <div className='Board-title'>
            <div className='winner'>
              <span className='neon'>YOU</span>
              <span className='flux'>WIN!</span>
            </div>

          </div>
        </div>
      )
    }

    // making/updating the game board
    let tableFill = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`
        row.push(
          <Cell 
            key={coord} 
            isLit={this.state.board[y][x]} 
            flipCellsAroundMe={() => this.flipCellsAround(coord)}  
          />
        );
      }
      tableFill.push(<tr key={y}>{row}</tr>);
    }

    return (
      <div> 
        <div className='Board-title'>
          <div className='neon'>Lights</div>
          <div className='flux'>Out</div>
        </div>

        <table className="Board">
          <tbody>
            {tableFill}
          </tbody>
        </table>
      </div>

    );
  }
}


export default Board;
