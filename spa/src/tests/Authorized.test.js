import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import { Authorized } from '../components/Authorized';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

describe('Authorized', () => {
    it('renders children when user is logged in', () => {
        // Mock localStorage getItem to return a truthy value
        // jest.spyOn(localStorage, 'getItem').mockImplementation(() => 'user@example.com');
        localStorage.setItem("email", "user2@gmail.com");

        const { getByText } = render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Authorized redirectPath="/login">
                        <div><h1>Authorized Content</h1></div>
                    </Authorized>} />
                </Routes>
            </BrowserRouter>
        );

        const authorizedContent = screen.getByText('Authorized Content');
        expect(authorizedContent).toBeInTheDocument();
    });

    it('redirects to home page when user is not logged in', () => {
        // Mock localStorage getItem to return a falsy value
        //jest.spyOn(localStorage, 'getItem').mockImplementation(() => null);
        localStorage.clear();
        const { queryByText } = render(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Authorized redirectPath="/login">
                    <div><h1>Authorized Content</h1></div>
                </Authorized>} />
            </Routes>
        </BrowserRouter>
        );

        const authorizedContent = screen.queryByText('Authorized Content');
        expect(authorizedContent).toBeNull();

        // const navigateComponent = render(<Authorized />);
        // expect(navigateComponent.container.innerHTML).toBe('');
        // expect(navigateComponent.container.querySelector('a')).toHaveAttribute('href', '/');
    });

});
