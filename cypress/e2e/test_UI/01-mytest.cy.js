/***********************************************************
Web Testing using Cypress | Part 1
https://www.youtube.com/watch?v=69SFwgWHUig&list=PLUDwpEzHYYLvA7QFkC1C0y0pDPqYS56iU&index=1

************************************************************/

describe('First test suite', () => {
    it('verify title positive', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.title().should('eq', 'OrangeHRM');
    });

    it('verify search results', () => {
        cy.visit("https://naveenautomationlabs.com/opencart/");
        cy.get("[placeholder='Search']").type("MacBook");
        cy.get("#search button").click();
        // Assert the text for first search result
        cy.get(".product-layout:first-child h4:first-of-type a").contains("MacBook");
    })
})