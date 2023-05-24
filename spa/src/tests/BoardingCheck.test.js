import React from 'react';
import { render, screen } from '@testing-library/react';
import { Boardingcheck } from '../components/boardingCheck/BoardingCheck';

describe('Boardingcheck', () => {
  test('renders all child components', () => {
    const { getByTestId } = render(<Boardingcheck />);
 
    
    const yyy = getByTestId('yyy');
    expect(getByTestId('flight-number-selector')).toBeInTheDocument();
    expect(getByTestId('flight-status-selector')).toBeInTheDocument();
    expect(getByTestId('passenger-check')).toBeInTheDocument();
  });

  
});
