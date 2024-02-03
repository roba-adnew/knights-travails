DIM_MIN = 0;
DIM_MAX = 7;

function spaceNode(coord) {
    function createKnightJumps() {
        const jumps1 = [-1,1];
        const jumps2 = [-2,2];
        const jumps = [];
    
        for (let x = 0; x < jumps1.length; x++) {
            for (let y = 0; y < jumps2.length; y++) {
                jumps.push([jumps1[x], jumps2[y]]);
                jumps.push([jumps2[y], jumps1[x]]);
            }
        }
    
        return jumps;
    }
  
    function isOnBoard(coord) {
        const isValidX = coord[0] >= DIM_MIN && coord[0]<= DIM_MAX; 
        const isValidY = coord[1] >= DIM_MIN && coord[1]<= DIM_MAX; 
    
        return isValidX && isValidY;
    }

    function moveKnight(coord, jump) {
        const newPosX = coord[0] + jump[0];
        const newPosY = coord[1] + jump[1];
    
        const newPos = [newPosX, newPosY];
        if (isOnBoard(newPos)) {
            return newPos;
        }
    
        return false;
    }

    const jumps = createKnightJumps();
    const moves = []

    for (let i = 0; i < jumps.length; i++) {
        const newPos = moveKnight(coord, jumps[i]);
        if (newPos) {
            moves.push(newPos)
        }
        else {
            moves.push(null);
        }
    }

    return { coord, moves }
}

function knightMovesBoard() {

    function createBoard() {
        const spaces = [];
        for (let i = 0; i <= DIM_MAX; i++) {
            for (let j = 0; j <= DIM_MAX; j++) {
                spaces.push(spaceNode([i,j]))
            }
        }
        return spaces;
    }

    const board = createBoard();

    function getSpaceNode(coord) {
        for (let i = 0; i < board.length; i++) {
            const currSpace = board[i];
            const corrX = currSpace.coord[0] == coord[0];
            const corrY = currSpace.coord[1] == coord[1];
            if (corrX && corrY) {
                return currSpace
            }
        }

        throw new Error("You dun fucked up son");  
    }
    
    function createGraph() {
        for (let i = 0; i < board.length; i++) {
            const currSpace = board[i];
            const check = currSpace.moves[0];
            for (let j = 0; j < currSpace.moves.length; j++) {
                if (currSpace.moves[j]) {
                    currSpace.moves[j] = getSpaceNode(currSpace.moves[j])
                }
            }
        }

        return getSpaceNode[0,0];
    }
    const startingSpace = createGraph();

    return { get board() { return board }, get start() { return startingSpace } } 
}


a = knightMovesBoard();
a.start;