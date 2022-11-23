let player = {
  name: 'chips',
  chips: 30,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let cardsEl = document.getElementById('cards-el');
let buttonsEl = document.querySelector('.buttons');
let playerEl = document.getElementById('player-el');

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    let getRandom = Math.floor(Math.random() * 2);
    let getAceNumber = 0;
    if (getRandom === 0) {
      getAceNumber = 1;
    } else {
      getAceNumber = 11;
    }
    return getAceNumber;
  } else {
    return randomNumber;
  }
}

let randomAce = Math.floor(Math.random() * 2);

function getRandomCongrats() {
  let messages = [
    'YOU DID IT!',
    'YES! BLACKJACK!',
    'YOU WON!'
  ];
  let randomMessages = messages[Math.floor(Math.random() * 3)];
  return randomMessages; 
}

function getRandomYouLose() {
  let messages = [
    'YOU LOSE!',
    'DAMN IT!',
    'TRY AGAIN!'
  ];
  let randomMessages = messages[Math.floor(Math.random() * 3)];
  return randomMessages;
}

function startGame() {
  firstCard = getRandomCard();
  cards = [firstCard];
  sum = firstCard;
  hasBlackJack = false;
  isAlive = true;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = 'Cards: '
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]} `;
  }
  sumEl.textContent = 'Total: ' + sum;
  buttonsEl.innerHTML = '<button class="disabled">START GAME</button>';
  buttonsEl.innerHTML += '<button onclick="newCard()">GET CARD</button>';
  if (sum <= 20) {
    message = 'GET CARD!';
    isAlive = true;
    hasBlackJack = false;
    buttonsEl.innerHTML = '<button class="disabled">START GAME</button>';
    buttonsEl.innerHTML += '<button onclick="newCard()">GET CARD</button>';
  } else if (sum === 21) {
    message = getRandomCongrats();
    isAlive = false;
    hasBlackJack = true;
    player.chips += 10;
    playerEl.textContent = player.name + ': $' + player.chips;
    buttonsEl.innerHTML = '<button onclick="startGame()">START GAME</button>';
    buttonsEl.innerHTML += '<button class="disabled">GET CARD</button>';
  } else {
    message = getRandomYouLose();
    isAlive = false;
    hasBlackJack = false;
    player.chips -= 1;
    playerEl.textContent = player.name + ': $' + player.chips;
    buttonsEl.innerHTML = '<button onclick="startGame()">START GAME</button>';
    buttonsEl.innerHTML += '<button class="disabled">GET CARD</button>';
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}