// Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "1234-1234",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "R$ 20,00",
        weekday: [1],
        time_from: [700],
        time_to: [1200]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "1234-1234",
        bio: 'Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar. Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro com isso!"',
        subject: "Educação Física",
        cost: "R$ 40,00",
        weekday: [3],
        time_from: [1300],
        time_to: [1800]
    },
    {
        name: "Tiago Luchtenberg",
        avatar: "https://instagram.fubt1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/100618578_1490653101129585_4912246098929647616_n.jpg?_nc_ht=instagram.fubt1-1.fna.fbcdn.net&_nc_ohc=UrVxMEPy4_oAX9REjCQ&oh=adb38e7e0c99602d10a2f08795a92d0f&oe=5F58EE67",
        whatsapp: "1234-1234",
        bio: "As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido. Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.",
        subject: "Geografia",
        cost: "R$ 60,00",
        weekday: [4],
        time_from: [1900],
        time_to: [2100]
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

// Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1;
    return subject[position];
}

function pageLanding(req, res) {
    return res.render('index.html');
}

function pageStudy(req, res) {
    const filters = req.query;
    return res.render('study.html', { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
    const data = req.query;
    const isNotEmpty = Object.keys(data).length != 0;
    //se tiver dados
    if (isNotEmpty) {
        data.subject = getSubject(data.subject);
        // Adiciona dados a lista de professores
        proffys.push(data);
        return res.redirect('/study');
    }
    // Se não tiver dados, mostrar a página
    return res.render('give-classes.html', { subjects, weekdays })
}

// Servidor
const express = require('express');
const server = express();

// Configuração Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

// Configuração do servidor
server
    // Configura arquivos estáticos (css, scripts, imagens)
    .use(express.static('public'))
    // Rotas da aplicação
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    // Inicia o servidor
    .listen(5500);