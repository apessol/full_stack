const canvas = document.getElementById("canvas-animacao");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "bola.jpg";

let mouseX = 150;
let mouseY = 150;

canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let imgW = 50;
    let imgH = 50;

    let limiteX = imgW / 2;
    let limiteY = imgH / 2;

    let x = mouseX;
    let y = mouseY;

    if (x < limiteX) x = limiteX;
    if (x > canvas.width - limiteX) x = canvas.width - limiteX;
    if (y < limiteY) y = limiteY;
    if (y > canvas.height - limiteY) y = canvas.height - limiteY;

    ctx.drawImage(img, x - limiteX, y - limiteY, imgW, imgH);

    requestAnimationFrame(desenhar);
}

img.onload = function() {
    desenhar();
};