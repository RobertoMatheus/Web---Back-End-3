const express = require('express');
const Post = require("./posts");
const { connect } = require("./db");
Posts = require('./posts');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(
session(
{
secret: 'segredo_super_secreto',
resave: false,
saveUninitialized: false,
cookie: { maxAge: 60000 } // 1 minuto de sessão
})
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));

function checkLogin(req, res, next) {
if (req.session.logado) {
next();
} else {
res.redirect('/login');
}
}

app.get('/', checkLogin, (req, res) => {
res.render('index');
});
app.get('/login', (req, res) => {
res.render('login');
});


app.post('/login',async (req, res) => {
const { usuario, senha } = req.body; 
const nome= await Posts.find(usuario,senha);
if (nome) {
req.session.logado = true;
res.redirect('/');
} else {
res.send('Usuário ou senha inválidos. <a href="/login">Tentar de novo</a>');
}}
);
app.get('/', (req,res) => {
   res.render('index');
}); 

app.get('/logout', (req, res) => {
req.session.destroy();
res.redirect('/login');
});



app.post('/mensagem_post', checkLogin, (req, res) => {
    
const msg = req.body.mensagem;
console.log('Mensagem recebida:', msg);
res.send(`Mensagem recebida: ${msg} <br><a
href="/">Voltar</a>`);
});

app.post('/mensagem_post', (req,res) => {
    let msg=req.body.mensagem;
    console.log(msg);
    res.end();
}); 







app.get('/', (req,res) => {
   res.redirect('/login');
}); 
http.createServer(app).listen(3000);
