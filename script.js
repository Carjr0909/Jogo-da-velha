let cmi1 = "img/img1.webp";
let cmi2 = "img/img2.webp";
let cmi3 = "img/img3.webp";
let cmi4 = "img/img4.webp";
let cmi5 = "img/img5.webp";
let cmi6 = "img/img6.webp";

document.addEventListener("DOMContentLoaded", abrirModal);

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
        document.querySelector(`#c${i + 1} img`).src = embaralhadas[i];
    }
}

function embaralharComPares(array) {
  // Cria uma cópia do array para não modificar o original
  const novoArray = [...array];
  
  for (let i = novoArray.length - 1; i > 0; i--) {
    // Sorteia um índice aleatório
    const j = Math.floor(Math.random() * (i + 1));
    
    // Troca o par da posição 'i' com o par da posição 'j'
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }
  
  return novoArray;
}

let primeiroClick = false;
let segundoClick = false;
let cardbloqueado = [];
let cart = ["", ""];
let cart2 = ["", ""];

function clique(elemento, embaralhadas) {
    if(!primeiroClick) {
        elemento.querySelector("img").classList.add("ativo");
        cart2[0] = elemento.querySelector.id;
        cart[0] = elemento.querySelector("img").src
        primeiroClick = true;
    }
    else if(!segundoClick) {
        elemento.querySelector("img").classList.add("ativo");
        cart2[1] = elemento.querySelector.id;
        cart[1] = elemento.querySelector("img").src
        segundoClick = true;

        if(cart[0] === cart[1]) {
            primeiroClick = false;
            segundoClick = false;
        }
        else {
            setTimeout(() => {
                elemento.querySelector("img").classList.remove("ativo");
                document.querySelector(`img[id="${cart2[0]}"]`).parentElement.querySelector("img").classList.remove("ativo");
                document.querySelector(`img[id="${cart2[1]}"]`).parentElement.querySelector("img").classList.remove("ativo");
                primeiroClick = false;
                segundoClick = false;
            }, 1000);
        }
    }
}


let tempoRestante = 120; // Tempo em segundos (ex: 2 minutos)
let intervalo = null;
let estaRodando = false;

const display = document.getElementById('timer');

function atualizarDisplay() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    
    // Formata para sempre ter 2 dígitos (ex: 05:00 ao invés de 5:0)
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');
    
    display.textContent = `${minutosFormatados}:${segundosFormatados}`;
}

function iniciarTimer() {
    if (estaRodando) return; // Evita criar múltiplos intervalos

    estaRodando = true;
    intervalo = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(intervalo);
            estaRodando = false;
            alert('O tempo acabou!');
        }
    }, 1000); // 1000 milissegundos = 1 segundo
    
}

function pararTimer() {
    clearInterval(intervalo);
    estaRodando = false;
}

function resetarTimer() {
    pararTimer();
    tempoRestante = 120; // Volta para os 2 minutos iniciais
    atualizarDisplay();
    start(); // Inicia o sorteio quando o timer começar
    for (let i = 1; i <= 12; i++) {
    document.querySelector(`#c${i} img`).classList.remove("ativo");
}

}

atualizarDisplay(); // Exibe o tempo inicial antes de clicar em Start

let contador = 3;

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function iniciarContagem() {

    const elemento = document.getElementById("contador");

    elemento.style.display = "flex";

    elemento.innerHTML = contador;

    const intervalo = setInterval(() => {

        contador--;

        elemento.innerHTML = contador;

        if (contador == 0) {

            elemento.innerHTML = "JÁ!";

        }

        if (contador < 0) {

            clearInterval(intervalo);

            elemento.style.display = "none";

            contador = 3;
        }

    }, 1000);


    const timer = setTimeout(() => {
        iniciarTimer();
    }, 4000);
}
