import { createPlayer } from "/player.js";
import { gameController } from "./gameController.js";
import { displayController } from "/displayController.js";
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
gameBoard.newBoard();
const playerX = createPlayer('x');
const playerO = createPlayer('o');
const gameControl = gameController(playerX, playerO);
const display = displayController();
display.init();
// commented to not show prompt
// gameControl.playMatch(gameBoard);



