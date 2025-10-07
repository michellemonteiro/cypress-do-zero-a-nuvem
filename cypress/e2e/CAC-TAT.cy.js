//♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Teste de validar título ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //

//👨‍🏫 O bloco "describe" define a suíte de testes e o bloco "it" define o caso de teste.
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //A assertion "should('be.equal', 'O TÍTULO ESPERADO')"" é usada para comparar o valor retornado por "cy.title()"" com a string exata que você espera.
  })

  //♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Testes de preenchimento de formulário ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //

  it('preencher os campos corretamente', () => {

    // ✦ Preencher o campo nome ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Santos!')
    cy.get('@sobrenome')
      .should('have.value', 'Santos!')

    // ✦ Preencher o campo email ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle@teste.com')
    cy.get('@email')
      .should('have.value', 'michelle@teste.com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')

    // ✦ "Checkar" o tipo de atendimento "Elogio" ✦ //

    //💡 Nota: O comando .check() é o preferido para checkboxes e radios, pois simula o comportamento real do usuário e garante que os eventos corretos de mudança de estado sejam disparados, sem a necessidade de cy.contains('button', 'Enviar').click() //Para selecionar a partir do nome que se .

    // 🤖 Localiza o elemento de input (radio button) que tem o valor 'elogio'
    cy.get('input[type="radio"][value="elogio"]')
      // 1. Usa o comando .check() para marcar/selecionar o radio button encontrado
      .check()
      // 🤖 2. Asserção principal: Verifica se o elemento AGORA está marcado (confirma que o .check() funcionou)
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //

    // 🤖 (confirma que o .check() funcionou)Localiza o elemento de input (checkbox) que tem o valor 'email'
    cy.get('input[type="checkbox"][value="email"]')
      // 🤖  1. Usa o comando .check() para marcar/selecionar o checkbox
      .check()
      // 🤖 2. Asserção principal: Verifica se o elemento AGORA está marcado
      .should('be.checked')
      // 🤖 3. Asserção secundária (opcional): Confirma que o atributo 'value' é 'email'(garante que a seleção foi feita no campo correto)
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" ✦ //

    const longText = 'Teste de preenchimento do campo mensagem com um texto bem grande para verificar se o campo suporta textos longos. '.repeat(6); // Variável para armazenar um texto longo

    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      //💡 Nota: O parâmetro { delay: 0 } é usado para eliminar o atraso padrão entre cada caractere digitado, acelerando o processo de digitação no campo de texto.
      .type(longText, { delay: 0 }) // Usando a variável longText para preencher o campo
    cy.get('@mensagem')
      .should('have.value', longText)

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()
// ★★★★ Antes do cy.contains, estávamos usando o comando cy.get('button[type="submit"]').click() para clicar no botão Enviar. No entanto, ao usar cy.contains('button', 'Enviar').click(), garantimos que estamos clicando especificamente no botão que contém o texto "Enviar". Isso é especialmente útil quando há mais de um botão na página ou, quando o seletor é complexo ou, quando não se tem um ID ou classe específica para o botão. ★★★★ //

    // ✦ Verificar se a mensagem de sucesso é exibida ✦ //
    cy.get('.success')
      .should('be.visible')
      //💡 Nota: A asserção .and('contain', 'Mensagem enviada com sucesso.') verifica se o elemento contém o texto específico, garantindo que a mensagem correta seja exibida.
      .and('contain', 'Mensagem enviada com sucesso.')

  })

  //♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Teste de formatação inválida -> E-mail ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //
  it('preencher o campo e-mail com formatação inválida', () => {

    // ✦ Preencher o campo nome ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Santos!')
    cy.get('@sobrenome')
      .should('have.value', 'Santos!')

    // ✦ Preencher o campo email com formatação inválida ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()
    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })

  //♥️♥️♥️♥️♥️♥️ Teste de preenchimento do campo telefone - Obrigatório ♥️♥️♥️♥️♥️♥️♥️ //
  it('selecionar checkbox "Telefone" e não preencher o campo que deve se tornar obrigatório', () => {

    // ✦ Preencher o campo nome ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Santos!')
    cy.get('@sobrenome')
      .should('have.value', 'Santos!')

    // ✦ Preencher o campo email ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "Telefone" ✦ //
    cy.get('input[type="checkbox"][value="phone"]')
      .check()
      .should('be.checked')
      .and('have.value', 'phone')

    // ✦ Preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()

    // ✦ Verificar se a mensagem de erro é exibida - telefone obrigatório✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })

  //♥️♥️♥️♥️♥️♥️ Teste de preenchimento do campo telefone - Valor não numérico ♥️♥️♥️♥️♥️♥️♥️ //
  it('preencher o campo "Telefone" com valores inválidos', () => {

    // ✦ Preencher o campo telefone com valores não numéricos ✦ // 
    cy.get('#phone')
      .as('telefone')
      .should('be.visible')
      .type('abcdefghij')
    cy.get('@telefone')
      .should('have.value', '')

  })


  //♥️♥️♥️♥️♥️♥️ Teste validação label de campo obrigatório - Campo Telefone ♥️♥️♥️♥️♥️♥️♥️ //

  it('Validar label "Obrigatório" quando o checkbox telefone for selecionado', () => {

    // ✦ Preencher o campo nome ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Santos!')
    cy.get('@sobrenome')
      .should('have.value', 'Santos!')

    // ✦ Preencher o campo email ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "Telefone" ✦ //
    cy.get('input[type="checkbox"][value="phone"]')
      .check()
      .should('be.checked')
      .and('have.value', 'phone')

    // ✦ O label "Telefone (Obrigatório)" deve estar visível ✦ //
    cy.get('label[for="phone"]')
      .should('be.visible')
      .and('contain', 'Telefone (obrigatório)')

  })

  //♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - Nome ♥️♥️♥️♥️♥️♥️♥️ //

  it('Não preencher campo nome - Campo Obrigatório', () => {

    // ✦ Preencher o campo nome para depois apagar ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')
      // ✦ Apagar o conteúdo do campo nome ✦ //
      .clear()
    cy.get('@nome')
      .should('have.value', '')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Santos!')
    cy.get('@sobrenome')
      .should('have.value', 'Santos!')

    // ✦ Preencher o campo email com formatação inválida ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })


  //♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - Sobrenome ♥️♥️♥️♥️♥️♥️♥️ //



  it('Não preencher campo sobrenome - Campo Obrigatório', () => {

    // ✦ Preencher o campo "Nome" ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome para depois apagar ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Monteiro')
    cy.get('@sobrenome')
      .should('have.value', 'Monteiro')

    // ✦ Apagar o conteúdo do campo sobrenome ✦ //
    cy.get('@sobrenome')
      .clear()
    cy.get('@sobrenome')
      .should('have.value', '')

    // ✦ Preencher o campo email com formatação inválida ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })

  //♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - E-mail ♥️♥️♥️♥️♥️♥️♥️ //
  it('Não preencher campo e-mail - Campo Obrigatório', () => {

    // ✦ Preencher o campo "Nome" ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Monteiro')
    cy.get('@sobrenome')
      .should('have.value', 'Monteiro')

    // ✦ Preencher o campo email para depois apagar ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Apagar o conteúdo do campo e-mail ✦ // 
    cy.get('#email')
      .clear()
    cy.get('@email')
      .should('have.value', '')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains() 

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })


  //♥️♥️♥️♥️♥️♥️ Teste não preencher a mensagem - Campo Obrigatório ♥️♥️♥️♥️♥️♥️♥️ // 
  it('Não preencher campo mensagem - Campo Obrigatório', () => {

    // ✦ Preencher o campo "Nome" ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
      .type('Monteiro')
    cy.get('@sobrenome')
      .should('have.value', 'Monteiro')

    // ✦ Preencher o campo e-mail ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
      .type('michelle.teste@com')
    cy.get('@email')
      .should('have.value', 'michelle.teste@com')

    // ✦ Selecionar o produto "Blog" da lista de seleção ✦ //
    cy.get('#product')
      .select('blog')
      .should('have.value', 'blog')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    // ✦ "Checkar" o meio de contato "E-mail" ✦ //
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
      .and('have.value', 'email')

    // ✦ Preencher o campo "Mensagem" para depois apagar ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Apagar o conteúdo do campo mensagem ✦ // 
    cy.get('textarea[name="open-text-area"]')
      .clear()
    cy.get('@mensagem')
      .should('have.value', '')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
    cy.contains('button', 'Enviar').click() // Outra forma de clicar no botão Enviar usando cy.contains()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })

  //♥️♥️♥️♥️♥️♥️ Teste enviando o formulário com comando customizado ♥️♥️♥️♥️♥️♥️♥️ //
  it('Envia o formulário usando um comando customizado', () => { // Comando customizado criado em cypress/support/commands.js

    // ✦ Usar o comando customizado para preencher os campos obrigatórios e enviar o formulário ✦ //
    //💡 Nota: O comando customizado "fillMandatoryFieldsAndSubmit" preenche os campos obrigatórios e envia o formulário. Ele pode ser reutilizado em vários testes para evitar repetição de código e garantir que os campos obrigatórios sejam sempre preenchidos corretamente antes do envio.
    //💡 Nota: Se desejar personalizar os dados enviados, você pode modificar o comando para aceitar parâmetros ou criar variações conforme necessário.
    // Exemplo de como passar dados personalizados (opcional): 
    // const data = {
    //   firstName: 'Maria Michelle',
    //   lastName: 'Monteiro',
    //   email: 'michelle@teste.com',
    //   message: 'Muito Obrigada pelo atendimento!'
    // }
    cy.fillMandatoryFieldsAndSubmit() // data é um objeto com os dados a serem preenchidos no formulário de acordo a variável criada acima.

    // ✦ Verificar se a mensagem de sucesso é exibida ✦ //
    cy.get('.success')
      .should('be.visible')



  })
})
