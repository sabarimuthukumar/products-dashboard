
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  expect(screen.getByText('clear')).toBeInTheDocument();
  expect(screen.getByText('Select category')).toBeInTheDocument();
  expect(screen.getByText('Select product')).toBeInTheDocument();
});
