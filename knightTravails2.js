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
            moves.push(newPos);
            }
        
        return moves
    }

    const moves = createMoves();

    return { coord, moves }
    }
    

function knightMovesBoard() {

    const board = createBoard();
    const startingSpace = createGraph();

    function coordsMatch(coord1, coord2) {
        const xMatches = coord1[0] == coord2[0];
        const yMatches = coord1[1] == coord2[1];
        return xMatches & yMatches
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

    function hasBeenVisited(space, path) {
        for (let i = 0; i < path.length; i++) {
            if (coordsMatch(space, path[i])) {
                return true;
            }
        }
        return false;
    }

    function knightMoves(currSpace = startingSpace, endSpace, path = []) {
        if (hasBeenVisited(currSpace, path) || path.length >= 12) {
            return null;
        }

        if (coordsMatch(currSpace, endSpace)) {
            path.push(endSpace)
            return path;
        }

        path.push(currSpace);

        const currNode = getSpaceNode(currSpace);
        const possPaths = [];
        for (let i = 0; i < currNode.moves.length; i++) {
            if (currNode.moves[i]) {
                possPaths.push([...path]);

                const nextSpace = currNode.moves[i].coord;
                const pathCont = knightMoves(nextSpace, endSpace, possPaths[possPaths.length - 1]);
                if (pathCont) {
                    possPaths[possPaths.length - 1] = pathCont;
                }
                else {
                    possPaths.pop();
                }
            }
        }

        const shortestPath = possPaths.reduce((shortestPath, path) => {
            return path.length < shortestPath.length ? path : shortestPath
        }, possPaths[0]);

        return shortestPath;
    }
    

    return { get board() { return board }, 
             get start() { return startingSpace },
             knightMoves
           } 
};