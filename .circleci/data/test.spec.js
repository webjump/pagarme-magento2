/// <reference types="cypress" />

context('Actions', () => {

  /*Cypress._.times(1,() => {
  it('should add something to cart', () => {
    cy.visit('https://stg-magento2.mundipagg.com/push-it-messenger-bag.html');

    cy.wait(5000);
    cy.get("button#product-addtocart-button").click();

    cy.wait(5000);
    cy.visit("https://stg-magento2.mundipagg.com/checkout");

    cy.wait(10000);
    cy.get('.cart-price').within(() => {
        cy.contains('.price',"R$45,00")
    });*/

    Cypress._.times(200,() => {
        it('should register a new user', () => {
          const user = {
              firstName: "Test",
              lastName: "Cypress",
              cpf: "31226664644",
              email: Math.random().toString(36).substr(2, 9) + "@gmail.com",
              password: Math.random().toString(36)
          }

          cy.visit('https://stg-magento2.mundipagg.com/customer/account/create', { timeout: 30000 });

          cy.get("#firstname").type(user.firstName);
          cy.get("#lastname").type(user.lastName);
          cy.get("#taxvat").type(user.cpf);
          cy.get("#lastname").type(user.lastName);
          cy.get("#email_address").type(user.email);
          cy.get("#password").type(user.password);
          cy.get("#password-confirmation").type(user.password);
          cy.get('.actions-toolbar').within(() => {
            cy.get("button[title='Create an Account']").click();
          });

          cy.get('.block-title').within(() => {
            cy.contains('strong',"Account Information")
          });


        })
    })
})
