const gameId = document.querySelector('#game');
import { game } from "/game.js";
const gam = game();
export function display(){
    const init = () => {
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                const square = document.createElement('div');
                square.dataset.row = x;
                square.dataset.col = y;
                square.classList.add('square');
                gameId.appendChild(square);
                square.addEventListener('click', (event) => {
                    sqClick(event.target);
                });
            };
        };
    };

    const sqClick = (target) => {
            const row = target.getAttribute('data-row');
            const col = target.getAttribute('data-col');
            console.log(`Row : ${row} Coloum: ${col}`);
            gam.playRound([row, col]);
        };

    return { init, sqClick, };
}
// notes to self
// make name bold to show who's turn it is
// sqClick should call checkPosition
