# Configurando ambiente

npm i typescript --save-dev

npx tsc --init

npm i tslint --save-dev

npx tslint --init

npm i -D jest @types/jest ts-node --save-dev

npm i -D @swc/jest @swc/cli @swc/core

npx jest --init

npm i uuid @types/uuid

npm i sequelize reflect-metadata sequelize-typescript

npm i sqlite3

npm i express @types/express dotenv

npm install nodemon --save-dev

npm i -D supertest @types/supertest

npm i jstoxml

npm i -D @types/jstoxml

npm i -S yup

# Instruções do desafio de evento

Foi criado o seviço CustomerService no dominio que é responsavel por interagir com o repositorio e envar as notificações caso necessario.

Também foi adicionado um serciço CustomerAplicationService para simular uma entrada dto ao sistema. Esse serviço trata os dados para ficarem no formato do dominio e chama os metodos do serviço informado acima.
