export function gameController(a, b){
    const players = [a, b];
    const logPlayers = () => {
        return players;
    };
    return {logPlayers};
};