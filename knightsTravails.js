
X1_MIN = 0;
X2_MAX = 7;
Y1_MIN = 0;
Y2_MAX = 7;

function createKnightMoves() {
    const jumps1 = [-3,3];
    const jumps2 = [-2,2];
    const moves = [];

    for (let x = 0; x < jumps1.length; x++) {
        for (let y = 0; y < jumps2.length; y++) {
            moves.push([ [jumps1[x], 0], [0, jumps2[y]] ]);
            moves.push([ [0, jumps1[x]], [jumps2[y], 0] ]);
            moves.push([ [jumps2[y], 0], [0, jumps1[x]] ]);
            moves.push([ [0, jumps2[y]], [jumps1[x], 0] ]);
        }
    }

    return moves;
}

function knightMoves (startPoint, endPoint) {


}


