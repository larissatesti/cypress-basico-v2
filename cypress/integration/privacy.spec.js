it('testa a página independente', function () {
    cy.visit('https://www.google.com/travel/flights?gl=BR&hl=pt-BR')
    cy.get('#.gb_Id').click()
})