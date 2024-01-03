export function gameController(a, b){
    const players = [a, b];
    let currentPlayer;
    const logPlayers = () => {
        return players;
    };

    const playMatch = (board) => {
        while (!board.checkCondition()){
            _changePlayer();
            let values = sqClick();
            while (!board.checkPosition(values[0], values[1], currentPlayer)){
                values = _getValues();
            };
            console.log(board.showBoard());
        };
        currentPlayer.increaseScore();
        console.log(currentPlayer.getScore());
    };

    // change to playRound
    const playRound = (val) => {
        if (board.checkPosition(val[0], val[1], currentPlayer)){
            if (board.checkCondition()){
                currentPlayer.increaseScore();
            }
            _changePlayer();
        }
    }
    

    const _changePlayer = () => {
        if (currentPlayer === players[0]){
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        };
    };

    const _getValues = () => {
        console.log(currentPlayer.getMarker() + '\n');
        const row = prompt('What row?: ');
        const col = prompt('What coloumn?: ');
        return [row, col];
    };

    return { logPlayers, playMatch, playRound, };
};