
const gameResult = JSON.parse(localStorage.getItem('gameResult'));
console.log(gameResult)

document.getElementById('random-move').textContent = gameResult.player;
document.getElementById('player-move').textContent = gameResult.player;
document.getElementById('opponent-move').textContent = gameResult.opponent;
document.getElementById('game-result').textContent = gameResult.result;

if(!gameResult.opponent) {
    document.getElementById('opponent-line').hidden = true;
    document.getElementById('result-line').hidden = true;
    document.getElementById('player-line').hidden = true;
} else {
    document.getElementById('random-line').hidden = true;
}