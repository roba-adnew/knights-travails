
DIM_MIN = 0;
DIM_MAX = 7;

function gameBoard() {

    function createBoard() {
        const spaces = [];
        for (let i = 0; i <= DIM_MAX; i++) {
            for (let j = 0; j <= DIM_MAX; j++) {
                spaces.push([i,j])
            }
        }
        return spaces;
    }
    const board = createBoard();
   
    function removeSpace(toRemove) {
        for (let i = 0; i < board.length; i++) {
            const sameX = toRemove[0] === board[i][0];
            const sameY = toRemove[1] === board[i][1];
            if (sameX && sameY) {
                board.splice(i,1);
                return true;
            }
        }

        return false;
    }
    return { get board() { return board }, removeSpace } 
}

function createKnightMoves() {
    const jumps1 = [-1,1];
    const jumps2 = [-2,2];
    const moves = [];

    for (let x = 0; x < jumps1.length; x++) {
        for (let y = 0; y < jumps2.length; y++) {
            moves.push([jumps1[x], jumps2[y]]);
            moves.push([jumps2[y], jumps1[x]]);
        }
    }

    return moves;
}

function position(current, left = null, right = null) {
    return { current, left, right }
}

function isOnBoard(endPosition) {
    const isValidX = endPosition[0] >= DIM_MIN && endPosition[0]<= DIM_MAX; 
    const isValidY = endPosition[1] >= DIM_MIN && endPosition[1]<= DIM_MAX; 

    return isValidX && isValidY;
}

function isFinalPosition(currentPoint, endPoint) {
    const isFinalX = currentPoint[0] === endPoint[0];
    const isFinalY = currentPoint[1] === endPoint[1];

    return isFinalX && isFinalY
}

function position(current, left = null, right = null) {
    return { current, left, right }
}

function hasNotBeenVisited(point, path) {
    for (let i = 0; i < path.length; i++) {
        const sameX = point[0] === path[i][0];
        const sameY = point[1] === path[i][1];
        if (sameX && sameY) {
            return false
        }
    }
    return true;
}

function buildMovesArray(startPoint, endPoint) {

    if (startPoint === endPoint) {
        return [];
    }

    const moves = createKnightMoves();
    const spaces = gameBoard();
    spaces.removeSpace(startPoint);


    const explorePaths = [[startPoint]];
    const finishedPaths = []

    
    for (let i = 0; i < explorePaths.length; i++) {
        const tempPath = explorePaths.splice(i,1).flat();
        i--; // represents how much we move i back by altering explorePaths
        const lastMove = tempPath[tempPath.length - 1];
        
        for (let j = 0; j < moves.length; j++){
            const tempPathCopy = tempPath.map((move) => move);
            const nextX = lastMove[0] + moves[j][0];
            const nextY = lastMove[1] + moves[j][1];
            const nextPos = [nextX, nextY];

            if (isOnBoard(nextPos) && hasNotBeenVisited(nextPos, tempPathCopy)) {
                spaces.removeSpace(nextPos);
                tempPathCopy.push(nextPos);

                if (isFinalPosition(nextPos, endPoint)) {
                    finishedPaths.push(tempPathCopy)
                }
                else {
                    explorePaths.push(tempPathCopy)
                }
            }
        }
        if (spaces.board.length < 1) {
            break;
        }
    }   

    const shortestPath = finishedPaths.reduce((tempShortest, thisPath) => {
        return thisPath.length < tempShortest.length ? thisPath : tempShortest
    }, finishedPaths[0]);

    return shortestPath;
}

function knightMoves(startPoint, endPoint) {

    
}

console.log(buildMovesArray([0,0],[7,7]));