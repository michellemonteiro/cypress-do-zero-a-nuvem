// ♥️♥️♥️♥️♥️♥️♥️ Testa a página da política de privacidade de forma independente ♥️♥️♥️♥️♥️♥️♥️ //

  it('Testa a página da política de privacidade de forma independente', () => {

    // ✦ Acessar diretamente a página da política de privacidade usando o comando cy.visit() ✦ //

    cy.visit('./src/privacy.html') // Acessa diretamente a página da política de privacidade

    // ✦ Verificar se o conteúdo da página da política de privacidade está visível ✦ //

    cy.contains('Talking About Testing').should('be.visible') // Verifica se o texto 'Talking About Testing' está visível na página, indicando que a navegação foi bem-sucedida 

  })