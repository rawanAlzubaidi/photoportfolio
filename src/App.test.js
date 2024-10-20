import { render, screen } from '@testing-library/react';
import App from './App';

// This file is a unit test for your React application.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
