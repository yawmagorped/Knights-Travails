const Node = (x, y, prev = null) => {
    let _x = x;
    let _y = y;

    let isVisited = false;
    let adjacentList = [];
    let prevNode = prev;


    return {_x, _y, adjacentList};
}

const Graph = (start) => { 
    const BOARD_SIZE = 8;

    let head = Node(...start);
    let board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
    }

    const addToBoard = (x, y, node) => {
        board[x][y] = node;
    } 

    addToBoard(...start, head);

    const isInBound = (x, y) => {
        if (x < BOARD_SIZE && x >= 0 && y < BOARD_SIZE && y >= 0)
            return true;
        else
            return false;
    }

    const forEachAdjacent = (x, y, callback) => {
        if (isInBound(x+1, y+2))
            callback(x+1, y+2);
        if (isInBound(x+2, y+1))
            callback(x+2, y+1);
        if (isInBound(x+2, y-1))
            callback(x+2, y-1);
        if (isInBound(x+1, y-2))
            callback(x+1, y-2);
        if (isInBound(x-1, y-2))
            callback(x-1, y-2);
        if (isInBound(x-2, y-1))
            callback(x-2, y-1);
        if (isInBound(x-2, y+1))
            callback(x-2, y+1);
        if (isInBound(x-1, y+2))
            callback(x-1, y+2);
    }

    const buildAdjacentList = (x, y) => {
        if (!board[x][y]) {
            throw new Error("calling buildAdjacentList on a non existing board house");
        }

        forEachAdjacent(x,y, (inputX, inputY) => {
            if (!board[inputX][inputY]) {
                addToBoard(inputX, inputY, Node(inputX, inputY, board[x][y]));
            }
            board[x][y].adjacentList.push(board[inputX][inputY]);
        });
        console.log(board);
    }

    return {buildAdjacentList};
}

function knightMoves(start, end) {
    let graph = Graph(start);
    graph.buildAdjacentList(...start);
}

knightMoves([2,2], [7, 7]);