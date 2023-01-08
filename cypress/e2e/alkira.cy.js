describe('Alkira Assesment project test', () => {
    
    it('Visit', () => {
        
        cy.visit('http://localhost:3000/')
        
        cy.get(".title").should("have.text",'NBA TEAMS')

        cy.get(".btn-1").should('have.text','<')
    

        cy.get(".table").find("th").first().should('have.text','Teams Name')

        cy.get(".tbody tr").first().find("td").first().should('have.text','76ers')

        cy.get(".tbody tr").should('have.length',7)
        cy.get(".btn-1").should('be.disabled')

    })

    it("Button text with Search",()=>{

        cy.visit('http://localhost:3000/');

        cy.get("input").type("w");
        cy.get(".tbody tr").should('have.length',4)
        cy.get(".pagination").find(".btn-3").invoke("text").then((text)=>{
            expect(text.trim()).equal("1")
        })
    })

    it("Pagination",()=>{

        cy.visit('http://localhost:3000/')

        cy.get(".btn-3").click();
        cy.get(".btn-4").should('be.disabled')
        cy.get(".tbody tr").should('have.length',2)
    })

    it("Open modal",()=>{
        
        // cy.intercept('PUT',/users/,{}).as("userPut")
        cy.visit('http://localhost:3000/')

        cy.get(".tbody tr").first().click();

        // cy.wait("@userPut").its("request.url").should('include','users')
        cy.get(".header h3").first().should("have.text","76ers")

        cy.get(".random-details").should("have.text",'Random Game Details');
    })

  })
