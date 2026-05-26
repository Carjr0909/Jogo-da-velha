let cmi1 = "img/img1.webp";
let cmi2 = "img/img2.webp";
let cmi3 = "img/img3.webp";
let cmi4 = "img/img4.webp";
let cmi5 = "img/img5.webp";
let cmi6 = "img/img6.webp";

document.addEventListener("DOMContentLoaded", () => {
    abrirModal();
    start();
});

function start() {

    const cartas = [
        cmi1, cmi1,
        cmi2, cmi2,
        cmi3, cmi3,
        cmi4, cmi4,
        cmi5, cmi5,
        cmi6, cmi6
    ];

    const embaralhadas = embaralharComPares(cartas);

    for (let i = 0; i < embaralhadas.length; i++) {

        const img = document.querySelector(`#c${i + 1} img`);

        img.dataset.imagem = embaralhadas[i];

        img.style.backgroundImage = "none";

        img.classList.remove("ativo");
    }
}

function embaralharComPares(array) {

    const novoArray = [...array];

    for (let i = novoArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }

    return novoArray;
}

let primeiroClick = false;
let segundoClick = false;

let cart = ["", ""];
let cart2 = ["", ""];

let bloqueado = false;
let cartasCombinadas = [];
let pont = 0;

function clique(elemento) {

    if (!estaRodando){
        return;
    }
    if (bloqueado) return;

    if (cartasCombinadas.includes(elemento.id)) return;

    if (cart2[0] === elemento.id) return;

    const imagem = elemento.querySelector("img");

    imagem.style.backgroundImage = `url(${imagem.dataset.imagem})`;
    imagem.style.backgroundSize = "cover";
    imagem.style.backgroundPosition = "center";

    imagem.classList.add("ativo");

    if (!primeiroClick) {

        cart2[0] = elemento.id;

        // agora compara dataset
        cart[0] = imagem.dataset.imagem;

        primeiroClick = true;

    } else if (!segundoClick) {

        cart2[1] = elemento.id;
        cart[1] = imagem.dataset.imagem;

        segundoClick = true;

        if (cart[0] === cart[1]) {

            cartasCombinadas.push(cart2[0]);
            cartasCombinadas.push(cart2[1]);

            primeiroClick = false;
            segundoClick = false;

            cart = ["", ""];
            cart2 = ["", ""];

            pont++;

            pontuacao();

        } else {

            bloqueado = true;

            setTimeout(() => {

                const img1 = document.querySelector(`#${cart2[0]} img`);
                const img2 = document.querySelector(`#${cart2[1]} img`);

                img1.style.backgroundImage = "none";
                img2.style.backgroundImage = "none";

                img1.classList.remove("ativo");
                img2.classList.remove("ativo");

                primeiroClick = false;
                segundoClick = false;

                cart = ["", ""];
                cart2 = ["", ""];

                bloqueado = false;

            }, 1000);
        }
    }
}

let tempoRestante = 120;
let tempoTotal = 120;

let intervalo = null;
let estaRodando = false;

const display = document.getElementById("timer");

function atualizarDisplay() {

    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    const minutosFormatados = minutos.toString().padStart(2, "0");
    const segundosFormatados = segundos.toString().padStart(2, "0");

    display.textContent = `${minutosFormatados}:${segundosFormatados}`;
}

function iniciarTimer() {

    if (estaRodando) return;

    estaRodando = true;

    intervalo = setInterval(() => {

        if (tempoRestante > 0) {

            tempoRestante--;

            atualizarDisplay();

        } else {

            clearInterval(intervalo);

            estaRodando = false;

            document.getElementById("modalPerdeu").style.display = "flex";
        }

    }, 1000);
}

function pontuacao() {

    if (pont === 6) {

        pararTimer();

        document.getElementById("timerFinal").innerHTML =
            tempoTotal - tempoRestante;

        document.getElementById("modalFim").style.display = "flex";
    }
}

function pararTimer() {

    clearInterval(intervalo);

    estaRodando = false;
}

function resetarTimer() {

    pararTimer();

    tempoRestante = 120;

    atualizarDisplay();

    primeiroClick = false;
    segundoClick = false;

    cart = ["", ""];
    cart2 = ["", ""];

    bloqueado = false;

    cartasCombinadas = [];

    pont = 0;

    start();
}

atualizarDisplay();

let contador = 3;

function abrirModal() {

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {

    document.getElementById("modal").style.display = "none";

    document.getElementById("modalFim").style.display = "none";

    document.getElementById("modalPerdeu").style.display = "none";
}

function iniciarContagem() {

    const elemento = document.getElementById("contador");

    elemento.style.display = "flex";

    elemento.innerHTML = contador;

    const intervaloContagem = setInterval(() => {

        contador--;

        elemento.innerHTML = contador;

        if (contador === 0) {

            elemento.innerHTML = "JÁ!";
        }

        if (contador < 0) {

            clearInterval(intervaloContagem);

            elemento.style.display = "none";

            contador = 3;
        }

    }, 1000);

    setTimeout(() => {

        iniciarTimer();

    }, 4000);
}