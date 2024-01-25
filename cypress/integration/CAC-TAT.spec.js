/// <reference types="Cypress"/>


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Testi')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function () {
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Testi')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("teste")
        cy.get('button[type="submit"]').click()

        cy.get('.erro').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.sucess').should('be.visible')

    })

    it('seleciona um produto (youtube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('pra marcar um só', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it.only('seleciona um arquivo da pasta', function () {
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/example.json')
    })

    it('abrir noutra aba', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa privacidade removendo target', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    })


})