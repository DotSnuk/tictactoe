export function createPlayer(mark){
    const marker = mark;
    let score = 0;

    const increaseScore = () => {
        score++;
    }

    const getScore = () => {
        return score;
    }

    const getMarker = () => {
        return marker;
    }

    return { increaseScore, getScore, getMarker, };
}