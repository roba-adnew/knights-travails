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
        const moves = {};
        for (let i = 0; i < jumps.length; i++) {
            const newPos = moveKnight(coord, jumps[i]);
            if (newPos) { 
                moves[newPos] = null;
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


    // function findSpaceNode(currNode, coord) {
    //     const toSearch = [currNode];
    //     const searched = new Set();

    //     do {
    //         if (searched.has(toSearch[0]) || !toSearch[0].coord) {
    //             toSearch.shift();
    //             continue;
    //         }

    //         if (coordsMatch(toSearch[0].coord, coord)) {
    //             return toSearch[0];
    //         }

    //         for (let i = 0; i < toSearch[0].moves.length ; i++) {
    //             const nextNode = toSearch[0].moves[i];
    //             toSearch.push(nextNode);
    //         }
    //         searched.add(toSearch.shift());
            
    //     }
    //     while (toSearch[0]);

    //     return null; 
    // }
    
    function createBoardGraph() {
        const DIM_MAX = 7;
        const board = {}
        for (let i = 0; i <= DIM_MAX; i++) {
            for (let j = 0; j <= DIM_MAX; j++) {
                if (!board[[i,j]]) board[[i,j]] = spaceNode([i,j]);

                for (let [a,x,b] in board[[i,j]].moves) {
                    a = parseInt(a);
                    b = parseInt(b);
                    if (!board[[a,b]]) board[[a,b]] = spaceNode([a,b]);
                    board[[i,j]].moves[[a,b]] = spaceNode([a,b]);
                    board[[a,b]].moves[[i,j]] = board[[i,j]];
                }
            }
        }

        return board;
    }

    function knightMoves(currSpace, endSpace) {
        if (coordsMatch(currSpace, endSpace)) {
            return [endSpace];
        }  

        const paths = [[currSpace]];
        let shortestPath = [];
        const visitedSpaces = new Set();

        do {
            const thisPath = [...paths[0]];
            const thisSpace = thisPath[thisPath.length - 1];
            const thisNode = board[ [thisSpace[0], thisSpace[1]] ];

            for (let [a,x,b] in thisNode.moves) { 
                a = parseInt(a);
                b = parseInt(b);
                const thisPathCopy = [...thisPath];
                thisPathCopy.push([a,b]);
                if (coordsMatch([a,b], endSpace)) {
                    shortestPath = [...thisPathCopy];
                    return shortestPath;
                } 
                else if (visitedSpaces.has(endSpace)) {
                    continue;
                }
                else {
                    paths.push(thisPathCopy);
                    visitedSpaces.add([a,b]);
                }
            }
            paths.shift();
        }
        while (paths[0])
            
        return false;
    }

    const board = createBoardGraph();
    

    return { get board() { return board }, 
             knightMoves
           } 
};