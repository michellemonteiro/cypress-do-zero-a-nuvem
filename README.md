# 🧪 Cypress: do Zero à Nuvem

Bem-vinda(o) ao repositório oficial do curso **Cypress: do Zero à Nuvem**, criado para te ensinar automação de testes com Cypress, desde os primeiros passos até o uso avançado em pipeline de integração contínua. 🚀

## 💻 Pré-requisitos

Antes de começar, é necessário ter o **Node.js** e o **npm** instalados na sua máquina.

> Este projeto foi desenvolvido utilizando o Node.js na versão `v22.19.0` e o npm na versão `10.9.3`.
> Recomenda-se utilizar essas versões ou superiores.

## ⚙️ Instalação

#### Clone este repositório:

```bash
git clone https://github.com/michellemonteiro/cypress-do-zero-a-nuvem.git
```

Acesse a pasta do projeto:

```bash
cd cypress-do-zero-a-nuvem
```

E instale as dependências:

```bash
npm install
```

## 🧩 Executando os testes

> **Importante:**
> Antes de rodar os testes, crie uma cópia do arquivo `cypress.env.example.json` com o nome `cypress.env.json`.
> No mundo real, este arquivo conteria credenciais válidas, mas aqui ele serve apenas como exemplo.
> O arquivo `cypress.env.json` já está adicionado ao [`.gitignore`](./.gitignore), então suas informações não serão versionadas.

Para executar os testes em modo **headless (sem interface)**:

```bash
npm test
```

ou

```bash
npm t
```

Para abrir o **Cypress em modo interativo**:

```bash
npm run cy:open
```

Se quiser abrir no modo **mobile (emulação)**, utilize:

```bash
npm run cy:open:mobile
```
Ou então, para ver os testes mobile em modo headless (sem interface), utilize:

```bash
npm run teste:mobile
```

## 🌩️ Sobre o curso

O curso **Cypress: do Zero à Nuvem** foi criado para quem quer dominar automação de testes web de forma prática, clara e completa.
Durante as aulas, você vai aprender desde os fundamentos do Cypress até a integração dos testes com pipelines e nuvem.

## 💚 Apoie este projeto

Se este projeto ou curso te ajudou de alguma forma, deixe uma ⭐ no repositório!
Seu apoio faz toda a diferença. 🌟

---

Criado com 💚 por [Michelle Monteiro](https://github.com/michellemonteiro)
