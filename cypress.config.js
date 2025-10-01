const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //Informando para o arquivo que a largura e a altura do navegador deverá ser estas abaixo.
  viewportHeight: 880,
  viewportWidth: 1280,
  //Indica que o projwto de testes é End-To-End
  e2e: {},
})

