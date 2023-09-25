<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center">
Tasks API Manager
</h1>
<p align="center">
  <a href="https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0
" target="blank"><img src="./assets/nestjs-prisma-rest-api.svg" /></a>
</p>


## Description

API de Gestão de tarefas com cadastro de usuarios.

- Tecnologia: Node.js / Nest.js
- Linguagem programação: typescript
- Persistencia: DB Postgres / ORM Prisma
- Arquitetura: Foi aplicado principios do Clean Arch e do RESTFull
- Documentação: Endpoints expostos com swagger-ui


## Installation

```bash
$ npm install
```

## Docker

```bash
# create docker-compose file
$ touch docker-compose.yml


$ # docker-compose.yml
version: '3'

services:
pgsql:
image: postgres:alpine
ports: - '5433:5432'
container_name: 'pgsql'
restart: always
volumes: - pg-data:/var/lib/postgresql/data
environment:
POSTGRES_USER: task_user
POSTGRES_PASSWORD: task_password
volumes:
pg-data:

# run
$ docker-compose up
ou
$ docker compose up
```

## Migrations
```bash 
$ npx prisma migrate dev
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Swagger
```bash
# http://localhost:3000/api-docs
```
<p align="center">

![Authentication Swagger](https://prisma-blog-ebon.vercel.app/blog/posts/nestjs-prisma-authentication/auth-workflow-swagger.gif)

</p>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jeferson Silva](https://github.com/silvajeferson82)
- linkedin - [/in/silvajeferson82](https://www.linkedin.com/in/silvajeferson82/)

## License

Nest is [MIT licensed](LICENSE).
