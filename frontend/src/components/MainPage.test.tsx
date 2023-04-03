import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/curling site/i);
  expect(linkElement).toBeInTheDocument();
});
