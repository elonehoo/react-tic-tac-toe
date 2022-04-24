import React,{ useState } from 'react'

function Square(props:any){
  return (
    <button
        className="square"
        onClick={()=>props.onClick()}
      >
        {props.value}
      </button>
  )
}

class Board extends React.Component {

  constructor(props:any){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIndex:true,
    }
  }

  handleClick(i:number){
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIndex ? 'X' : 'O'
    this.setState({
      squares:squares,
      xIndex:!this.state.xIndex
    });
  }

  renderSquare(i:number) {
    return <Square
             onClick={()=>this.handleClick(i)}
             value={this.state.squares[i]}
           />;
  }
  render() {
    const winner = calculateWinner(this.state.squares)
    let status:string
    if (winner) {
      status = 'Winner: ' + winner;
    }else {
      status = 'Next player: ' + (this.state.xIndex ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

function calculateWinner(squares:Array<any>):any{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default App
