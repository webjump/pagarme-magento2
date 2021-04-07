/// <reference types="cypress" />

context('Actions', () => {

  Cypress._.times(1,() => {
  it('should add something to cart', () => {
    // https://on.cypress.io/type
    cy.visit('https://stg-magento2.mundipagg.com/push-it-messenger-bag.html');

    cy.wait(5000);
    cy.get("button#product-addtocart-button").click();

    cy.wait(5000);
    cy.visit("https://stg-magento2.mundipagg.com/checkout");

    cy.wait(10000);
    cy.get('.cart-price').within(() => {
        cy.contains('.price',"R$45,00")
    });
  })
})
})
