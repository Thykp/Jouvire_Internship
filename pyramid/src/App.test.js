import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Board component', () => {
  render(<App />);
  const boardElement = screen.getByText(/restart game/i);
  expect(boardElement).toBeInTheDocument();
});
