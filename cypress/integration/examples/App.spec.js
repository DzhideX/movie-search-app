/// <reference types="Cypress" />

context('App makes request and renders properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('searches and updates correctly with click', () => {
    cy.get('[data-test=navigation-input]').type('Avengers');
    cy.get('[data-test=navigation-search-button]').click();
    cy.get('[data-test=movies-container-large]').children().should('have.length',10);
  });

  it('searches and updates correctly with enter key press', () => {
    cy.get('[data-test=navigation-input]').type('Avengers{enter}');
    cy.get('[data-test=movies-container-large]').children().should('have.length',10);
  });

  it('shows error if the movie does not exist', () => {
    cy.get('[data-test=navigation-input]').type('asdasdasd');
    cy.get('[data-test=navigation-search-button]').click();
    cy.get('.message-container__message').should('have.text',' No movie found with that name. Try again! ')
  });

  it('shows the movie thumbnail when hovering over a movie ', () => {
    cy.get('[data-test=navigation-input]').type('Avengers');
    cy.get('[data-test=navigation-search-button]').click();
    cy.get(':nth-child(1) > .movie-thumbnail__no-info').trigger('mouseover');
    cy.get(`.movie-thumbnail-more-info > :nth-child(1)`).should('have.text',' Title: ');
    cy.get(`.movie-thumbnail-more-info > :nth-child(3)`).should('have.text',' Year: ');
    cy.get(`.movie-thumbnail-more-info > :nth-child(5)`).should('have.text',' Type: ');
  });
  
  it('shows that the modal works ', () => {
    cy.get('[data-test=navigation-input]').type('Avengers');
    cy.get('[data-test=navigation-search-button]').click();
    cy.get(':nth-child(1) > .movie-thumbnail__no-info').trigger('mouseover');
    cy.get('.movie-thumbnail-more-info__button').click();
    cy.get('.movie-thumbnail-more-info-modal-image').should('exist');
    cy.get('.movie-thumbnail-more-info-modal-top-right > :nth-child(1) > span').should('exist');
  });
  
});
