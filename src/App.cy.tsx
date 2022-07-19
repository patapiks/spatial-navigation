import App from './App';

describe('APP TEST', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.viewport(1280, 720);
  });

  it('Checking the number of focusable elements', () => {
    cy.get('.focusable-element').should('have.length', 25);
  });

  it('Checking the initial focus', () => {
    const focusableElement = cy.get('.focusable-element_focused');
    focusableElement.should('have.length', 1);
    focusableElement.should('have.text', '1');
  });

  it('Checking focus movement', () => {
    cy.get('.app').trigger('keydown', { key: 'ArrowRight' });
    cy.get('.focusable-element_focused').should('have.text', '15');

    cy.get('.app').trigger('keydown', { key: 'ArrowRight' });
    cy.get('.focusable-element_focused').should('have.text', '25');

    cy.get('.app').trigger('keydown', { key: 'ArrowRight' });
    cy.get('.focusable-element_focused').should('have.text', '35');

    cy.get('.app').trigger('keydown', { key: 'ArrowDown' });
    cy.get('.focusable-element_focused').should('have.text', '3100');

    cy.get('.app')
      .trigger('keydown', { key: 'ArrowLeft' })
      .trigger('keydown', { key: 'ArrowLeft' })
      .trigger('keydown', { key: 'ArrowLeft' });

    cy.get('.focusable-element_focused').should('have.text', '4');

    cy.get('.app')
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' })
      .trigger('keydown', { key: 'ArrowUp' });
    cy.get('.focusable-element_focused').should('have.text', '1');
  });
});
