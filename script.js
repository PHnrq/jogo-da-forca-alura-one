//Lista da palavras
let gameWords = [
  { name: "Cachorro", category: "Animal" },
  { name: "Gato", category: "Animal" },
  { name: "Cavalo", category: "Animal" },
  { name: "Elefante", category: "Animal" },
  { name: "Leao", category: "Animal" },
  { name: "Macaco", category: "Animal" },
  { name: "Pato", category: "Animal" },
  { name: "Porco", category: "Animal" },
  { name: "Rato", category: "Animal" },
  { name: "Tigre", category: "Animal" },
  { name: "Vaca", category: "Animal" },
  { name: "Abacate", category: "Fruta" },
  { name: "Abacaxi", category: "Fruta" },
  { name: "Acai", category: "Fruta" },
  { name: "Ameixa", category: "Fruta" },
  { name: "Banana", category: "Fruta" },
  { name: "Caju", category: "Fruta" },
  { name: "Cereja", category: "Fruta" },
  { name: "Coco", category: "Fruta" },
  { name: "Damasco", category: "Fruta" },
  { name: "Goiaba", category: "Fruta" },
  { name: "Jaca", category: "Fruta" },
  { name: "Jambo", category: "Fruta" },
  { name: "Kiwi", category: "Fruta" },
  { name: "Laranja", category: "Fruta" },
  { name: "Limao", category: "Fruta" },
  { name: "Lima", category: "Fruta" },
  { name: "Manga", category: "Fruta" },
  { name: "Maracuja", category: "Fruta" },
  { name: "Melancia", category: "Fruta" },
  { name: "Melao", category: "Fruta" },
];

//elementos do game.html
const body = document.querySelector("body");
const input = document.querySelector("input");
const spanWrongLetters = document.querySelector("#wrongLetters");
const spanTip = document.querySelector("#tip");
const winnerModal = document.querySelector("#winnerModal");
const looseModal = document.querySelector("#looseModal");
const looserMsg = document.querySelector("#looserMsg");
const score = document.querySelector("#score");
//elementos do new-word.html
const validateForm = document.querySelector("#validateForm");
const inputNewWord = document.querySelector("#newWord");
const inputCategory = document.querySelector("#category");

//Variaveis globais
let wordDrawn = "";
let currentLetters = "";
let rightLetters = 0;
let updateScore = 0;
let erros = 0;
let attemptsLetters = [];
let wrongLetters = [];
let newWord = { name: "", category: ""};

//Configurações do canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#0A3871";
ctx.strokeStyle = "#0A3871";
ctx.lineWidth = 4;
ctx.font = "24px Inter";

function addWord() {
  newWord.name = inputNewWord.value;
  newWord.category = inputCategory.value;

  if (newWord.name.length < 1 || newWord.category.length < 1){
    validateForm.innerHTML = "Preencha todos os campos!";
  }else if(gameWords.some((word) => word.name === newWord.name)){
    validateForm.innerHTML = "Palavra já cadastrada!";
  }else{
    gameWords.push(newWord);
    window.location.replace("./game.html"); //Direciona para o game.html
  }
}

function drawLinesAndWords() {
  input.focus();
  score.innerHTML = `Pontuação: ${updateScore}`; //Mostra a pontuação na tela

  let initialPosition = (canvas.width - 35 * wordDrawn.length + 30) / 2;

  for (let i = 0; i < wordDrawn.length; i++) {
    ctx.fillRect(initialPosition, 370, 24, 4);

    if (currentLetters == wordDrawn[i]) {
      ctx.fillText(wordDrawn[i], initialPosition, 360);
      rightLetters++;
    }
    initialPosition += 24 + 8;
  }

  isLetterRight();
  isLetterWrong();
}

function isLetterRight() {
  if (rightLetters == wordDrawn.length) {
    setTimeout(function () {
      updateScore += 10;
      score.innerHTML = `Pontuação: ${updateScore}`;
      winnerModal.classList.remove("hidden");
    }, 50);
  }
}

function isLetterWrong() {
  if (wordDrawn.indexOf(currentLetters) == -1) {
    wrongLetters.push(currentLetters);
    erros++;
    drawGibbet();
  }

  if (erros === 7) {
    setTimeout(function () {
      updateScore = 0;
      looserMsg.innerHTML = `Você errou, a palavra era: <strong>${wordDrawn}</strong>`;
      looseModal.classList.remove("hidden");
    }, 50);
  }
}

function setRandomWord() {
  const randomObject = gameWords[Math.floor(Math.random() * gameWords.length)]; //Pega um objeto aleatorio da lista
  const randomWord = randomObject.name; //Pega a palavra do objeto
  const randomCategory = randomObject.category; //Pega a categoria do objeto
  spanTip.innerHTML = `${randomCategory}`; //Mostra a categoria na tela

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpa o Canvas
  wordDrawn = randomWord.toUpperCase(); //Pega a palavra e transforma em maiuscula
  categoryDrawn = randomCategory.toUpperCase(); //Pega a categoria e transforma em maiuscula
  winnerModal.classList.add("hidden"); //Esconde o modal de vitória
  looseModal.classList.add("hidden"); //Esconde o modal de derrota
  erros = 0; //Zera o contador de erros
  attemptsLetters = []; //Zera a lista de letras que já foram tentadas
  wrongLetters = []; //Zera a lista de letras erradas
  currentLetters = ""; //zera a letra atual
  rightLetters = 0; //Zera o contador de letras certas
  spanWrongLetters.innerHTML = ""; //Limpa da tela a lista de letras erradas

  drawLinesAndWords();
}

function drawGibbet() {
  switch (erros) {
    case 1: //Desenha a forca
      ctx.fillRect(0, 300, canvas.width, 5); // Primeira btypedLettersa
      ctx.fillRect(80, 50, 5, 250); // segunda btypedLettersa
      ctx.fillRect(80, 50, 173, 5); // terceira btypedLettersa
      ctx.fillRect(253, 50, 5, 48); // quarta btypedLettersa
      break;

    case 2: //Desenha a cabeça
      ctx.beginPath();
      ctx.arc(255, 127, 30, 0, 2 * Math.PI);
      ctx.stroke();
      break;

    case 3: //Desenha o corpo
      ctx.fillRect(252, 155, 4, 90);
      break;

    case 4: //Desenha braço esquerdo
      ctx.beginPath();
      ctx.moveTo(250, 157);
      ctx.lineTo(230, 200);
      ctx.stroke();
      break;

    case 5: //Desenha braço direito
      ctx.beginPath();
      ctx.moveTo(258, 157);
      ctx.lineTo(280, 200);
      ctx.stroke();
      break;

    case 6: //Desenha perna esquerda
      ctx.beginPath();
      ctx.moveTo(254, 242);
      ctx.lineTo(230, 285);
      ctx.stroke();
      break;

    case 7: //Desenhada perna direita
      ctx.beginPath();
      ctx.moveTo(254, 242);
      ctx.lineTo(280, 285);
      ctx.stroke();
      break;

    default:
      break;
  }
}

body.addEventListener("click", function (e) {
  input.focus(); //Foca o input ao clicar no body, facilitando o uso do teclado mobile
});

input.addEventListener("input", function (e) {
  let typedLetters = e.target.value.split(""); //Retorna um array com as letras digitadas
  let lastLetter = typedLetters[typedLetters.length - 1]; //Pega a ultima letra digitada

  if (attemptsLetters.find((letter) => letter === lastLetter)) {
    return; //Se a letra já foi tentada, não faz nada
  } else {
    //Se a letra não foi tentada, adiciona na lista de tentativas
    attemptsLetters.push(lastLetter); //Adiciona a letra na lista de tentativas
    currentLetters = lastLetter.toUpperCase(); //Transforma a letra atual em maiuscula
    drawLinesAndWords();
  }

  spanWrongLetters.innerHTML = wrongLetters.join(""); //Mostra as letras erradas na tela
});
