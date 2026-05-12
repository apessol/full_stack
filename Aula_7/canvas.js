let ctx;

function desenhar_quadrado(x, y, largura, altura, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
}

function desenhar_linha(x1, y1, x2, y2, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = cor;
    ctx.stroke();
}

function desenhar_arco(x, y, raio, anguloInicial, anguloFinal, cor, preencher, corBorda) {
    ctx.beginPath();
    ctx.arc(x, y, raio, anguloInicial, anguloFinal);
    if (preencher) {
        ctx.fillStyle = cor;
        ctx.fill();
        if (corBorda) {
            ctx.strokeStyle = corBorda;
            ctx.stroke();
        }
    } else {
        ctx.strokeStyle = cor;
        ctx.stroke();
    }
}

function escrever(texto, x, y, cor) {
    ctx.font = "20px Arial";
    ctx.fillStyle = cor;
    ctx.fillText(texto, x, y);
}

function desenhar_triangulo(x1, y1, x2, y2, x3, y3, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
}

function desenhar_forma_livre(pontos, cor) {
    ctx.beginPath();
    ctx.moveTo(pontos[0].x, pontos[0].y);
    for (let i = 1; i < pontos.length; i++) {
        ctx.lineTo(pontos[i].x, pontos[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
}

const canvas1 = document.getElementById("canvas1");
ctx = canvas1.getContext("2d");

escrever("Canvas", 115, 50, "black");

desenhar_linha(0, 150, 300, 150, "green");
desenhar_linha(150, 150, 150, 300, "gray");
desenhar_linha(50, 50, 150, 150, "blue");
desenhar_linha(250, 50, 150, 150, "red");

desenhar_quadrado(0, 0, 50, 50, "blue");
desenhar_quadrado(250, 0, 50, 50, "red");
desenhar_quadrado(110, 150, 40, 40, "red");
desenhar_quadrado(0, 120, 30, 60, "cyan");
desenhar_quadrado(270, 135, 30, 30, "cyan");

desenhar_quadrado(0, 240, 30, 30, "yellow");
desenhar_quadrado(0, 270, 30, 30, "yellow");
desenhar_quadrado(30, 270, 30, 30, "yellow");

desenhar_quadrado(270, 240, 30, 30, "black");
desenhar_quadrado(270, 270, 30, 30, "black");
desenhar_quadrado(240, 270, 30, 30, "black");

desenhar_arco(150, 150, 45, Math.PI, 2 * Math.PI, "green", false);
desenhar_arco(150, 150, 75, Math.PI, 2 * Math.PI, "green", false);
desenhar_arco(150, 300, 45, Math.PI, 2 * Math.PI, "green", false);
desenhar_arco(150, 300, 75, Math.PI, 2 * Math.PI, "green", false);

desenhar_arco(150, 110, 15, 0, 2 * Math.PI, "cyan", true, "blue");
desenhar_arco(75, 215, 15, 0, 2 * Math.PI, "yellow", true, "green");
desenhar_arco(225, 215, 15, 0, 2 * Math.PI, "yellow", true, "green");
desenhar_arco(150, 300, 40, Math.PI, 2 * Math.PI, "cyan", true, "cyan");


const canvas2 = document.getElementById("canvas2");
ctx = canvas2.getContext("2d");

desenhar_quadrado(0, 0, 300, 300, "aquamarine");
desenhar_quadrado(0, 220, 300, 80, "gray");

desenhar_forma_livre([
    {x: 0, y: 190},
    {x: 30, y: 190},
    {x: 40, y: 260},
    {x: 150, y: 260},
    {x: 150, y: 300},
    {x: 0, y: 300}
], "dodgerblue");

desenhar_arco(220, 70, 40, 0, 2 * Math.PI, "yellow", true);

desenhar_quadrado(110, 140, 80, 80, "saddlebrown");
desenhar_quadrado(140, 180, 20, 40, "darkolivegreen");
desenhar_quadrado(120, 155, 20, 20, "deepskyblue");
desenhar_quadrado(160, 155, 20, 20, "deepskyblue");
desenhar_triangulo(100, 140, 200, 140, 150, 90, "tomato");

desenhar_quadrado(55, 180, 15, 40, "sienna");
desenhar_arco(62, 170, 20, 0, 2 * Math.PI, "forestgreen", true);

desenhar_quadrado(245, 190, 15, 50, "sienna");
desenhar_arco(252, 180, 22, 0, 2 * Math.PI, "forestgreen", true);