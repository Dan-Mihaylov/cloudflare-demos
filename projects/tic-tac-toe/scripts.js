let moves = 0;
let currentPlayer = 'x';
const buttonsMatrix = getButtons();
const playerElements = {
    'x': createXElement(),
    'o': createOElement()
}
const infoBoardEl = document.getElementById('info-board');
const navButtonsEl = document.querySelector('.navigation-buttons');

let winsX = 0;
let winsO = 0;
let gamesPlayed = 0;

const winnerBackground = 'rgb(214, 245, 214)';
const loserBackground = 'rgb(255, 204, 204)';
const defaultBackground = '#fff';

function createOElement() {
    const iElement = document.createElement('i');
    iElement.className = 'fa-regular fa-circle';
    iElement.setAttribute('data-player', 'o');
    return iElement;
}

function createXElement() {
    const iElement = document.createElement('i');
    iElement.className = 'fa-solid fa-x';
    iElement.setAttribute('data-player', 'x');
    return iElement;
}

function getButtons() {
    const buttonsArray = new Array();
    Array.from(document.querySelectorAll('.game-container div'))
    .forEach(row => {
        const currButtons = Array.from(row.children);
        buttonsArray.push(currButtons);
        attachEventListenerToButtons(currButtons); 
    });
    return buttonsArray;
}

function attachEventListenerToButtons(buttonsList) {
    buttonsList.map(button => button.addEventListener('click', playThere));
}

function playThere(event) {
    const button = event.currentTarget;
    const playerSymbol = playerElements[currentPlayer].cloneNode();

    if (button.children.length > 0) {
        return;
    }

    event.target.appendChild(playerSymbol);
    currentPlayer == 'x' ? currentPlayer = 'o' : currentPlayer = 'x';
    infoBoardEl.textContent == 'X Plays' ? infoBoardEl.textContent = `O Plays` : infoBoardEl.textContent = 'X Plays';
    moves += 1;

    if (moves >= 5) {
        checkForWinner(playerSymbol);
    }
}

function checkForWinner(playerSymbol) {
    
    const player = playerSymbol.getAttribute('data-player')

    const rowsWinner = checkRows(player);
    const colsWinner = checkCols(player);
    const diagonalsWinner = checkDiagonals(player);
    
    if (moves == 9 && (!rowsWinner && !colsWinner && !diagonalsWinner)) {
        lastMoveShowResetButton();
        countGame();
    }
    
}

function checkDiagonals(player) {
    const rightDiagonal = new Array();
    const leftDiagonal = new Array();

    for (let i = 0; i < 3; i++) {

        if (buttonsMatrix[i][i].children.length > 0 && buttonsMatrix[i][i].children[0].getAttribute('data-player') == player) {
            rightDiagonal.push(buttonsMatrix[i][i]);
        }

        if (rightDiagonal.length == 3) {
            win(player, rightDiagonal);
            return player
        }

        const row = i;
        const col = buttonsMatrix.length - 1 - i;

        if (buttonsMatrix[row][col].children.length > 0 && buttonsMatrix[row][col].children[0].getAttribute('data-player') == player) {
            leftDiagonal.push(buttonsMatrix[row][col]);
        }

        if (leftDiagonal.length == 3) {
            win(player, leftDiagonal);
            return player;
        }
    }
}

function checkCols(player) {
    for (let i = 0; i < 3; i++) {
        let pattern = new Array();
        let currPlayer = '';

        for (let j = 0; j < 3; j++) {
            let currButton = buttonsMatrix[j][i];

            if (j == 0 && currButton.children.length > 0) {
                currPlayer = currButton.children[0].getAttribute('data-player');
                pattern.push(currButton);
                continue;
            }

            if (currButton.children.length > 0 && currButton.children[0].getAttribute('data-player') == currPlayer) {
                pattern.push(currButton);
                continue;
            }

            break;
        }
        if (pattern.length == 3) {
            win(currPlayer, pattern);
            return player;
        }
    }
}

function checkRows(player) {
    let winner;

    buttonsMatrix.forEach(row => {
        const [colOne, colTwo, colThree] = row;
        if (colOne.children.length > 0 && colTwo.children.length >0 && colThree.children.length > 0) {
            const colOneData = colOne.children[0].getAttribute('data-player');
            const colTwoData = colTwo.children[0].getAttribute('data-player');
            const colThreeData = colThree.children[0].getAttribute('data-player');

            const result = new Set([colOneData, colTwoData, colThreeData]);

            if (result.size === 1) {
                win(colOneData, [colOne, colTwo, colThree]);
                console.log(colOneData, 'COL ONE DATA!');
                winner = player;
            }
        }
    });

    return winner;
}

function win(winner, buttonsArray) {
    displayWinner(winner);
    markWinningPattern(buttonsArray);
    adjustScores(winner);
    disableButtons();
    showStartAgain();
    countGame();
}

function displayWinner(winner) {
    const winningMessage = `The Winner Is ${winner.toUpperCase()}`;
    infoBoardEl.textContent = winningMessage;
}

function markWinningPattern(buttonsArray) {
    buttonsArray.map(button => button.style.backgroundColor = winnerBackground)
}

function adjustScores(winner) {
    const xWinsCountEl = document.getElementById('x-wins-count');
    const oWinsCountEl = document.getElementById('o-wins-count');

    winner == 'x' ? winsX += 1 : winsO += 1;

    xWinsCountEl.textContent = winsX;
    oWinsCountEl.textContent = winsO;

    colorizeScoreCards();
}

function colorizeScoreCards() {
    const xScoreEl = document.getElementById('x-name');
    const oScoreEl = document.getElementById('o-name');

    if (winsX > winsO) {
        xScoreEl.style.backgroundColor = winnerBackground;
        oScoreEl.style.backgroundColor = loserBackground;
        return;
    }

    if (winsO > winsX) {
        xScoreEl.style.backgroundColor = loserBackground;
        oScoreEl.style.backgroundColor = winnerBackground;
        return;
    }

    xScoreEl.style.backgroundColor = defaultBackground;
    oScoreEl.style.backgroundColor = defaultBackground;
}

function disableButtons() {
    buttonsMatrix.forEach(row => row.map(button => button.setAttribute('disabled', 'disabled')));
}

function showStartAgain() {
    
    const startAgainButton = document.createElement('button');

    startAgainButton.textContent = 'Play Again';
    startAgainButton.classList.add('button-start-again');
    startAgainButton.style.opacity = '0';
    startAgainButton.addEventListener('click', resetGame);
    
    navButtonsEl.append(startAgainButton);

    setTimeout(() => startAgainButton.style.opacity = '100', 10);
}

function resetGame() {
    buttonsMatrix.forEach(row => row.map(button => {
        const backgroundColor = '#fff';

        button.removeAttribute('disabled');
        button.innerHTML = '';
        button.style.backgroundColor = backgroundColor;

        infoBoardEl.textContent = `${currentPlayer.toUpperCase()} Plays`;
        moves = 0;
    }))

    navButtonsEl.innerHTML = '';
}

function lastMoveShowResetButton() {
    const resetGameButton = document.createElement('button');

    resetGameButton.textContent = 'Reset Table';
    resetGameButton.classList.add('button-start-again');
    resetGameButton.style.opacity = '0';
    resetGameButton.addEventListener('click', resetGame);
    
    navButtonsEl.append(resetGameButton);

    setTimeout(() => resetGameButton.style.opacity = '100', 10);
}

function countGame() {
    gamesPlayed += 1;

    const counterEl = document.getElementById('total-games-count');
    
    counterEl.style.opacity = '0';
    setTimeout(() => counterEl.textContent = gamesPlayed, 500);

    setTimeout(() => counterEl.style.opacity = '100', 500);
}

function displayButtonBack() {
    const buttonBackEl = document.querySelector('body > button');
    buttonBackEl.style.opacity = '100';

    buttonBackEl.addEventListener('click', () => history.back());
}

displayButtonBack();
