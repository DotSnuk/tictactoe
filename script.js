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
        
        if (_winCondition()){
            console.log('winC returns true');
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
                    console.log('victory!?');
                    return true;
                }
            }
        }
        
            // if (x[0] !== null){
            //     console.log(x[0]);
            //     if (x[0] === x[1] && x[0] === x[2]){
            //         console.log('victoryz!!??');
            //         return true;
            //     }
            // }

        
        
    };

    return { newBoard, showBoard, checkPosition, checkCondition, };
})();
gameBoard.newBoard();
const playerX = createPlayer('x');
const playerO = createPlayer('o');
const gameControl = gameController(playerX, playerO);
gameControl.playMatch(gameBoard);


