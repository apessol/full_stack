const express = require('express');
const path = require('path');
const app = express();

const porta = 80;

app.use(express.static(__dirname));

app.listen(porta, () => {
    console.log("Servidor rodando na porta 80");
});