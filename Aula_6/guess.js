let numeroAleatorio = Math.random();

let numeroSecreto = Math.floor(numeroAleatorio * 100);

function verificarPalpite() {
    let palpite = document.getElementById("palpite-usuario").value;
    let mensagem = document.getElementById("mensagem");

    if (palpite === "") {
        mensagem.innerHTML = "Por favor, digite um número.";
        return;
    }

    palpite = Number(palpite);

    if (palpite === numeroSecreto) {
        mensagem.innerHTML = "Parabéns! Você acertou! O número era " + numeroSecreto;
        document.getElementById("container-jogo").style.setProperty("background-color", "lightgreen");
    } 
    else if (palpite > numeroSecreto) {
        mensagem.innerHTML = "Errou! O número secreto é MENOR.";
        document.getElementById("container-jogo").style.setProperty("background-color", "red");
    } 
    else if (palpite < numeroSecreto) {
        mensagem.innerHTML = "Errou! O número secreto é MAIOR.";
        document.getElementById("container-jogo").style.setProperty("background-color", "red");
    }
}