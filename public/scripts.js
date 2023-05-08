// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

const rps_rules_text = `Rules for Rock Paper Scissors:

  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock CRUSHES Scissors`

const rpsls_rules_text = `Rules for Rock Paper Scissors Lizard Spock:

  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock SMOOSHES Lizard
  - Lizard POISONS Spock
  - Spock SMASHES Scissors
  - Scissors DECAPITATES Lizard
  - Lizard EATS Paper
  - Paper DISPROVES Spock
  - Spock VAPORIZES Rock
  - Rock CRUSHES Scissors`

function helpRPS() {
    alert(rps_rules_text);
}

function helpRPSLS() {
    alert(rpsls_rules_text);
}

function rpsOpponent(shot) {
    const url = "/app/rps/play/" + shot
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpslsOpponent(shot) {
    const url = "/app/rpsls/play/" + shot
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpsNoOpponent() {
    const url = "/app/rps"
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function rpslsNoOpponent() {
    const url = "/app/rpsls"
    return response = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}

function getShot() {
    var gameSelection = document.getElementsByName("noOpponentGame");
    var game = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    if (isRPS) {
        rpsNoOpponent().then(shot => {
            document.getElementById("draw").value = shot.player;
        })
    } else {
        rpslsNoOpponent().then(shot => {
            document.getElementById("draw").value = shot.player;
        })
    }
}

function reset() {
    // Reset all selections and clear fields
    var gameSelection = document.getElementsByName("game");
    var drawSelection = document.getElementsByName("selectedShot");
    var noOpponentGameSelection = document.getElementsByName("noOpponentGame");

    for(var i=0; i<gameSelection.length; i++) {
        gameSelection[i].checked = false;
    }

    for (var i=0; i<drawSelection.length; i++) {
        drawSelection[i].checked = false;
    }

    for (var i=0; i<noOpponentGameSelection.length; i++) {
        noOpponentGameSelection[i].checked = false;
    }

    document.getElementById("draw").value = null;
    document.getElementById("gameResult").value = null;
    document.getElementById("playerShot").value = null;
    document.getElementById("computerShot").value = null;
    location.reload();
}

function play() {
    var gameSelection = document.getElementsByName("game");
    var drawSelection = document.getElementsByName("selectedShot");

    var game = null;
    var shot = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    for (var i = 0; i < drawSelection.length; i++) {
        if (drawSelection[i].checked) {
            shot = drawSelection[i].value;
            break;
        }
    }

    var result = null;
    var playerShot = null;
    var computerShot = null;
    if (isRPS) {
        rpsOpponent(shot).then(someVal => {
            result = someVal.result;
            playerShot = someVal.player;
            computerShot = someVal.opponent;
            document.getElementById("gameResult").value = result;
            document.getElementById("playerShot").value = playerShot;
            document.getElementById("computerShot").value = computerShot;
            setResultBackground(result);
        });
    } else {
        rpslsOpponent(shot).then(someVal => {
            result = someVal.result;
            playerShot = someVal.player;
            computerShot = someVal.opponent;
            document.getElementById("gameResult").value = result;
            document.getElementById("playerShot").value = playerShot;
            document.getElementById("computerShot").value = computerShot;
            setResultBackground(result);
        });
    }
}

function setResultBackground(result) {
    if (result == "win") {
        document.getElementById("gameResult").style.backgroundColor = "rgba(153, 255, 153, 0.5)";
    } else if (result == "lose") {
        document.getElementById("gameResult").style.backgroundColor = "rgba(255, 51, 0, 0.5)";
    } else if (result == "tie") {
        document.getElementById("gameResult").style.backgroundColor = "rgba(139, 207, 196, 0.5)";
    }
}

function setLS() {
    // Enable/Disable lizard and spock radios 
    var gameSelection = document.getElementsByName("game");
    var game = null;
    
    for (var i = 0; i < gameSelection.length; i++) {
    if (gameSelection[i].checked) {
        game = gameSelection[i].value;
        break;
        }
    }
    const isRPS = game=="RPS" ? true : false; 

    const lizardOption = document.getElementById("lizardOption");
    const spockOption = document.getElementById("spockOption");
    const rockOption = document.getElementById("rockOption");
    lizardOption.disabled = isRPS;
    spockOption.disabled = isRPS;
    if (lizardOption.disabled) {
        lizardOption.checked = false;
        spockOption.checked = false;
        rockOption.checked = true;
    }
}