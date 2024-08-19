let moves = 0;
let currentPlayer = 'x';
const buttonsMatrix = getButtons();
const playerElements = {
    'x': createXElement(),
    'o': createOElement()
}
const infoBoardEl = document.getElementById('info-board');

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
    checkRows();
    checkCols();
    checkDiagonals(playerSymbol.getAttribute('data-player'));
}

function checkDiagonals(player) {
    const rightDiagonal = new Array();
    const leftDiagonal = new Array();

    for (let i = 0; i < 3; i++) {

        if (buttonsMatrix[i][i].children.length > 0 && buttonsMatrix[i][i].children[0].getAttribute('data-player') == player) {
            rightDiagonal.push(buttonsMatrix[i][i]);
        }

        if (rightDiagonal.length == 3) {
            win(player, rightDiagonal)
        }

        const row = i;
        const col = buttonsMatrix.length - 1 - i;

        if (buttonsMatrix[row][col].children.length > 0 && buttonsMatrix[row][col].children[0].getAttribute('data-player') == player) {
            leftDiagonal.push(buttonsMatrix[row][col]);
        }

        if (leftDiagonal.length == 3) {
            win(player, leftDiagonal);
        }
    }
}

function checkCols() {
    for (let i = 0; i < 3; i++) {
        let pattern = new Array();
        let currPlayer = '';

        for (let j = 0; j < 3; j++) {
            let currButton = buttonsMatrix[j][i];
            console.log(currButton);
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
        }
    }
}

function checkRows() {
    buttonsMatrix.forEach(row => {
        const [colOne, colTwo, colThree] = row;
        if (colOne.children.length > 0 && colTwo.children.length >0 && colThree.children.length > 0) {
            const colOneData = colOne.children[0].getAttribute('data-player');
            const colTwoData = colTwo.children[0].getAttribute('data-player');
            const colThreeData = colThree.children[0].getAttribute('data-player');

            const result = new Set([colOneData, colTwoData, colThreeData]);
            console.log(result);
            if (result.size === 1) {
                win(colOneData, [colOne, colTwo, colThree]);

            }
        }
    })
}

function win(winner, buttonsArray) {
    displayWinner(winner);
    markWinningPattern(buttonsArray);
    adjustScores(winner);
    disableButtons();
    showStartAgain();
}

function displayWinner(winner) {
    const winningMessage = `The Winner Is ${winner}`;
    infoBoardEl.textContent = winningMessage;
}

function markWinningPattern(buttonsArray) {
    buttonsArray.map(button => button.style.backgroundColor = 'rgb(142, 202, 230)')
}

function adjustScores(winner) {
    const winnerCountEl = winner == 'x' ? document.getElementById('x-wins-count') : document.getElementById('o-wins-count');
    console.log(winnerCountEl, 'winner element');
}

function disableButtons() {
    buttonsMatrix.forEach(row => row.map(button => button.setAttribute('disabled', 'disabled')));
}

function showStartAgain() {
    const startAgainButton = document.querySelector('.button-start-again');
    startAgainButton.style.opacity = '100';
}

function resetGame() {
    console.log('resetting game')
}
