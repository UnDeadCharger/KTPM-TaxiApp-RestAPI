<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

#Personal Note

# Technology Concept

## **NestJS**

Opionated backend NestJS framework, based on expressJs

1. Modules (`nest generate module`) organize and establish clear boundaries, grouping related Controllers/Resolvers/Services together. Modules can import other modules.
   There is a root module called `AppModule` which is responsible for starting the application.
2. Controller (`nest generate controller`) defining REST endpoints. Each controller has one or more route handlers for each endpoint.
3. Services (`nest generate service`) implement and isolate business logic. Services are a kind of [provider](https://docs.nestjs.com/providers).

## PostGre - Database

## Prisma - Sequelize

# Lesson 1: Setting up

> npx @nestjs/cli new median

Source Folder: actual code reside
Test Folder: end-to-end and API testing

> npm run start:dev

Run the back-end

Create postgre instance

by create docker compose file

> touch docker-compose.yml

## Install and init Prisma for project

> npm i --save-dev prisma typescript ts-node @types/node nodemon

> npx prisma init --datasource-provider postgresql

change variables in .env file

> npx prisma migrate dev --name init

Use this to generate SQL Schema, update database and the client.

The client is used to interact with database

Seeding

Create Seed Script

use upsert isntead of insert to prevent duplicated data
where of upsert must be a unique field

> npx prisma db seed

> "prisma": {
> "seed": "ts-node prisma/seed.ts"
> }

The path of the seed file is declared in package.JSON

##Init prisma inside nest.js
integrate prisma into Nest architecture
PrismaService Purpose

npx nest generate module prisma
npx nest generate service prisma

# or shorthand

npx nest g mo prisma
npx nest g s prisma

check db wiwth npx prisma studio

https://github.com/prisma/prisma/issues/20171 ERROR WAS FOUND 3 DAYS AGO, READ HERE TO FIX IN GUIDe

##Prisma Module
Allow youo to export

##init Swagger

create a swagger document in main.ts
[Swagger] is a tool to document your API using the [OpenAPI specification]Nest has a dedicated module for Swagger, which you will be using shortly.

npm install --save @nestjs/swagger swagger-ui-express

Potential error when install: make sure youre in the median folder (the folder that has as it sub-folder @nestjs), otherwise the path for swagger will be wrong

http://localhost:3000/api

to access swagger ui after running server

Q&A
You dont have to learn SQL, easier to integrate with prisma eco system

#REST API
start by generating REST ENDPOINT
npx nest generate resource

# CLI prompts

? What name would you like to use for this resource (plural, e.g., "users")? articles
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? (Y/n) y

Inside module of Khach-hangs
import prisma module

-> this allow you to use prisma service inside the newly-imported module

KhachHang Service is where the query will reside
init a prisma constructor in khachhang service

implementing route in Controller

a Route consist of
@GET ('sth')
findAllRegistered() {
return this.Prisma.khachHang.findMany({ where: { isRegistered: true } });
}

#CREATING API
Build Function in Service

Call Function in Controller
QOL:
APITAGS to controller: naming end point

GET() Cant have a body

##VALIDATION
###VALIDATION PIPE - NESTJS
npm install class-validator class-transformer (Typescript decorator based package)

in Main.ts: App use (New Validator sth sth)

in DTO update it with these decorator @isString @isOptional

### TRANSFORM PIPE

These are used to convert parameters into correct type
@Param('id', ParseIntPipe)
