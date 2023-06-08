import React from 'react';
import { render, screen } from '@testing-library/react';
import { Boardingcheck } from '../components/boardingCheck/BoardingCheck';
import { MemoryRouter } from 'react-router-dom';

describe('Boardingcheck', () => {
  test('renders all child components', () => {
    const { getByTestId } = render( <MemoryRouter><Boardingcheck /></MemoryRouter>);
 
    
    const yyy = getByTestId('yyy');
    expect(getByTestId('flight-number-selector')).toBeInTheDocument();
    expect(getByTestId('flight-status-selector')).toBeInTheDocument();
    expect(getByTestId('passenger-check')).toBeInTheDocument();
  });

  
});
