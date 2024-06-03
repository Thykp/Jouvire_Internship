import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Board from '../components/Board';

beforeEach(() => {
  cleanup();
});

test('renders empty board', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  squares
    .filter(square => !square.textContent.includes('Restart Game'))
    .forEach(square => expect(square).toBeEmptyDOMElement());
});

test('player can click to mark a square', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
});

test('alternating turns between X and O', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  expect(squares[0]).toHaveTextContent('X');
  expect(squares[1]).toHaveTextContent('O');
});

test('cannot click on a taken square', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
});

test('detects winner correctly', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[6]); // X
  fireEvent.click(squares[1]); // O
  fireEvent.click(squares[5]); // X
  fireEvent.click(squares[2]); // O
  fireEvent.click(squares[4]); // X
  const winner = screen.getByText(/Winner: X/i);
  expect(winner).toBeInTheDocument();
});

test('can restart the game', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  const restartButton = screen.getByText(/restart game/i);
  fireEvent.click(restartButton);
  squares
    .filter(square => !square.textContent.includes('Restart Game')) 
    .forEach(square => expect(square).toBeEmptyDOMElement());


  expect(screen.queryByText(/Winner:/i)).toBeNull();
  expect(screen.queryByText(/Draw/i)).toBeNull();
});

test('detects draw correctly', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');

 
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[1]); // O
  fireEvent.click(squares[2]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[5]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[6]); // X
  fireEvent.click(squares[8]); // O
  fireEvent.click(squares[7]); // X

  const drawMessage = screen.getByText(/Winner: [XO]/i);
  expect(drawMessage).toBeInTheDocument();
});



