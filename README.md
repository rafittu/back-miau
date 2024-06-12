# 🐚 Back-end da aplicação MIAU

###

<br>

A API MIAU está sendo desenvolvida com o propósito de reinventar o ambiente de trabalho e espaços compartilhados, promovendo participação, colaboração e a busca constante por melhorias.

Ao adotar o nome "MIAU", entramos na sensibilidade dos gatos que fazem com que eles sejam capazes de absorver energias, assim como um filtro, limpando o que é negativo. Assim como nossos amigos felinos, a plataforma visa transformar o que não está ideal, proporcionando um espaço onde as ideias possam prosperar e contribuir para um ambiente mais agradável e estimulante.

<br>

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Node.js** com framework **NestJS** e **TypeScript**;
- **Prisma ORM** para comunicação e manipulação do banco de dados **PostgreSQL**;
- **Docker** como uma ferramenta de containerização;

- **Jest** para execução dos testes unitários;
- **Swagger** para documentação da API;

<br>

## Instalação

Clonando o repositório:

```bash
$ git clone git@github.com:rafittu/back-miau.git
```

Instalando as dependências:

```bash
$ cd back-miau
$ npm install
```

<br>

## Iniciando o app

Crie um arquivo `.env` na raiz do projeto e preencha as informações de acordo com o arquivo `.env.example` disponível.

Execute o banco de dados PostgreSQL usando o Docker:

```bash
$ docker-compose up
```

Para garantir que o banco de dados esteja atualizado com as ultimas alterações, rode o comando:

```bash
$ npx prisma migrate dev
```

Iniciando o servidor:

```bash
# modo de desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev
```

<br>

##

<p align="right">
  <a href="https://www.linkedin.com/in/rafittu/">Rafael Ribeiro 🚀</a>
</p>
