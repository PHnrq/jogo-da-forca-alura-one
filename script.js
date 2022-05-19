let wordsForGame = [
    {nome: 'Cachorro', categoria: 'Animal'},
    {nome: 'Gato', categoria: 'Animal'},
    {nome: 'Cavalo', categoria: 'Animal'},
    {nome: 'Elefante', categoria: 'Animal'},
    {nome: 'Leao', categoria: 'Animal'},
    {nome: 'Macaco', categoria: 'Animal'},
    {nome: 'Pato', categoria: 'Animal'},
    {nome: 'Porco', categoria: 'Animal'},
    {nome: 'Rato', categoria: 'Animal'},
    {nome: 'Tigre', categoria: 'Animal'},
    {nome: 'Vaca', categoria: 'Animal'},
    {nome: 'Abacate', categoria: 'Fruta'},
    {nome: 'Abacaxi', categoria: 'Fruta'},
    {nome: 'Acai', categoria: 'Fruta'},
    {nome: 'Ameixa', categoria: 'Fruta'},
    {nome: 'Banana', categoria: 'Fruta'},
    {nome: 'Caju', categoria: 'Fruta'},
    {nome: 'Cereja', categoria: 'Fruta'},
    {nome: 'Coco', categoria: 'Fruta'},
    {nome: 'Damasco', categoria: 'Fruta'},
    {nome: 'Goiaba', categoria: 'Fruta'},
    {nome: 'Jaca', categoria: 'Fruta'},
    {nome: 'Jambo', categoria: 'Fruta'},
    {nome: 'Jujuba', categoria: 'Fruta'},
    {nome: 'Kiwi', categoria: 'Fruta'},
    {nome: 'Laranja', categoria: 'Fruta'},
    {nome: 'Limao', categoria: 'Fruta'},
    {nome: 'Lima', categoria: 'Fruta'},
    {nome: 'Manga', categoria: 'Fruta'},
    {nome: 'Maracuja', categoria: 'Fruta'},
    {nome: 'Melancia', categoria: 'Fruta'},
    {nome: 'Melao', categoria: 'Fruta'}]

const body = document.querySelector('body');
const input = document.querySelector('input');
const spanWrongLetters = document.querySelector('#wrongLetters');
const spanDica = document.querySelector('#dica');
const inputNewWord = document.querySelector('#newWord');
const inputCategory = document.querySelector('#category');
const winnerModal = document.querySelector('#winnerModal');
const looseModal = document.querySelector('#looseModal');
const looserMsg = document.querySelector('#looserMsg');
const score = document.querySelector('#score');

let wordDrawn = '';
let letterTry = [];
let wrongLetters = [];
let rightLetters = 0;
let erros = 0;
let currentLetters = '';
let updateScore = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#0A3871';
ctx.strokeStyle = '#0A3871';
ctx.lineWidth = 4;
ctx.font =  "24px Inter";



function addWord() {
    const newWordObject = {nome: inputNewWord.value, categoria: inputCategory.value};
    console.log(newWordObject);
    wordsForGame.push(newWordObject);
    
    window.location.replace("./game.html");
}

function setRandomWord(){
    const randomObject = wordsForGame[Math.floor(Math.random() * wordsForGame.length)];
    const randomWord = randomObject.nome;
    const randomCategory = randomObject.categoria;
    spanDica.innerHTML = `${randomCategory}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordDrawn = randomWord.toUpperCase();
    categoryDrawn = randomCategory.toUpperCase();
    winnerModal.classList.add('hidden');
    looseModal.classList.add('hidden');
    erros = 0;
    letterTry = [];
    wrongLetters = [];
    currentLetters = null;
    rightLetters = 0;
    spanWrongLetters.innerHTML = '';

    desenhaTraços();
    
}

function drawGibbet(){
    switch(erros){
        case 1:
            dranwGibbet()
            break;

        case 2:
            drawHead();
            break;
        
        case 3:
            drawBody();
            break;
        
        case 4:
            drawLeftArm();
            break;
        
        case 5:
            drawRightArm();
            break;
        
        case 6:
            drawLeftLeg();
            break;
        
        case 7:
            drawRightLeg();
            break;

        default:
            break;
    }
}

function dranwGibbet(){
    ctx.fillRect(0, 300, canvas.width, 5); // Primeira barra
    ctx.fillRect(80, 50, 5, 250);  // segunda barra
    ctx.fillRect(80, 50, 173, 5); // terceira barra
    ctx.fillRect(253, 50, 5, 48) // quarta barra
}

function drawHead(){
    ctx.beginPath();
    ctx.arc(255, 127, 30, 0, 2 * Math.PI); // Cabeça
    ctx.stroke();
}

function drawBody(){
    ctx.fillRect(252, 155, 4, 90); //Corpo
}

function drawLeftArm(){
    ctx.beginPath(); //Braço esquerdo
    ctx.moveTo(250, 157);
    ctx.lineTo(230, 200);
    ctx.stroke();
}

function drawRightArm(){
    ctx.beginPath(); //Braço direito
    ctx.moveTo(258, 157);
    ctx.lineTo(280, 200);
    ctx.stroke();
}

function drawLeftLeg(){
    ctx.beginPath(); //Perna esquerdo
    ctx.moveTo(254, 242);
    ctx.lineTo(230, 285);
    ctx.stroke();
}

function drawRightLeg(){
    ctx.beginPath(); //Perna direito
    ctx.moveTo(254, 242);
    ctx.lineTo(280, 285);
    ctx.stroke();
}

input.addEventListener('input', function(e){

    let arr = e.target.value.split('');
    let lastLetter = arr[arr.length - 1];

    if(letterTry.find(letter => letter == lastLetter)){
        return;
    }else{
        letterTry.push(lastLetter);
        currentLetters = lastLetter.toUpperCase();
        checkWrongLetters();
        desenhaTraços();
    }

    spanWrongLetters.innerHTML = wrongLetters.join('');
})


body.addEventListener('click', function(e){
    input.focus();
})

function desenhaTraços(){
  input.focus();
  score.innerHTML = `Pontuação: ${updateScore}`;   
  

  let linhaInicial = (canvas.width - (35 * wordDrawn.length)+30) / 2;

  for(let i = 0; i < wordDrawn.length; i++){
    ctx.fillRect(linhaInicial,370 , 24, 4); //Traços

    if(currentLetters == wordDrawn[i]){
        ctx.fillText(wordDrawn[i], linhaInicial, 360);
        rightLetters++;
    }
    linhaInicial += (24 + 8);
  }

  if(rightLetters == wordDrawn.length){
    setTimeout(function(){
        updateScore += 10
        score.innerHTML = `Pontuação: ${updateScore}`;
        winnerModal.classList.remove('hidden');
    }, 50)
  }
}

function checkWrongLetters(){
  if(wordDrawn.indexOf(currentLetters) == -1){
    wrongLetters.push(currentLetters);
    erros++;
    drawGibbet();
  }

  if(erros === 7){
    setTimeout(function(){
      updateScore = 0
      looserMsg.innerHTML = `Você errou, a palavra era: <strong>${wordDrawn}</strong>`;
      looseModal.classList.remove('hidden');
    }, 50)
  }
}