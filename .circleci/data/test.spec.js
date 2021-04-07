/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://stg-magento2.mundipagg.com/')
  })

  Cypress._.times(500,() => {
  it('should add something to cart', () => {
    // https://on.cypress.io/type
    cy.visit('push-it-messenger-bag.html');

    cy.wait(5000);
    cy.get("button#product-addtocart-button").click();

    cy.wait(5000);
    cy.visit("checkout");

    cy.wait(10000);
    cy.get('.cart-price').within(() => {
        cy.contains('.price',"R$45,00")
    });
  })
})
})
