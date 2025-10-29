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
    cy.get('input[type="radio"][value="elogio"]') // Usando seletor CSS para encontrar o radio button com valor 'elogio'. Veja que estou usando aspas simples por fora e aspas duplas por dentro. Quando utilizar aspas simples por fora, dentro do seletor CSS, as aspas devem ser duplas. E quando utilizar aspas duplas por fora, dentro do seletor CSS, as aspas devem ser simples.
      // 1. Usa o comando .check() para marcar/selecionar o radio button encontrado
      .check()
      // 🤖 2. Asserção principal: Verifica se o elemento Elogio está marcado (confirma que o .check() funcionou)
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

  // ♥️♥️♥️♥️♥️♥️ Teste de Select - Selecionar produtos pelo valor ♥️♥️♥️♥️♥️♥️♥️ //

  it('Selecionar produtos pelo valor', () => {

    // ✦ Selecionar o produto "YouTube" da lista de seleção pelo valor ✦ //
    cy.get('#product')
      .select('youtube') // Seleciona o produto pelo valor do atributo 'value' na tag <option>
      .should('have.value', 'youtube') // Verifica se o valor selecionado é 'youtube'

    // ✦ Selecionar o produto "Mentoria" da lista de seleção pelo valor ✦ //
    cy.get('#product')
      .select('mentoria') // Seleciona o produto pelo valor do atributo 'value' na tag <option>
      .should('have.value', 'mentoria') // Verifica se o valor selecionado é 'mentoria'

    // ✦ Selecionar o produto "Blog" da lista de seleção pelo valor ✦ //
    cy.get('#product')
      .select('blog') // Seleciona o produto pelo valor do atributo 'value' na tag <option>
      .should('have.value', 'blog') // Verifica se o valor selecionado é 'blog'

    // ✦ Selecionar o produto "Curso" da lista de seleção pelo valor ✦ //
    cy.get('#product')
      .select('cursos') // Seleciona o produto pelo valor do atributo 'value' na tag <option>
      .should('have.value', 'cursos') // Verifica se o valor selecionado é 'curso'
  })

  // ♥️♥️♥️♥️♥️♥️ Teste de Select - Selecionar produtos pelo texto ♥️♥️♥️♥️♥️♥️♥️ //

  it('Selecionar produtos pelo texto', () => {

    // ✦ Selecionar o produto "YouTube" da lista de seleção pelo texto visível ✦ //
    cy.get('#product')
      .select('YouTube') // Seleciona o produto pelo texto visível na tag <option>
      .should('have.value', 'youtube') // Verifica se o valor selecionado é 'youtube'

    // ✦ Selecionar o produto "Mentoria" da lista de seleção pelo texto visível ✦ //
    cy.get('#product')
      .select('Mentoria') // Seleciona o produto pelo texto visível na tag <option>
      .should('have.value', 'mentoria') // Verifica se o valor selecionado é 'mentoria'

    // ✦ Selecionar o produto "Blog" da lista de seleção pelo texto visível ✦ //
    cy.get('#product')
      .select('Blog') // Seleciona o produto pelo texto visível na tag <option>
      .should('have.value', 'blog') // Verifica se o valor selecionado é 'blog'

    // ✦ Selecionar o produto "Curso" da lista de seleção pelo texto visível ✦ //
    cy.get('#product')
      .select('Cursos') // Seleciona o produto pelo texto visível na tag <option>
      .should('have.value', 'cursos') // Verifica se o valor selecionado é 'curso'
  })

  // ♥️♥️♥️♥️♥️♥️ Teste de Select - Selecionar produtos pelo índice ♥️♥️♥️♥️♥️♥️♥️ //

  it('Selecionar produtos pelo índice', () => { //Índice começa em 0 (zero) - YouTube = 0, Mentoria = 1, Blog = 2, Curso = 3 

    // ✦ Selecionar o produto "YouTube" da lista de seleção pelo índice ✦ //
    cy.get('#product')
      .select(1) // Seleciona o produto pelo índice (posição) na lista de opções (blog está na posição 1 porque, o índice começa em 0 e o primeiro item é "Selecione um produto" que se encontra desabilitado)
      .should('have.value', 'blog') // Verifica se o valor selecionado é 'blog'

    // ✦ Selecionar o produto "Mentoria" da lista de seleção pelo índice ✦ //
    cy.get('#product')
      .select(2) // Seleciona o produto pelo índice (posição) na lista de opções
      .should('have.value', 'cursos') // Verifica se o valor selecionado é 'cursos'

    // ✦ Selecionar o produto "Blog" da lista de seleção pelo índice ✦ //
    cy.get('#product')
      .select(3) // Seleciona o produto pelo índice (posição) na lista de opções
      .should('have.value', 'mentoria') // Verifica se o valor selecionado é 'mentoria'

    // ✦ Selecionar o produto "Curso" da lista de seleção pelo índice ✦ //
    cy.get('#product')
      .select(4) // Seleciona o produto pelo índice (posição) na lista de opções
      .should('have.value', 'youtube') // Verifica se o valor selecionado é 'youtube'
  })

  // ♥️♥️♥️♥️♥️♥️ Marca cada tipo de atendimento ♥️♥️♥️♥️♥️♥️♥️ //
  it('Marca cada tipo de atendimento', () => {

    // ✦ Selecionar cada tipo de atendimento (radio buttons) e verificar se estão marcados ✦ //

    cy.get('input[type="radio"]') // Seleciona todos os elementos de input do tipo radio
      .should('have.length', 3) // Verifica se existem exatamente 3 radio buttons na página
      .each(($radio) => { // Itera sobre cada radio button encontrado //Posso colocar qualquer nome no lugar de $radio, como por exemplo: $elemento, $el, $item, etc. Qualqwer nome que comece com $ indica que é um elemento jQuery. Posso colocar qualquer nome que eu quiser, desde que comece com $. E se não começar com $, o Cypress vai entender que é uma variável comum do JavaScript. Exemplo de variável comum do JavaScript: elemento, el, item, etc. Exemplo de variável jQuery: $elemento, $el, $item, etc.
        cy.wrap($radio) // Envolve o elemento jQuery para usar comandos Cypress
          .check() // Marca o radio button atual
          .should('be.checked') // Verifica se o radio button atual está marcado
      })
  })

  // ♥️♥️♥️♥️♥️♥️ Marca ambos os checkboxes, depois desmarca o último ♥️♥️♥️♥️♥️♥️♥️ //

  it('Marca ambos os checkboxes, depois desmarca o último', () => {

    // ✦ Selecionar ambos os checkboxes e verificar se estão marcados ✦ //

    cy.get('input[type="checkbox"]') // Seleciona todos os elementos de input do tipo checkbox
      .should('have.length', 2) // Verifica se existem exatamente 3 checkboxes na página
      .as('checkboxes') // Dá um alias para o conjunto de checkboxes para reutilização

    cy.get('@checkboxes') // Usa o alias para selecionar os checkboxes
      .check() // Marca todos os checkboxes
      .should('be.checked') // Verifica se todos os checkboxes estão marcados

    // ✦ Desmarcar o último checkbox e verificar se está desmarcado ✦ //

    cy.get('@checkboxes') // Usa o alias para selecionar os checkboxes
      .last() // Seleciona o último checkbox do conjunto
      .uncheck() // Desmarca o último checkbox
      .should('not.be.checked') // Verifica se o último checkbox está desmarcado

  })

  // ♥️♥️♥️♥️♥️♥️  Marca ambos checkboxes, depois demarca o último ♥️♥️♥️♥️♥️♥️♥️ //
  it('Seleciona ambos checkboxes, depois desmarca o último', () => {

    // ✦ Selecionar ambos os checkboxes e verificar se estão marcados ✦ //

    cy.get('input[type="checkbox"]') // Seleciona todos os elementos de input do tipo checkbox
      .should('have.length', 2) // Verifica se existem exatamente 3 checkboxes na página
      .as('checkboxes') // Dá um alias para o conjunto de checkboxes para reutilização

    cy.get('@checkboxes') // Usa o alias para selecionar os checkboxes
      .check() // Marca todos os checkboxes
      .should('be.checked') // Verifica se todos os checkboxes estão marcados

    // ✦ Desmarcar o último checkbox e verificar se está desmarcado ✦ //

    cy.get('@checkboxes') // Usa o alias para selecionar os checkboxes
      .last() // Seleciona o último checkbox do conjunto
      .uncheck() // Desmarca o último checkbox
      .should('not.be.checked') // Verifica se o último checkbox está desmarcado  
  })

  // ♥️♥️♥️♥️♥️♥️ Teste de upload de arquivo - Seleção pelo caminho ♥️♥️♥️♥️♥️♥️♥️ //

  it('Faz upload de um arquivo da pasta fixtures usando o comando selectFile', () => {

    // ✦ Fazer upload de um arquivo da pasta fixtures usando o comando selectFile e verificar se o arquivo foi carregado corretamente ✦ //

    cy.get('input[type="file"]') // Seleciona o elemento de input do tipo file (campo de upload)
      .should('exist') // Verifica se o campo de upload existe na página
      .selectFile('cypress/fixtures/example.json') // Usa o comando selectFile para selecionar o arquivo example.json da pasta fixtures
      .then(input => { // Usa uma função then para acessar o elemento input após o upload
        expect(input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'
      })
  })

  // ♥️♥️♥️♥️♥️♥️ Seleciona um arquivo simulando um drag-and-drop ♥️♥️♥️♥️♥️♥️♥️ //

  it('Seleciona um arquivo simulando um drag-and-drop', () => {

    // ✦ Fazer upload de um arquivo simulando um drag-and-drop e verificar se o arquivo foi carregado corretamente ✦ // 
    cy.get('input[type="file"]') // Seleciona o elemento de input do tipo file (campo de upload)
      .should('exist') // Verifica se o campo de upload existe na página
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) // Usa o comando selectFile com a opção action: 'drag-drop' para simular um drag-and-drop do arquivo example.json da pasta fixtures
      .then(input => { // Usa uma função then para acessar o elemento input após o upload
        expect(input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'
      })
  })

  // ♥️♥️♥️♥️♥️♥️ Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias ♥️♥️♥️♥️♥️♥️♥️ //

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

    // ✦ Fazer upload de um arquivo utilizando uma fixture para a qual foi dada um alias e verificar se o arquivo foi carregado corretamente ✦ //

    cy.fixture('example.json').as('sampleFile') // Usa o comando fixture para carregar o arquivo example.json da pasta fixtures e dá um alias 'sampleFile' para ele

    cy.get('input[type="file"]') // Seleciona o elemento de input do tipo file (campo de upload)
      .should('exist') // Verifica se o campo de upload existe na página
      .selectFile('@sampleFile') // Usa o comando selectFile com o alias '@sampleFile' para selecionar o arquivo carregado anteriormente
      .then(input => { // Usa uma função then para acessar o elemento input após o upload
        expect(input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'
      })
  })

  // ♥️♥️♥️♥️♥️♥️ Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique ♥️♥️♥️♥️♥️♥️♥️ //

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    // ✦ Verificar se o link da política de privacidade abre em outra aba ✦ //

    cy.get('#privacy a') // Seleciona o link da política de privacidade dentro do elemento com id 'privacy'
      .should('have.attr', 'target', '_blank') // Verifica se o atributo 'target' do link é igual a '_blank', indicando que ele abre em outra aba

      // // Outra forma de fazer a verificação:
      // cy.contains('a', 'Política de Privacidade') // Seleciona o link da política de privacidade pelo texto visível
      // .should('have.attr', 'href', 'privacy.html') // Verifica se o atributo 'href' do link é igual a 'privacy.html'
      // .and('have.attr', 'target', '_blank') // Verifica se o atributo 'target' do link é igual a '_blank' --> o .and() é usado para encadear múltiplas asserções no mesmo elemento, garantindo que todas as condições sejam verificadas sequencialmente. Como se eu estivesse dizendo "e também deve ter o atributo 'target' igual a '_blank'".
    
  })

  // ♥️♥️♥️♥️♥️♥️ Acessa a página da política de privacidade removendo o target e então clicando no link ♥️♥️♥️♥️♥️♥️♥️ //

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    // ✦ Remover o atributo target do link da política de privacidade e clicar nele para abrir na mesma aba ✦ //

    cy.get('#privacy a') // Seleciona o link da política de privacidade dentro do elemento com id 'privacy'
      .invoke('removeAttr', 'target') // Remove o atributo 'target' do link para que ele abra na mesma aba
      .click() // Clica no link para navegar para a página da política de privacidade

    // // ✦ Verificar se o conteúdo da página da política de privacidade está visível ✦ //

    cy.contains('Talking About Testing').should('be.visible') // Verifica se o texto 'Talking About Testing' está visível na página, indicando que a navegação foi bem-sucedida
    
    // Outra forma de fazer a verificação:
    // cy.contains('a', 'Política de Privacidade') // Seleciona o link da política de privacidade pelo texto visível
    // .invoke('removeAttr', 'target') // Remove o atributo 'target' do link para que ele abra na mesma aba
    // .click() // Clica no link para navegar para a página da política de privacidade
    // cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')// Verifica se o título da página da política de privacidade está visível, indicando que a navegação foi bem-sucedida

  })
  
  

})


