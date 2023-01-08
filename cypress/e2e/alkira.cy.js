describe('Alkira page', () => {
    it('Visit', () => {
        // cy.intercept(URL);
        // cy.route("/200?**").as("fakeNetworkRequest")
        cy.visit('http://localhost:3000/')
        // cy.wait("fakeNetworkRequest")
        cy.get(".App").find(".title").invoke("text").then((text)=>{

            expect(text.trim()).equal("NBA TEAMS")
        })
        // cy.wait(10000)
        cy.get(".pagination").find(".btn-1").invoke("text").then((text)=>{
            expect(text.trim()).equal("<")
        })
        cy.get(".btn-3").click()
    })

  })