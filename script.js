import { createPlayer } from "./player.js";
const game = (function createGameboard (){
    let position = [];
    const newBoard = () => {
        for (let x = 0; x < 3; x++){
            let row = [];
            for (let y = 0; y < 3; y++){
                row.push(null);
            };
            position.push(row);
        };
    };
    const showBoard = () => {
        let string = '';
        position.forEach((row) => {
            row.forEach((pos, idx) => {
                if (pos === null){
                    string+= '#';
                    if ((row.length - 1) !== idx){
                        string+= ' ';
                    } else {
                        string+= '\n';
                    };
                };
            });
        });
        return string;
    };
    const checkPosition = (a, b, player) => {
        if (position[a][b] === null){
            _setPosition(a, b, player);
        }
        return position[a][b];
    };
    const _setPosition = (a, b, player) => {
        position[a][b] = player.getMarker();
    };
    return { newBoard, showBoard, checkPosition, };
})();
game.newBoard();
console.log(game.showBoard());
const playerX = createPlayer('x');
const playerO = createPlayer('o');
console.log(playerX.getMarker());
