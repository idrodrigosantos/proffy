// Servidor
const express = require('express');
const server = express();

const { pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages');

// Configuração Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

// Configuração do servidor
server
    // Recebe os dados do req.body
    .use(express.urlencoded({ extended: true }))
    // Configura arquivos estáticos (css, scripts, imagens)
    .use(express.static('public'))
    // Rotas da aplicação
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .post('/save-classes', saveClasses)
    // Inicia o servidor
    .listen(5500);