import { createPlayer } from "/player.js";
import { gameController } from "./gameController.js";
const gameBoard = (function (){
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
        return false;
    };
    return { newBoard, showBoard, checkPosition, checkCondition};
})();
gameBoard.newBoard();
const playerX = createPlayer('x');
const playerO = createPlayer('o');
const gameControl = gameController(playerX, playerO);
gameControl.playMatch(gameBoard);


