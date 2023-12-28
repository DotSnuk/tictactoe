export function gameController(a, b){
    const players = [a, b];
    let currentPlayer;
    const logPlayers = () => {
        return players;
    };

    const playMatch = (board) => {
        while (!board.checkCondition()){
            _changePlayer();
            let values = _getValues();
            while (!board.checkPosition(values[0], values[1], currentPlayer)){
                values = _getValues();
            };
            console.log(board.showBoard());
        };
        currentPlayer.increaseScore();
        console.log(currentPlayer.getScore());
    };

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

    return { logPlayers, playMatch, };
};