const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const porta = 80;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new sqlite3.Database('./banco.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, resumo TEXT, conteudo TEXT)");
    
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, login TEXT, senha TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS carros (id INTEGER PRIMARY KEY AUTOINCREMENT, marca TEXT, modelo TEXT, ano INTEGER, qtde_disponivel INTEGER)");
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

app.get('/carros_cadastro_user', (req, res) => {
    res.sendFile(__dirname + '/carros_cadastro_user.html');
});

app.post('/carros_registrar', (req, res) => {
    db.run("INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)", [req.body.nome, req.body.login, req.body.senha], (err) => {
        res.redirect('/carros_login');
    });
});

app.get('/carros_login', (req, res) => {
    res.sendFile(__dirname + '/carros_login.html');
});

app.post('/carros_logar', (req, res) => {
    db.get("SELECT * FROM usuarios WHERE login = ? AND senha = ?", [req.body.login, req.body.senha], (err, row) => {
        if (row) {
            res.redirect('/carros_lista');
        } else {
            res.redirect('/carros_login');
        }
    });
});

app.get('/carros_lista', (req, res) => {
    db.all("SELECT * FROM carros", [], (err, rows) => {
        res.render('carros_lista', { carros: rows });
    });
});

app.get('/carros_gerencia', (req, res) => {
    db.all("SELECT * FROM carros", [], (err, rows) => {
        res.render('carros_gerencia', { carros: rows });
    });
});

app.post('/carros_add', (req, res) => {
    db.run("INSERT INTO carros (marca, modelo, ano, qtde_disponivel) VALUES (?, ?, ?, ?)", [req.body.marca, req.body.modelo, req.body.ano, req.body.qtde_disponivel], (err) => {
        res.redirect('/carros_gerencia');
    });
});

app.post('/carros_delete/:id', (req, res) => {
    db.run("DELETE FROM carros WHERE id = ?", [req.params.id], (err) => {
        res.redirect('/carros_gerencia');
    });
});

app.get('/carros_editar_page/:id', (req, res) => {
    db.get("SELECT * FROM carros WHERE id = ?", [req.params.id], (err, row) => {
        res.render('carros_editar', { carro: row });
    });
});

app.post('/carros_update/:id', (req, res) => {
    db.run("UPDATE carros SET marca = ?, modelo = ?, ano = ?, qtde_disponivel = ? WHERE id = ?", [req.body.marca, req.body.modelo, req.body.ano, req.body.qtde_disponivel, req.params.id], (err) => {
        res.redirect('/carros_gerencia');
    });
});

app.post('/carros_vender/:id', (req, res) => {
    db.run("UPDATE carros SET qtde_disponivel = qtde_disponivel - 1 WHERE id = ? AND qtde_disponivel > 0", [req.params.id], (err) => {
        res.redirect('/carros_lista');
    });
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta 80");
});