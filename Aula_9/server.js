const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const porta = 80;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new sqlite3.Database('./blog.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, resumo TEXT, conteudo TEXT)");
});

const usuariosCadastrados = [];

app.get('/', (req, res) => {
    res.redirect('/projects.html');
});

app.get('/cadastra', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/salvar', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    usuariosCadastrados.push({ usuario: usuario, senha: senha });
    
    res.redirect('/login');
});

app.post('/logar', (req, res) => {
    const usuarioDigitado = req.body.usuario;
    const senhaDigitada = req.body.senha;

    let loginSucesso = false;
    for (let i = 0; i < usuariosCadastrados.length; i++) {
        if (usuariosCadastrados[i].usuario === usuarioDigitado && usuariosCadastrados[i].senha === senhaDigitada) {
            loginSucesso = true;
            break;
        }
    }

    if (loginSucesso) {
        res.render('resposta', { mensagem: "Acesso Liberado! Bem-vindo.", cor: "green" });
    } else {
        res.render('resposta', { mensagem: "Acesso Negado! Usuário ou senha incorretos.", cor: "red" });
    }
});

app.get('/blog', (req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        res.render('blog', { posts: rows });
    });
});

app.get('/cadastrar_post.html', (req, res) => {
    res.sendFile(__dirname + '/cadastrar_post.html');
});

app.post('/salvar_post', (req, res) => {
    const titulo = req.body.titulo;
    const resumo = req.body.resumo;
    const conteudo = req.body.conteudo;
    
    db.run("INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)", [titulo, resumo, conteudo], (err) => {
        res.sendFile(__dirname + '/sucesso.html');
    });
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta 80");
});