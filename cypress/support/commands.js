// ✦ cypress/support/commands.js ✦ //

//🤖 Comandos customizados do Cypress
//🤖 Documentação: https://docs.cypress.io/api/cypress-api/custom-commands

// 🤖 Comando customizado para preencher os campos obrigatórios e enviar o formulário. Este comando pode ser reutilizado em vários testes para evitar repetição de código e garantir que os campos obrigatórios sejam sempre preenchidos corretamente antes do envio.
//❄︎ Uso: cy.fillMandatoryFieldsAndSubmit()
// ❄︎ Preenche os campos: Nome, Sobrenome, E-mail, Mensagem e clica no botão Enviar. Depois, verifica se a mensagem de sucesso é exibida. Certifique-se de que os IDs dos campos correspondem aos do formulário em teste. Adicione este comando ao arquivo commands.js para que esteja disponível globalmente em todos os testes Cypress.

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
//     cy.get('#firstName').type('Michelle')
//     cy.get('#lastName').type('Alves')
//     cy.get('#email').type('teste@teste.com')
//     cy.get('#open-text-area').type('Teste')
//     cy.contains('Enviar').click()
// })

//✦ cypress/support/commands.js - versão com dados dinâmicos para o comando customizado ✦ //

// 🤖 Comando customizado para preencher os campos obrigatórios e enviar o formulário com dados dinâmicos.
//❄︎ Uso: cy.fillMandatoryFieldsAndSubmit({ firstName: 'Nome', lastName: 'Sobrenome', email: '
//❄︎ Preenche os campos: Nome, Sobrenome, E-mail, Mensagem e clica no botão Enviar. Depois, verifica se a mensagem de sucesso é exibida. Certifique-se de que os IDs dos campos correspondem aos do formulário em teste. Adicione este comando ao arquivo commands.js para que esteja disponível globalmente em todos os testes Cypress.

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data ) => {
//     cy.get('#firstName').type(data.firstName)
//     cy.get('#lastName').type(data.lastName)
//     cy.get('#email').type(data.email)
//     cy.get('#open-text-area').type(data.message)
//     cy.contains('Enviar').click()
// })

//✦ cypress/support/commands.js - versão final com dados padrão para o comando customizado ✦ //

// 🤖 Comando customizado para preencher os campos obrigatórios e enviar o formulário com dados padrão, mas permitindo a substituição desses dados.
//❄︎ Uso: cy.fillMandatoryFieldsAndSubmit() ou cy.fillMandatoryFieldsAndSubmit({ firstName: 'Nome', lastName: 'Sobrenome', email: ' 
//❄︎ Preenche os campos: Nome, Sobrenome, E-mail, Mensagem e clica no botão Enviar. Depois, verifica se a mensagem de sucesso é exibida. Certifique-se de que os IDs dos campos correspondem aos do formulário em teste. Adicione este comando ao arquivo commands.js para que esteja disponível globalmente em todos os testes Cypress.
//Quando nenhum dado é passado, os valores padrão são usados. Se um objeto com dados for fornecido, ele substituirá os valores padrão conforme necessário.

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
//     firstName: 'Marinana',
//     lastName: 'Oliveira',
//     email: 'mariana@teste.com',
//     message: 'Padrã0'
// } ) => {
//     cy.get('#firstName').type(data.firstName)
//     cy.get('#lastName').type(data.lastName)
//     cy.get('#email').type(data.email)
//     cy.get('#open-text-area').type(data.message)
//     cy.contains('Enviar').click()
// })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Marinana',
    lastName: 'Oliveira',
    email: 'mariana@teste.com',
    message: 'Padrã0'
} ) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.message)
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()
})


// ✦ Fim do arquivo commands.js ✦ //