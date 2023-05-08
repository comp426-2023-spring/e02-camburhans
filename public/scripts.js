import { rps, rpsls } from './rpsls.js';

// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for the game-type and opponent-type select elements
  document.getElementById('game-type').addEventListener('change', updateMoveOptions);
  document.getElementById('opponent-type').addEventListener('change', showMoveSelection);

  // Add event listener for the play button
  document.getElementById('play-button').addEventListener('click', playGame);
});

function showMoveSelection() {
    const gameType = document.getElementById('game-type').value;
    const opponentType = document.getElementById('opponent-type').value;
    const playButton = document.getElementById('play-button');

    if (gameType && opponentType) {
        playButton.disabled = false;
        if(opponentType == "with") {
            document.querySelector('.move-choice').style.display = 'block';
        }
    } else {
        document.querySelector('.move-choice').style.display = 'none';
        playButton.disabled = true;
    }
}

function updateMoveOptions() {
    const gameType = document.getElementById('game-type').value;
    const moveSelect = document.getElementById('player-move');
    let moveOptions = [];

    if (gameType === 'rps') {
        moveOptions = ['rock', 'paper', 'scissors'];
    } else if (gameType === 'rpsls') {
        moveOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    }

    moveSelect.innerHTML = '';
    for (const move of moveOptions) {
        const option = document.createElement('option');
        option.value = move;
        option.textContent = move.charAt(0).toUpperCase() + move.slice(1);
        moveSelect.appendChild(option);
    }

    // Call showMoveSelection() to update the Play button state
    showMoveSelection();
}

async function sendPlayCallWith(gameType, playerChoice) {
    try {
      const response = await fetch(`/app/play/${gameType}/${playerChoice}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
}

async function sendPlayCallWithout(gameType) {
  try {
    const response = await fetch(`/app/play/${gameType}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
  
async function playGame() {
    console.log("game played")
    const opponent = document.getElementById('opponent-type').value;
    const game = document.getElementById('game-type').value;
    let gameResult;
    if(opponent == "with") {
        const playerChoice = document.getElementById('player-move').value;
        gameResult = await sendPlayCallWith(game, playerChoice);
    } else {
        gameResult = await sendPlayCallWithout(game);
    }

    // Save gameResult and opponentType to localStorage
    localStorage.setItem('gameResult', JSON.stringify(gameResult));
  }