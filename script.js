const gameBoard = (function gameBoard(){
    let position = [];

    const newBoard = () => {
        position = [];
        for (let x = 0; x < 3; x++){
            let row = [];
            for (let y = 0; y < 3; y++){
                row.push(null);
            };
            position.push(row);
        };
    };

    const showBoard = () => {
        // only for console purpose
        let string = '';
        position.forEach((row) => {
            row.forEach((pos, idx) => {
                if (pos === null){
                    string+= '#';
                } else {
                    string+= pos;
                };
                if ((row.length - 1) !== idx){
                    string+= ' ';
                } else {
                    string+= '\n';
                };
            });
        });
        return string;
    };

    const checkPosition = (a, b, player) => {
        if (position[a][b] === null){
            _setPosition(a, b, player);
            return true;
        } else {
            return false;
        };
    };

    const _setPosition = (a, b, player) => {
        position[a][b] = player.getMarker();
    };

    const checkCondition = () => {
        if (_winCondition()){
            return true;
        } else {
            console.log('winC returns false');
            return false;
        };        
    };

    const _winCondition = () => {
        // horizontal check
        for (const row of position){
            if (row[0] !== null){
                if (row[0] === row[1] && row[0] === row[2]){
                    console.log('horizontal victory!?');
                    return true;
                };
            };
        };

        // vertical check
        // pushes the value of the same index to a array for comparison
        for (let x = 0; x < position.length; x++){
            let compare = [];
            for (const arr of position){
                compare.push(arr[x]);
            };
            if (compare[0] !== null){
                if (compare[0] === compare[1] && compare[0] === compare[2]){
                    console.log('vertical victory :D');
                    return true;
                };
            };
        };

        // diagonal check
        // loops twice, and uses a iife to increase or decrease the index.
        // the second loop it sets the starting index to 2
        for (let i = 0; i < 2; i++){
            let compare = [];
            let indx = 0;
            if (i === 1){
                indx = 2;
            };
            const adjIndx = (function (){
                return function() {
                    if (i === 0){
                        indx++;
                    } else {
                        indx--;
                    }
                }
            })();
            for (const arr of position){
                compare.push(arr[indx]);
                adjIndx();
                
            };
            if (compare[0] !== null){
                if (compare[0] === compare[1] && compare[0] === compare[2]){
                    console.log('diagonal victory :OOOO');
                    return true;
                };
            };
        };
        
    }; 

    return { newBoard, showBoard, checkPosition, checkCondition, };
})();

function player(i, name=''){
    const id = i;
    let playName;
    let marker;
    if (name != ''){
        playName = name;
    } else {
        playName = `Player ${id+1}`
    }

    let score = 0;
    const _setMarker = () => {
        switch(id){
            case 0:
                marker = 'x';
                break;
            case 1:
                marker = 'o';
                break;
        };
    }
    _setMarker();

    const increaseScore = () => {
        score++;
    };

    const getScore = () => {
        return score;
    };

    const getId = () => {
        return id;
    }

    const getName = () => {
        return playName;
    }

    const getMarker = () => {
        return marker;
    };

    return { increaseScore, getScore, getMarker, getId, getName };
};

const display = (function display(){
    const gameId = document.querySelector('#game');
    const resetButton = document.getElementById('reset');
    const newGameButton = document.getElementById('newGame');

    const listener = event => {
        _sqClick(event.target);
    };

    const render = () => {
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                const square = document.createElement('div');
                square.dataset.row = x;
                square.dataset.col = y;
                square.classList.add('square');
                gameId.appendChild(square);
                square.addEventListener('click', listener);
            };
        };
    };
    render();
    const _removeSquares = () => {
        const squareDiv = document.querySelectorAll('.square');
        squareDiv.forEach(square => {
            gameId.removeChild(square);
        });
    };
    const setName = () => {
        let index = 0;
        for (const player of gameLogic.getPlayers()){
            const selectName = document.querySelector(".play" + index + ".name");
            const markerHint = ' (' + player.getMarker().toUpperCase() + ')';
            selectName.innerText = player.getName() + markerHint;
            index++;
        }
    }
    const reset = () => {
        console.log('resetting')
        gameBoard.newBoard();
        _removeSquares();
        render();
    }
    resetButton.addEventListener('click', reset);

    const newGame = () => {
        gameLogic.changePlayers();
        setName();
        updateScore();
        reset();
        boldCurrentPlayer();
    }
    newGameButton.addEventListener('click', newGame);
    
    const updateScore = () => {
        let index = 0;
        for (const player of gameLogic.getPlayers()){
            const selectScore = document.querySelector(".play" + index + '.score');
            selectScore.innerText = player.getScore();
            index++;
        };
    };

    const boldCurrentPlayer = () => {
        const playerNames = document.querySelectorAll('.name');
        const indexCurrPlayer = gameLogic.getCurrentPlayer().getId();
        const indexLastPlayer = 1 - indexCurrPlayer;
        playerNames[indexCurrPlayer].classList.add('bold');
        playerNames[indexLastPlayer].classList.remove('bold');
    }

    const removeListeners = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.removeEventListener('click', listener);
        });
    }

    const _sqClick = (target) => {
            const row = target.getAttribute('data-row');
            const col = target.getAttribute('data-col');
            console.log(`Row : ${row} Coloum: ${col}`);
            target.innerText = gameLogic.getCurrentPlayer().getMarker().toUpperCase();
            target.removeEventListener('click', listener);
            gameLogic.playRound([row, col]);
        };
        return { updateScore, render, reset, setName, removeListeners, boldCurrentPlayer, }
})();

const gameLogic = (function game(){
    let players = []
    let currentPlayer;
    let moves = 0;
    let victory = false;
    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const createInitPlayers = () => {
        for (let i = 0; i < 2; i++){
            const playr = player(i);
            players.push(playr);
        }
        currentPlayer = players[0];
        display.boldCurrentPlayer();
    }

    const changePlayers = () => {
        players = []
        for (let i = 0; i < 2; i++){
            const name = prompt(`Enter Player ${i} name`)
            const playr = player(i, name);
            players.push(playr);
        }
        currentPlayer = players[0]
    }

    const playRound = (val) => {
            if (gameBoard.checkPosition(val[0], val[1], currentPlayer)){
                if (gameBoard.checkCondition()){
                    currentPlayer.increaseScore();
                    display.updateScore();
                    display.removeListeners();
                }
                moves++;
                _changeCurrentPlayer();
                // make a call to display to bold that playername
            };
    };

    const _changeCurrentPlayer = () => {
        if (currentPlayer === players[0]){
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        };
        display.boldCurrentPlayer();
    };

    const getPlayers = () => {
        return players;
    }

    const _getValues = () => {
        console.log(currentPlayer.getMarker() + '\n');
        const row = prompt('What row?: ');
        const col = prompt('What coloumn?: ');
        return [row, col];
    };

    return { getCurrentPlayer, playRound, createInitPlayers, changePlayers, getPlayers, };
})();

gameBoard.newBoard();
gameLogic.createInitPlayers();
// const playerNames = document.querySelectorAll('.name');
// playerNames[0].innerText = 'hello';
// playerNames[0].classList.add('bold')