function createGameboard (){
    // checkPosition, setPosition
    // arrays for row and coloumn
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
                    }
                };
                if ((row.length - 1) === idx){
                    console.log('new row');
                    string+= '\n';
                }
            });
        });
        return string;
    }
    return {newBoard, showBoard};

}

const game = createGameboard();
game.newBoard();
console.log(game.showBoard());