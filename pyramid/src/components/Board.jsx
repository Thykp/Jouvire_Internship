import React, { useState } from 'react';
import Square from './Square';

const initialBoard = [
  [''],
  ['', '', ''],
  ['', '', '', '', '']
];

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map((rowArr, rowIndex) => rowArr.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return isXNext ? 'X' : 'O';
      }
      return cell;
    }));

    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const checkWinner = (board) => {
    const winningLines = [

      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[2, 1], [2, 2], [2, 3]],
      [[2, 2], [2, 3], [2, 4]],

      [[0, 0], [1, 1], [2, 2]],

      [[0, 0], [1, 0], [2, 0]],
      [[0, 0], [1, 2], [2, 4]]
    ];
  
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) {
        break;
      }
    }
    if (isDraw) {
      return 'Draw';
    }
  
    for (let line of winningLines) {
      const [a, b, c] = line.map(([r, c]) => board[r][c]);
      if (a && a === b && a === c) {
        return a;
      }
    }
  
    return null;
  };
  

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="grid gap-2">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex justify-center space-x-2`}>
            {row.map((value, colIndex) => (
              <Square
                key={colIndex}
                value={value}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {winner && <div className="text-center mt-4 text-xl font-bold text-green-500">{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</div>}
      <button onClick={resetGame} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Restart Game
      </button>
    </div>
  );
};

export default Board;
