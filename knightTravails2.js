function spaceNode(coord) {
    const DIM_MIN = 0;
    const DIM_MAX = 7;

    const jumps = [
        [ -1, -2 ], [ -2, -1 ],
        [ -1, 2 ],  [ 2, -1 ],
        [ 1, -2 ],  [ -2, 1 ],
        [ 1, 2 ],   [ 2, 1 ]
      ];


    function moveKnight(coord, jump) {
        const newPosX = coord[0] + jump[0];
        const newPosY = coord[1] + jump[1];

        const isValidX = newPosX >= DIM_MIN && newPosX <= DIM_MAX; 
        const isValidY = newPosY >= DIM_MIN && newPosY <= DIM_MAX; 
        
        const newPos = isValidX && isValidY ? [newPosX, newPosY] : null;
        return newPos;
    }
    

    function createMoves() {
        const moves = [];
        for (let i = 0; i < jumps.length; i++) {
            const newPos = moveKnight(coord, jumps[i]);
            if (newPos) { 
                moves.push(newPos) 
            }
        }
        
        return moves
    }

    const moves = createMoves();

    return { coord, moves }
    }
    

function knightMovesBoard() {

    function coordsMatch(coord1, coord2) {
        const xMatches = coord1[0] == coord2[0];
        const yMatches = coord1[1] == coord2[1];
        return xMatches & yMatches
    }

    function createBoard () {
        const DIM_MAX = 7;
        const board = [];
        for (let i = 0; i <= DIM_MAX; i++) {
            for (let j = 0; j <= DIM_MAX; j++) {
                board.push(spaceNode([i,j]))
            }
        }

        return board;
    }

    function getSpaceNode(coord) {
        for (let i = 0; i < board.length; i++) {
            const currSpace = board[i];
            if (coordsMatch(currSpace.coord, coord)) {
                return currSpace
            }
        }

        throw new Error("You dun fucked up son");  
    }
    
    function createGraph() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].moves.length; j++) {
                if (board[i].moves[j]) {
                    const nextSpaceCoord = board[i].moves[j];
                    const nextSpaceNode = getSpaceNode(nextSpaceCoord);
                    board[i].moves[j] = nextSpaceNode;
                }
            }
        }

        return getSpaceNode([0,0]);
    }

    function knightMoves(currSpace, endSpace) {
        if (coordsMatch(currSpace, endSpace)) {
            return [endSpace];
        }  

        const paths = [[currSpace]];
        let shortestPath = [];
        const visitedSpaces = new Set();

        do {
            const currPath = [...paths[0]];
            const currSpace = currPath[currPath.length - 1];
            const currNode = getSpaceNode(currSpace);

            for (let j = 0; j < currNode.moves.length; j++) { 
                const currPathCopy = [...currPath];
                const nextSpace = currNode.moves[j].coord;
                currPathCopy.push(nextSpace);
                if (coordsMatch(nextSpace, endSpace)) {
                    shortestPath = [...currPathCopy];
                    return shortestPath;
                } 
                else if (visitedSpaces.has(endSpace)) {
                    continue;
                }
                else {
                    paths.push(currPathCopy);
                    visitedSpaces.add(nextSpace);
                }
            }
            paths.shift();
        }
        while (paths[0])
            
        return false;
    }

    const board = createBoard();
    const startingSpace = createGraph();
    

    return { get board() { return board }, 
             get start() { return startingSpace },
             knightMoves
           } 
};