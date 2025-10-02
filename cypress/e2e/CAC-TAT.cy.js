//♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Teste de validar título ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //

//👨‍🏫 O bloco "describe" define a suíte de testes e o bloco "it" define o caso de teste.
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //A assertion "should('be.equal', 'O TÍTULO ESPERADO')"" é usada para comparar o valor retornado por "cy.title()"" com a string exata que você espera.
  })
})

//♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Testes de preenchimento de formulário ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //

describe('Preenche os campos obrigatórios e envia o formulário', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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

    //💡 Nota: O comando .check() é o preferido para checkboxes e radios, pois simula o comportamento real do usuário e garante que os eventos corretos de mudança de estado sejam disparados, sem a necessidade de .click().

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
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      //💡 Nota: O parâmetro { delay: 0 } é usado para eliminar o atraso padrão entre cada caractere digitado, acelerando o processo de digitação no campo de texto.
      .type('Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem', { delay: 0 })
    cy.get('@mensagem')
      .should('have.value', 'Sempre atenderam muito bem minhas solicitações. Teste de preenchimento do campo mensagem')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
      .click()

    // ✦ Verificar se a mensagem de sucesso é exibida ✦ //
    cy.get('.success')
      .should('be.visible')
      //💡 Nota: A asserção .and('contain', 'Mensagem enviada com sucesso.') verifica se o elemento contém o texto específico, garantindo que a mensagem correta seja exibida.
      .and('contain', 'Mensagem enviada com sucesso.')

  })
})

//♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ Teste de formatação inválida -> E-mail ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ //
describe('Preenche o campo e-mail com formatação inválida', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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
      .click()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste de preenchimento do campo telefone - Obrigatório ♥️♥️♥️♥️♥️♥️♥️ //
describe('Não preencher o campo telefone - campo obrigatório', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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
      .click()

    // ✦ Verificar se a mensagem de erro é exibida - telefone obrigatório✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste de preenchimento do campo telefone - Valor não numérico ♥️♥️♥️♥️♥️♥️♥️ //
describe('Preenche o campo telefone com elementos não numéricos', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('preencher o campo "Telefone" com valores não numéricos', () => {

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

    // ✦ Preencher o campo telefone com valores não numéricos ✦ // 
    cy.get('#phone')
      .as('telefone')
      .should('be.visible')
      .type('abcdefghij')
    cy.get('@telefone')
      .should('have.value', '')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste validação de campo obrogatório - Campo Telefone ♥️♥️♥️♥️♥️♥️♥️ //

describe('Preenche o campo telefone com elementos não numéricos', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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
})

//♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - Nome ♥️♥️♥️♥️♥️♥️♥️ //

describe('Não preencher o campo nome - campo obrigatório', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Não preencher campo nome - Campo Obrigatório', () => {

    // ✦ Não preencher o campo "Nome" ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
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
      .click()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - Sobrenome ♥️♥️♥️♥️♥️♥️♥️ //

describe('Não preencher o campo sobrenome - campo obrigatório', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Não preencher campo sobrenome - Campo Obrigatório', () => {

    // ✦ Preencher o campo "Nome" ✦ //
    cy.get('input[name="firstName"]')
      .as('nome')
      .should('be.visible')
      .type('Michelle')
    cy.get('@nome')
      .should('have.value', 'Michelle')

    // ✦ Não preencher o campo sobrenome ✦ //
    cy.get('input[name="lastName"]')
      .as('sobrenome')
      .should('be.visible')
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
      .click()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste sem preencher campo obrigatório - E-mail ♥️♥️♥️♥️♥️♥️♥️ //

describe('Não preencher o campo e-mail - campo obrigatório', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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

    // ✦ Não preencher o campo e-mail - campo obrigatório ✦ //
    cy.get('#email')
      .as('email')
      .should('be.visible')
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
      .click()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

//♥️♥️♥️♥️♥️♥️ Teste não preencher a mensagem - Campo Obrigatório ♥️♥️♥️♥️♥️♥️♥️ // 

describe('Não preencher o campo mensagem - campo obrigatório', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

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

    // ✦ Não preencher o campo "Mensagem" ✦ //
    cy.get('textarea[name="open-text-area"]')
      .as('mensagem')
      .should('be.visible')
      .clear()
    cy.get('@mensagem')
      .should('have.value', '')

    // ✦ Clicar no botão "Enviar" ✦ //
    cy.get('button[type="submit"]')
      .as('botaoEnviar')
      .should('be.visible')
      .click()

    // ✦ Verificar se a mensagem de erro é exibida ✦ //
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })
})

