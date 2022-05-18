//Canvas config
const body = document.querySelector('body');
const input = document.querySelector('input');
const canvas = document.getElementById('canvas');
const spanWrongLetters = document.querySelector('#wrongLetters');

const ctx = canvas.getContext('2d');
ctx.fillStyle = '#0A3871';
ctx.strokeStyle = '#0A3871';
ctx.lineWidth = 4;
ctx.font =  "24px Inter";

const wordsForGame = ['Cachorro', 'Gato', 'Cavalo', 'Leao', 'Macaco', 'Zebra']
let wordDrawn;
let letterTry = [];
let wrongLetters = [];
let rightLetters = 0;
let erros = 0;
let currentLetters;

function setRandomWord(){
    const randomWord = wordsForGame[Math.floor(Math.random() * wordsForGame.length)];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordDrawn = randomWord.toUpperCase();
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
        case 0: break;
        case 1:
            drawFirsLine()
            break;

        case 2:
            drawSecondLine()
            break;
        
        case 3:
            drawThirdLine()
            break;
        
        case 4:
            drawFourthLine()
            break;
        
        case 5:
            drawHead()
            break;
        
        case 6:
            drawLeftArm()
            break;
        
        case 7:
            drawRightArm()
            break;
        
        case 8:
            drawBody()
            break;

        case 9:
            drawLeftLeg()
            break;

        case 10:
            drawRightLeg()
            break;
    }
}

function drawFirsLine(){
    ctx.fillRect(30, 300, 290, 5); // Primeira barra
}

function drawSecondLine(){
    ctx.fillRect(80, 0, 5, 300);  // segunda barra
}

function drawThirdLine(){
    ctx.fillRect(80, 0, 173, 5); // terceira barra
}

function drawFourthLine(){
    ctx.fillRect(253, 0, 5, 48) // quarta barra
}

function drawHead(){
    ctx.beginPath();
    ctx.arc(255, 77, 30, 0, 2 * Math.PI); // Cabeça
    ctx.stroke();
}

function drawLeftArm(){
    ctx.beginPath(); //Braço esquerdo
    ctx.moveTo(250, 107);
    ctx.lineTo(230, 150);
    ctx.stroke();
}

function drawRightArm(){
    ctx.beginPath(); //Braço direito
    ctx.moveTo(258, 107);
    ctx.lineTo(280, 150);
    ctx.stroke();
}

function drawBody(){
    ctx.fillRect(252, 105, 4, 90); //Corpo
}

function drawLeftLeg(){
    ctx.beginPath(); //Perna esquerdo
    ctx.moveTo(254, 192);
    ctx.lineTo(230, 235);
    ctx.stroke();
}

function drawRightLeg(){
    ctx.beginPath(); //Perna direito
    ctx.moveTo(254, 192);
    ctx.lineTo(280, 235);
    ctx.stroke();
}

body.addEventListener('keydown', function(e){
    if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 8){
        const key = e.key.toUpperCase();

        if (letterTry.find(letter => letter == key)){
            return;
        } else {
            letterTry.push(key);
            currentLetters = key.toUpperCase();
            desenhaTraços()
            checkWrongLetters();
        }
    }

   // ctx.fillText(wrongLetters.join(''),(canvas.width - (34 * wordDrawn.length)+30) / 2 , 410);
   spanWrongLetters.innerHTML = wrongLetters.join('');
})

function desenhaTraços(){
  input.focus();  

  let linhaInicial = (canvas.width - (34 * wordDrawn.length)+30) / 2;
    
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
        alert('Você venceu!')
        setRandomWord();
    }, 50)
  }
}

function checkWrongLetters(){
  if(wordDrawn.indexOf(currentLetters) == -1){
    wrongLetters.push(currentLetters);
    erros++;
    drawGibbet();
  }

  if(erros == 10){
    setTimeout(function(){
      alert('Você perdeu!')
      setRandomWord();
    }, 50)
  }
}