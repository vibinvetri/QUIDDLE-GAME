const wordList = ["apple", "grape", "plane", "earth", "trend", "chair", "brave", "stone"];
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let maxAttempts = 6;
let currentAttempt = 0;

const grid = document.getElementById("grid");
const input = document.getElementById("guessInput");
const message = document.getElementById("message");

// Setup grid
for (let i = 0; i < maxAttempts * 5; i++) {
  const box = document.createElement("div");
  box.classList.add("box");
  grid.appendChild(box);
}

function submitGuess() {
  const guess = input.value.toLowerCase();

  if (guess.length !== 5) {
    alert("Enter a 5-letter word.");
    return;
  }

  if (currentAttempt >= maxAttempts) {
    return;
  }

  const rowOffset = currentAttempt * 5;
  const guessArray = guess.split("");
  const targetArray = targetWord.split("");

  for (let i = 0; i < 5; i++) {
    const box = grid.children[rowOffset + i];
    box.textContent = guessArray[i];

    if (guessArray[i] === targetArray[i]) {
      box.classList.add("correct");
    } else if (targetArray.includes(guessArray[i])) {
      box.classList.add("present");
    } else {
      box.classList.add("absent");
    }
  }

  currentAttempt++;
  input.value = "";

  if (guess === targetWord) {
    message.textContent = "🎉 You guessed it right!";
    input.disabled = true;
  } else if (currentAttempt === maxAttempts) {
    message.textContent = `❌ Game Over! The word was "${targetWord.toUpperCase()}".`;
    input.disabled = true;
  }
}

function resetGame() {
  targetWord = wordList[Math.floor(Math.random() * wordList.length)];
  currentAttempt = 0;
  input.disabled = false;
  input.value = "";
  message.textContent = "";

  for (let box of grid.children) {
    box.textContent = "";
    box.className = "box";
  }
}
