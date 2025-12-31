import { render, screen } from '@testing-library/react';
import React from 'react';

function Hello() {
  return <h1>Hello, Jest!</h1>;
}

test('renders Hello, Jest!', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
});
