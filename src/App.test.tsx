import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import App from './App';

describe('TEST APP', () => {
  test('Checking the number of focusable elements', () => {
    render(<App />);
    const focusableElements = screen.getAllByTestId('focusable-element');

    expect(focusableElements.length).toBe(20);
  });

  test('Checking the initial focus', () => {
    render(<App />);
    const focusableElements = screen.getAllByTestId('focusable-element');
    const focusedElements = focusableElements.filter((el) =>
      el.classList.contains('focusable-element_focused')
    );

    expect(focusedElements.length).toBe(1);
    expect(focusedElements[0]).toHaveTextContent('1');
  });

  test('Checking focus movement', () => {
    const { container } = render(<App />);
    fireEvent.keyDown(container, { key: 'ArrowDown' });

    console.log(prettyDOM(container));

    const focusableElements = screen.getAllByTestId('focusable-element');
    const focusedElements = focusableElements.filter((el) =>
      el.classList.contains('focusable-element_focused')
    );

    expect(focusedElements.length).toBe(1);
    expect(focusedElements[0]).toHaveTextContent('2');
  });
});
