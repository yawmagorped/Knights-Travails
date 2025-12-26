import Queue from 'yocto-queue';

const Node = (x, y, prev = null) => {
    const _x = x;
    const _y = y;

    let isVisited = false;
    let adjacentList = new Queue();
    let prevNode = prev;

    return {
        get x() {
            return _x;
        },
        get y() {
            return _y;
        }
        , isVisited, prevNode, adjacentList};
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
            board[x][y].adjacentList.enqueue(board[inputX][inputY]);
            board[inputX][inputY].prevNode = board[x][y];
        });
        return board[x][y].adjacentList;
    }

    const find = (endX, endY) => {
        let queue = buildAdjacentList(head.x, head.y);
        for (let i = 0; i < 20; i++) {
            let node = queue.dequeue();
            if (!node.isVisited) {
                let newQueue = buildAdjacentList(node.x, node.y);
                for (const node of newQueue) {
                    queue.enqueue(node);
                    console.log(queue.size)
                }
            }
            console.log("x: " + node.x + "  &  y: " + node.y)
            if (node.x == endX && node.y == endY) {
                console.log("found it!!");
                return;
            }
            node.isVisited = true;
        }
    }

    const printBoardArray = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j]) {
                    console.log(`board[${i}][${j}] = ${board[i][j].x}, ${board[i][j].y}`);
                    if (board[i][j].prevNode !== null) {
                        console.log("previous node: [" + board[i][j].prevNode.x + ", " + board[i][j].prevNode.y + "]");
                    } else console.log("previous node: " + board[i][j].prevNode);
                } else {
                    console.log("empty");
                }
                console.log("----------------");
            }
            console.log();
            console.log("next row: ");
        }
    }

    return {buildAdjacentList, printBoardArray, find};
}

function knightMoves(start, end) {
    let graph = Graph(start);
    graph.buildAdjacentList(...start);
    graph.find(...end);
    // graph.printBoardArray();
}

knightMoves([2,2], [7, 7]);