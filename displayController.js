const gameId = document.querySelector('#game');
export function init(){
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            const square = document.createElement('div');
            square.dataset.row = x;
            square.dataset.col = y;
            square.classList.add('square');
            gameId.appendChild(square);

        }
        
    }
};