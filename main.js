const gameSummary = {
  numbers: 0,
  win: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: null,
  aiHand: null,
};

const hands = document.querySelectorAll(".select div");
const whoWin = document.querySelector('[data-summary="who-win"]');

// Wybór gracza
const handSelection = function () {
  game.playerHand = this.dataset.option;

  hands.forEach((hand) => {
    hand.style.borderColor = "";
    hand.style.color = "";
  });

  this.style.borderColor = "greenyellow";
  this.style.color = "greenyellow";
};

// Wybór AI
const aiChoice = function () {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
};

// Kto wygrał
const checkResult = function () {
  if (game.playerHand === game.aiHand) {
    return "Remis";
  } else if (
    (game.playerHand === "papier" && game.aiHand === "kamień") ||
    (game.playerHand === "kamień" && game.aiHand === "nożyce") ||
    (game.playerHand === "nożyce" && game.aiHand === "papier")
  ) {
    return "Wygrana";
  } else {
    return "Przegrana";
  }
};

// Wyświetlanie wyniku
const showResult = function (result) {
  document.querySelector('[data-summary="your-choice"]').textContent =
    game.playerHand;

  document.querySelector('[data-summary="ai-choice"]').textContent =
    game.aiHand;

  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "Wygrana") {
    document.querySelector("p.wins span").textContent = ++gameSummary.win;
    whoWin.textContent = "Wygrałeś";
    whoWin.style.color = "yellowgreen";
  } else if (result === "Przegrana") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    whoWin.textContent = "Przegrałeś";
    whoWin.style.color = "brown";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    whoWin.textContent = "Remis";
    whoWin.style.color = "blueviolet";
  }
};

// Czyszczenie po rundzie
const cleanRound = function () {
  document.querySelector(
    `[data-option='${game.playerHand}']`
  ).style.borderColor = "";
  document.querySelector(`[data-option='${game.playerHand}']`).style.color = "";

  game.playerHand = null;
  game.aiHand = null;
};

// Funkcja sterująca
const startGame = function () {
  if (!game.playerHand) return alert("Wybierz dłoń!!!");

  game.aiHand = aiChoice();
  const gameResult = checkResult();
  showResult(gameResult);
  cleanRound();
};

hands.forEach((hand) => hand.addEventListener("click", handSelection));
document.querySelector(".start").addEventListener("click", startGame);
