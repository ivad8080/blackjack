let player = {
  name: 'fichas',
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
    return 11
  } else {
    return randomNumber;
  }
}

function getRandomCongrats() {
  let messages = [
    'AE! VOCÊ FEZ 21! 🥳',
    'ISSO! 21! 🤑',
    'CONSEGUIU! 21! 🤪'
  ];
  let randomMessages = messages[Math.floor(Math.random() * 3)];
  return randomMessages; 
}

function getRandomYouLose() {
  let messages = [
    'hihi! Perdeu! 😠',
    'kkk! Se Fudeu! 🤬',
    'haha! Tomou no xx! 🤡'
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
  cardsEl.textContent = 'Cartas: '
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]} `;
  }
  sumEl.textContent = 'Total: ' + sum;
  buttonsEl.innerHTML = '<button class="disabled">COMEÇAR JOGO</button>';
  buttonsEl.innerHTML += '<button onclick="newCard()">PEGAR CARTA</button>';
  if (sum <= 20) {
    message = 'Pegue uma carta! 🤔';
    isAlive = true;
    hasBlackJack = false;
    buttonsEl.innerHTML = '<button class="disabled">COMEÇAR JOGO</button>';
    buttonsEl.innerHTML += '<button onclick="newCard()">PEGAR CARTA</button>';
  } else if (sum === 21) {
    message = getRandomCongrats();
    isAlive = false;
    hasBlackJack = true;
    player.chips += 10;
    playerEl.textContent = player.name + ': $' + player.chips;
    buttonsEl.innerHTML = '<button onclick="startGame()">COMEÇAR JOGO</button>';
    buttonsEl.innerHTML += '<button class="disabled">PEGAR CARTA</button>';
  } else {
    message = getRandomYouLose();
    isAlive = false;
    hasBlackJack = false;
    player.chips -= 1;
    playerEl.textContent = player.name + ': $' + player.chips;
    buttonsEl.innerHTML = '<button onclick="startGame()">COMEÇAR JOGO</button>';
    buttonsEl.innerHTML += '<button class="disabled">PEGAR CARTA</button>';
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