Passo a Passo do que fiz
1) NPM Init para packege.json
2) Install Express
3) Install Nodemon como dependencia de desenvolvimento apenas
4) Script de Start e DEV com node e nodemon respectivamente
5) Pasta SRC e o app.js
6) Criei no Insonmia 
7) Instalar o Babel para usar o import e export do que Require pq o Node nao entende 
8) Criar o arquivo .babelrc e configurar
9) Vai pro package.json e ajusta as dependencias "dev": "nodemon --exec babel-node src/app.js",
10) ajusta o app pra import
11) criar o script de build no package.json
12) dar um npm intall npm-run-all para juntar os scripts
13) criar o clean e ajustar o start para ter o clean tmb
14) Instalar o dotenv (npm install dotenv) para criar variavel de ambiente e fui no app.js e importei o dotenv e fiz o dotenv.config();
15) Criei o arquivo .env e configurei o PORT=5050  e alterei no app.js a porta de escuta pela variavel de ambiente do .env
16) Criei o .gitignore pra nao mandar o .env e o node_modules