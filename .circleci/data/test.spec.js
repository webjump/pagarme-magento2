/// <reference types="cypress" />

context('Actions', () => {

    Cypress._.times(0, () => {
        it('should add something to cart', () => {
            cy.visit('https://stg-magento2.mundipagg.com/fusion-backpack.html', { timeout: 60000 });

            cy.get("img.fotorama__img",{ timeout: 60000 });
            cy.get("button#product-addtocart-button").click();
            cy.get("div[data-ui-id='message-success']", {timeout: 60000}).contains("added");

            cy.visit("https://stg-magento2.mundipagg.com/checkout");

            cy.get('.cart-price', {timeout: 60000}).within(() => {
                cy.contains('.price', "R$59,00")
            });
        })
    });

    Cypress._.times(0, () => {
        it('should register a new user', () => {
            const user = {
                firstName: "Test",
                lastName: "Cypress",
                cpf: "31226664644",
                email: Math.random().toString(36).substr(2, 9) + "@gmail.com",
                password: Math.random().toString(36)
            }

            cy.visit('https://stg-magento2.mundipagg.com/customer/account/create', { timeout: 60000 });

            cy.get("#firstname", { timeout: 60000 }).type(user.firstName);
            cy.get("#lastname", { timeout: 60000 }).type(user.lastName);
            cy.get("#taxvat", { timeout: 60000 }).type(user.cpf);
            cy.get("#email_address", { timeout: 60000 }).type(user.email);
            cy.get("#password", { timeout: 60000 }).type(user.password);
            cy.get("#password-confirmation", { timeout: 60000 }).type(user.password);
            cy.get('.actions-toolbar', { timeout: 60000 }).within(() => {
                cy.get("button[title='Create an Account']", { timeout: 60000 }).click();
            });

            cy.get('.block-title').within(() => {
                cy.contains('strong', "Account Information")
                cy.visit('https://stg-magento2.mundipagg.com/customer/account/logout', { timeout: 60000 });
            });

        })
    })

    Cypress._.times(1, () => {
        it('should buy a backpack with a credit card', () => {
            const user = {
                firstName: "Test",
                lastName: "Cypress",
                cpf: "31226664644",
                cep: "13500-110",
                phone: "123456789",
                email: Math.random().toString(36).substr(2, 9) + "@gmail.com",
                password: Math.random().toString(36)
            }

            const card = {
                number: "4000000000000010",
                name: "test",
                cvv:"123"
            };

            cy.visit('https://stg-magento2.mundipagg.com/fusion-backpack.html', { timeout: 60000 });

            cy.get("img.fotorama__img",{ timeout: 60000 });
            cy.get("button#product-addtocart-button").click();
            cy.get("div[data-ui-id='message-success']", {timeout: 60000}).contains("added");
            cy.visit("https://stg-magento2.mundipagg.com/checkout", { timeout: 60000 });


            cy.get("select[name='country_id']", { timeout: 60000 }).select("Brasil");

            cy.get("#customer-email").type(user.email);
            cy.get("input[name='firstname']").type(user.firstName);
            cy.get("input[name='lastname']").type(user.lastName);
            cy.get("input[name='company']").type(user.email);
            cy.get("input[name='city']").type(user.firstName);
            cy.get("input[name='vat_id']").type(user.cpf);
            cy.get("input[name='telephone']").type(user.phone);
            cy.get("input[name='postcode']").type(user.cep);
            cy.get("select[name='region_id']").select("Acre");
            cy.get("input[name='street[0]']").type(user.firstName);
            cy.get("input[name='street[1]']").type(user.firstName);
            cy.get("input[name='street[2]']").type(user.firstName);
            cy.get("input[name='street[3]']").type(user.firstName);

            cy.get('#shipping-method-buttons-container').within(() => {
                cy.wait(2000);
                cy.get("button[type='submit']", {timeout: 60000}).click();
            });

            cy.get("#pagarme_creditcard", { timeout: 60000 }).click({ timeout: 60000 });

            cy.get("#payment_form_pagarme_creditcard").within(() =>{
                cy.get("input[name='payment[cc_number]']").type(card.number);
                cy.get("input[name='payment[cc_owner]']").type(card.name);
                cy.get("select[name='payment[cc_exp_year]']").select("2030");

                cy.get("input[name='payment[cc_cid]']").type(card.cvv);
            });

            cy.get("button#pagarme_creditcard-submit").click();
            cy.get(".checkout-onepage-success",{ timeout: 60000 }).within(() => {
                cy.get("span[data-ui-id='page-title-wrapper']").contains("Thank you for your purchase!");
            });

        });
    })
})
